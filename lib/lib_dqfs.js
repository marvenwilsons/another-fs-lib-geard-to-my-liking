"use strict"

const fs = require('fs')
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
            G.size = fs.lstatSync(T).size
            G.birthtime = fs.lstatSync(T).birthtime
            G.type = fs.lstatSync(`${T}/${child}`).isDirectory() ? 'folder/directory' : 'file/application'
            G.fileAccess = 'rw+'
            if(fs.lstatSync( `${T}${child}` ).isDirectory() ){
                delete G.fileAccess
                G.folderAccess = 'rw+'
            }else{
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
        const objFirstArg = typeof absolutePath == 'object' && absolutePath

        // case 2, absolutepath is string, it means the user provided an absolute path
        //         which means the cd path if it is being set will be ignored
        const stringFirstArg = typeof absolutePath == 'string' && true

        // case 3, 
        const completeArgs = typeof absolutePath == 'string' && typeof options == 'object'

        // options error
        const optionsErr = (err) => {throw {message: err}}

        // switch base on what case the user take
        let opts = objFirstArg ? objFirstArg : options
        let opts2 = stringFirstArg ? absolutePath : opts
        let opts3 = completeArgs ? options : opts2
        
        // toggle types
        let currentType = 'object'
        const changeType = (type) => currentType = type
        stringFirstArg && changeType('string');
        completeArgs && changeType('object');

        // This the only available options, this is the keys that the user will provide
        const optionsArray = ['endsWith','startsWith','wildCard']

        // if option is not a type of object throw an error | ls()
        typeof opts3 != currentType && optionsErr(`ls: Options should be a type of ${currentType} only not ${typeof opts2}`)

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

        //
        const pth = stringFirstArg
    
        return res
    }
    // c. mkdir creates new directory

    delete lib.rootPath
    return lib
})()

module.exports = d