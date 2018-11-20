"use strict"

const fs = require('fs')
const queryString = require('querystring')
const d = (() => {
// Current Data set 
    const dir = {
        name: undefined,
        publicPath: undefined,
        parentDir: undefined,
        label: undefined,
        items: undefined,
        size: undefined,
        type: undefined, // directory or file
        fileAccess: undefined,
        birttime: undefined,
    }
// init empty lib
    let lib = {}
    let cd = undefined
    lib.rootPath = undefined
// Utils
    function ArgsParamTypeError(message) {
        this.message = message
    }
    function PathDoesNotExistError(message) {
        this.message = message
    }
    function ERROR(message){
        this.message = message
    }
    function err(message) {
        throw new ERROR(message)
    }
    function isUndef(val,fnName){
        let y = []
        val.forEach(el => {
            y.push(el == undefined)
        })
        if(y.indexOf(true) != -1){
            throw{
                message: `${fnName} function arg position ${y.indexOf(true)} cannot be undefined`
            }
        }
    }
    function isType(types,fnName,t){
        isUndef([types,fnName,t],fnName)

        if(types.indexOf(false) == -1){
            return true
        }else{
            throw new ArgsParamTypeError(
                `on ${fnName}() function argument position (${types.indexOf(false) + 1}) cannot be undefined should be a ${t[types.indexOf(false)]}`
            )
        }
    }
    function isEmpty(val,fn){
        if(val == ''){
            throw {
                message: `${fn} function cannot take an empty string as an argument`
            }
        }
    }
    function getSize(path){
        let totalSize  = 0   

        // recursion
        const recur = path => {
            let isThereADir = []
            fs.lstatSync(path).isDirectory() ? (isThereADir = fs.readdirSync(path)) : totalSize += fs.lstatSync(path).size
            isThereADir.length != 0 && isThereADir.map(e => recur(`${path}/${e}`))
        }
        
        // initial call
        recur(path)
        
        return totalSize
    }
    function getChildPaths(path){
        let children = {
            dir: [],
            files: []
        }
        const isD = fs.statSync(path).isDirectory() ? true : false
        const items = isD ? fs.readdirSync(path) : path        
        typeof items == 'object' ? items.map(e => children.dir.push(`${path}${e}`)) : children.files.push(items)
        return children
    }
    function setC(T){
        let newA = []
        cd = fs.readdirSync(T)
        cd.forEach(child => {
            const G = Object.create(dir)
            G.name = child
            G.publicPath = `${T}${child}`
            G.parentDir = T
            G.label = 'none'
            G.items = fs.lstatSync(`${T}${child}`).isDirectory() ? G.items = fs.readdirSync(`${T}${child}`).length : G.items = 'none'
            G.size = getSize(`${T}${child}`)
            G.birthtime = fs.lstatSync(T).birthtime
            G.type = fs.lstatSync(`${T}/${child}`).isDirectory() ? 'folder/directory' : 'file/application'
            G.children = getChildPaths(`${T}${child}`).length == 0 ? 'none' : getChildPaths(`${T}${child}`)
            G.fileAccess = 'rw+'
            if(fs.lstatSync( `${T}${child}` ).isDirectory() ){
                delete G.fileAccess
                G.folderAccess = 'rw+'
            }else{
                delete G.items
                G.fileAccess = 'rw+'
            }
            newA.push(G)
        })
        cd = newA
    }
    const Layer = function(data,{beforeEnter,hasEntered,onExit}) {
        const bE = beforeEnter(data)
        const oE = hasEntered(bE)
        onExit(oE)
    }
// libs
    
    // a. set rooth path directory
    lib.cd = (path) => {        
        isType([
            [typeof path] == 'string'
        ],'cd',['string'])
        isEmpty(path,'cd')
        
        const sanitizedPath = path.endsWith('/') ? path : `${path}/`
        
        if(fs.existsSync(sanitizedPath)){            
            lib.rootPath = sanitizedPath
            setC(sanitizedPath)
        }else{
            throw{
                message: `cd: no such directory ${sanitizedPath}`
            }
        }        
        return true
    }
    
    // b. retunrs an array of properties, of folder contents
    lib.ls = (absolutePath,options) => {
        // case 1, absolutepath is object, so the path that well be used
        //         to travers the directory is the cd path,
        //         it is expected that the object has object keys for options array
        const objFirstArg = typeof absolutePath == 'object' && options == undefined && absolutePath

        // case 2, absolutepath is string, it means the user provided an absolute path
        //         which means the cd path if it is being set will be ignored
        const stringFirstArg = typeof absolutePath == 'string' && options == undefined && true

        // case 3, 
        const completeArgs = typeof absolutePath == 'string' && typeof options == 'object'

        // case 4
        const allUndef = absolutePath == undefined && options == undefined

        // options error
        const optionsErr = (err) => {throw {message: err}}

        // switch base on what case the user take
        const opts = objFirstArg ? objFirstArg : options
        const opts2 = stringFirstArg ? absolutePath : opts
        const opts3 = completeArgs ? options : opts2
        const opts4 = allUndef && lib.rootPath
        const optsRes = opts4 ? opts4 : opts3
        
        // toggle types
        let currentType = 'object'
        const changeType = (type) => currentType = type
        stringFirstArg && changeType('string')
        completeArgs && changeType('object')
        allUndef && changeType('string')

        // This the only available options, this is the keys that the user will provide
        const optionsArray = ['endsWith','startsWith','wildCard']
        Object.seal(optionsArray)

        // rootPath is not set and absolutePath is not
        lib.rootPath == undefined && absolutePath == undefined && optionsErr(`ls: Path cannot be undefined, at least set a roothPath`)

        // if option is not a type of object throw an error | ls()
        typeof optsRes != currentType && optionsErr(`ls: Options should be a type of ${currentType} only`)

        // if options object is empty throw an error | ls({})
        typeof opts == currentType && Object.keys(opts).length == 0 && optionsErr(`listError: Options ${currentType} cannot be empty`)

        // if options object has more than one key throw an error
        typeof opts == currentType && Object.keys(opts).length != 1 && optionsErr('listError: Options object cannot be more than one')

        // typo in the options key
        typeof opts == currentType && Object.keys(opts).length == 1 && 
        optionsArray.indexOf(Object.keys(opts)[0]) == -1 && optionsErr(`listError: "${Object.keys(opts)[0]}" is not recognized, options are "${optionsArray}"`)
        
        // empty value
        typeof opts == currentType && Object.keys(opts).length == 1 &&
        optionsArray.indexOf(Object.keys(opts)[0]) != -1 && opts[Object.keys(opts)[0]] == '' && 
        optionsErr('listError: Options value cannot be an empty string')

        // not a string value
        typeof opts == 'object' && Object.keys(opts).length == 1 &&
        optionsArray.indexOf(Object.keys(opts)[0]) != -1 && typeof opts[Object.keys(opts)[0]] != 'string' && 
        optionsErr('listError: Options value type should be a string')

        // Container that will be use to be mutated later, used to for return of the data
        let res = undefined

        // returned methods
        let methods = {}

        // modes 
        const modes = ['asc','dec']

        // UseData
        let UserData = undefined
        objFirstArg     && (UserData = {path: lib.rootPath, options:absolutePath})
        // stringFirstArg  && (UserData = {path: absolutePath.endsWith('/') ? absolutePath : `${absolutePath}/`, options:undefined})

        // what if cd link has the same link as ls ? 
        const strFirstArgC1 = typeof lib.rootPath == 'string' && typeof absolutePath == 'string'
        const strFirstArgC2 = strFirstArgC1 && lib.rootPath == absolutePath ? true : false
        const strFirstArgC3 = strFirstArgC2 ? absolutePath : `${lib.rootPath == undefined ? '' : lib.rootPath}${absolutePath}`

        // assign correct data
        stringFirstArg  && (UserData = {path: strFirstArgC3.endsWith('/') ? strFirstArgC3 : `${strFirstArgC3}/`, options:undefined})
        completeArgs    && (UserData = {path: strFirstArgC3.endsWith('/') ? strFirstArgC3 : `${strFirstArgC3}/`, options})
        allUndef        && (UserData = {path: lib.rootPath, options:options})

        // Contents
        let contents = []
        const doesPathExist = fs.existsSync(UserData.path)
        if(!doesPathExist){throw new PathDoesNotExistError(`on ls: no such directory ${UserData.path}`)}
        doesPathExist && setC(UserData.path)

        return cd
    }

    // create new file
    lib.touch = (file,content) => {
        // sanitizing
        file == undefined && err('ERR_ON_TOUCH: touch parameter cannot be undefined')
        typeof file != 'string' && file[0] == undefined && err('ERR_ON_TOUCH: invalid tpye in parameter should be a string or array')
        lib.rootPath == undefined && typeof file == 'object' && 
        err('ERR_ON_TOUCH: Set directory (cd) first if you want mass create files')

        // case 1 if cd is undefined and user supplied a path
        const c1 = () => {
            const originPath = Object.keys( queryString.parse(file,'/') )
            const pathLen = originPath.length - 1
            const pathFile = `/${originPath.splice(pathLen,1)[0]}`
            originPath.splice(pathLen,1)
            let newPath = ''
            originPath.map((e,i) => newPath += `${i != 0 ? '/' : ''}${e}`)

            // typeof content != 'string' && err('ERR_ON_TOUCH: you cannot use an iterable object for a single file creation')
            const con = content != undefined ? content : ''
            
            fs.existsSync(newPath) ? 
                fs.existsSync(`${newPath}${pathFile}`) ? err(`"${pathFile.replace('/','')}" already exist in "${newPath}" directory`) : 
                fs.writeFileSync(`${newPath.trim()}${pathFile}`,con.trim(),'utf-8')
            :  err(`there is no such directory ${newPath}`)
        }

        // case 2 cd is defined and argument is string
        const c2 = () => {
            const path = `${lib.rootPath}`
            const fileName = `${file}`

            typeof content != 'string' && err('ERR_ON_TOUCH: you cannot use an interable object for a single file creation')
            const con = content != undefined ? content : ''

            fileName.includes('/') && err(`"${fileName}" is an invalid file name, dont put slash in the name`)
            
            fs.existsSync(`${path}${fileName}`) ? 
                err(`"${fileName}" already exist in "${path}"`) :
                fs.writeFileSync(`${path}${fileName}`,con,'utf-8')
        }

        // case 1.a 
        const c1_a = () => {
            content.map(e => {
                typeof e != 'string' && err('ERR_ON_TOUCH: Items in array in 2nd argument should only be strings') 
            })

            const c = (t,i) => {
                let cc = ''
                t == 'string' && (cc = content)
                t == 'object' && (cc = content[i])
                return cc
            }
            file.map((e,i) => {
                fs.writeFileSync(
                    `${lib.rootPath}${e}`,
                    `${content == undefined ? '' : c(typeof content,i)}`,
                    'utf-8')
            })
        }

        // use case 1
        lib.rootPath == undefined && typeof file == 'string' && c1()

        // use case 1.a
        lib.rootPath != undefined && typeof lib.rootPath == 'string' && typeof file == 'object' && c1_a()
        
        // use case 2
        typeof lib.rootPath == 'string' && typeof file == 'string' && c2()
    }

    // c. mkdir creates new directory
    // c.cases : mkdir([]) --> accepts array as an arugument as folder names | mass folder creation
    // c.cases : mkdir('') --> accepts string | single dir creation
    lib.mkdir = (path) => {
        
        // path cannot be undefine
        path == undefined && err('ERROR_mkdir: mkdir cannot be undefined')
        
        // path cannot be an empty string
        typeof path == 'string' && path == '' && err('ERROR_mkdir: mkdir cannot be an empty string')

        // only a type of string and array is allowed
        typeof path != 'string' && typeof path != 'object' && err('ERROR_mdkir: Acceptable arguments are a type of string and array only')
        
        //  if type is an object, array should not be empty
        typeof path == 'object' && path[0] == undefined && err('ERROR_mdkir: Arg should not be an empty array')

        //
        lib.rootPath == undefined && typeof path == 'object' && err(`ERROR_mkdir: Please define the directory where you want to create directories ${path} use the cd method`)
        
        // getting the fileName and the parent path
        const pStr = Object.keys(queryString.parse(path,'/'))
        const fileName = pStr[pStr.length - 1] == undefined ? pStr[0] == undefined && '' : pStr[pStr.length - 1]
        const parentPath = typeof path == 'string' && path.replace(fileName,'') 
        
        // locate parentPath
        typeof path == 'string' && !fs.existsSync(parentPath) && err(`ERROR_mdkir: there is no such directory ${parentPath}`) 
        
        // diretory already exist
        fs.existsSync(`${parentPath}${fileName}`) && err(`ERROR_mkdir: ${fileName} directory already exist`)
        
        // happy path create the dir
        typeof path == 'string' && fs.mkdirSync(path)

        // happy path mass create dir
        typeof path == 'object' && (path.map(e => fs.mkdirSync(`${lib.rootPath}${e}`)))
    }

    //
    lib.cp = (origin,dist) => {
        
    }

    // watch folder

    delete lib.rootPath
    return lib
})()

module.exports = d