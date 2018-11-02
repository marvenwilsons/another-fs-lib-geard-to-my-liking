const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const os = require('os')
let lib = {}

lib.usePromise = false
lib.setRootDir = undefined
lib.resolve = (obj) => {
    if(lib.usePromise){
        return new Promise ((resolve,reject) => {
            resolve(obj)
        })
    }else{
        return obj
    }
}
lib.reject = (obj) => {
    if(lib.usePromise){
        return new Promise ((resolve,reject) => {
            reject(obj)
        })
    }else{
        return obj
    }
}
lib.path = (path) => {
    return lib.setRootDir == undefined ? path : `${lib.setRootDir}${path}`
}
lib.print = {
    filetypes: () => {
        return console.log(`
    File Types

        ASCII - A text file in which each byte represents one character according to the ASCII code.
        UTF-8 - A text file where character encoding is capable of encoding all possible Unicode code points.
        JSON - A text file, written with JavaScript object notation.
        CBOR - A binary file, containing the Concise Binary Object Representation (CBOR) data format.
        Binary - A binary file, written in raw bytes.
    `)
    },
    fileRelatedMethods: () => {
        console.log(`
    File Related Methods
        
        fileRead(path,filetype)

            Accepts two argument parameters, <path:string> <type:string>, it returns a contents of the choosen file.
            <path:string> the directroy address of the file
            <type:string> File types, use the print.filetypes() to know more about file types

        fileProp(path)

            Accepts one argument parameter, <path:string>, it returns an object, the data property contains the basic
            properties on the selected file.
            <path:string> the directory address of the file

        fileCreate(path)

            Accepts one argument parameter, <path:string>, it create's a new empty file, it returns an object that tells 
            you if the method execution is successfull or fail and why.

        fileDelete(path)

            Accepts one argument parameter, <path:string> it deletes's a file from the directory, it returns an object that
            tells you if the method execution is successfull of fail and why.

        fileRename(oldname,newname)

            Accepts two argument parameter, <path:string> it updates the name of the file, it returns an object that tells you
            if the the method execution is successfull or fail and why.

        fileCopyToDir(file,distDir,mode,type)

            Accepts four argument parameter, <origin:string> <dist:string> <mode:string> <type:string>
            copys the file and its contents to its distanation directory,  it returns an object that tells you if the method 
            execution is successfull of fail and why.

            This function has no support for setRootDir config

        fileContentCopy(origin,dist,filetype)

            Accepts three argument parameter, <origin:string> <dist:string> <filetype:string>
            copy the contents of the origin file into the distanation file. it returns an object that tells you if the method 
            execution is successfull of fail and why.

        zipFile(path)

            Accepts one argument parameter



    For more information about this library

        print.filetypes()
            prints information about file types, that is used in the parameter's argument

        print.directoryRelatedMethods()
            prints information about directory or folder related methods

        print.configurations()
            prints information about configuration options


        `)
    },
    directoryRelatedMethods: () => {

    }
}
lib.help = () => {
    lib.print.filetypes()
    lib.print.fileRelatedMethods()
    lib.print.directoryRelatedMethods()
}
lib.checktype = (types,fnName) => {
    if(types.indexOf(false) == -1){
        return true
    }else{
        throw `TYPE_ERROR: Error in executing "${fnName}()" function, type does not match in index (${types.indexOf(false) + 1}) of the "${fnName}()" function parameter list`
    }
    
}
// File related
//done
lib.fileProp = (path) => {
    const accept = lib.checktype([
        [typeof path] == 'string'
    ],'fileProp')
    let fileDesc = {}
    if(fs.existsSync(lib.path(path))){
        const fd = fs.openSync(lib.path(path),"rs")
        if(typeof fd == 'number'){
            let stat = fs.lstatSync(lib.path(path))
            fileDesc.path = path
            fileDesc.size = stat.size
            fileDesc.isDirectory = stat.isDirectory()
            fileDesc.isFile = stat.isFile()
            fileDesc.isBlockDevice = stat.isBlockDevice()
            fileDesc.isCharacterDevice = stat.isCharacterDevice()
            fileDesc.isFIFO = stat.isFIFO()
            fileDesc.birthTime = stat.birthtime

            return lib.resolve({
                status: true,
                message: 'success',
                data: fileDesc
            })
        }else{
            return lib.reject({
                status: false,
                message: 'oh oh!, something went wrong from our end, please try again'
            })
        }
    }else{
        return lib.reject({
            status: false,
            message: `${path} does not exist`
        })
    }
}
//done
lib.fileRead = (path,type) => {
    const accept = lib.checktype([
        [typeof path] == 'string',
        [typeof type] == 'string'
    ], 'fileRead')
    if(fs.existsSync(lib.path(path))){
        const fd = fs.openSync(lib.path(path),'rs')
        if(typeof(fd) == "number"){
            if(type == null || type == undefined){
                return lib.resolve(fs.readFileSync(lib.path(path),'utf-8')) 
            }else{
                return lib.resolve(fs.readFileSync(lib.path(path),type))
            }
        }
    } else {
        return lib.reject({
            status: false,
            message: `${path} file does not exist`
        })
    }
}
// done
lib.fileCreate = (path) => {
    const accept = lib.checktype([
        [typeof path] == 'string'
    ],'fileCreate')
    if(accept){
        // check if file exist
        if(fs.existsSync(lib.path(path))){
            return lib.reject({
                status: false,
                message: `${path} aleady exist`
            })
        }else{
            fs.writeFileSync(lib.path(path))
            return lib.resolve({
                status: true,
                message: `${path} was successfully created`
            })
        }
    }
}
// done
lib.fileDelete = (path) => {
    const accept = lib.checktype([
        [typeof path] == 'string'
    ])
    if(accept){
        if(fs.existsSync(lib.path(path))){
            fs.unlinkSync(lib.path(path))
            return lib.resolve({
                status: true,
                message: `${path} was successfully deleted`
            })
        }else{
            return lib.reject({
                status: false,
                message: `Error on deleting ${lib.path(path)}`
            })
        }
    }
}
// done
lib.fileRename = (path,newName) => {
    const accept = lib.checktype([
        [typeof path] == 'string',
        [typeof newName] == 'string',
    ])

    if(accept){
        if(fs.existsSync(lib.path(path))){
            // check if newname exist
            const fileDirArray = fs.readdirSync(lib.setRootDir)
            if(fileDirArray.indexOf(path) != -1){
                fs.renameSync(lib.path(path),lib.path(newName))
                return lib.reject({
                    status: true,
                    message: `${path} was successfuly renamed to ${newName}`
                })
            }else{
                return lib.reject({
                    status: false,
                    message: `${newName} already exist in ${lib.setRootDir} directory`
                })
            } 
        }else{
            return lib.reject({
                status: false,
                message: `${path} does not exist`
            })
        }
    }
}
//done
lib.fileCopyToDir = (file,dir,mode,type) => {
    const accept = lib.checktype([
        [typeof file] == 'string',
        [typeof dir] == 'string',
        [typeof mode] == 'string',
        [typeof type] == 'string'
    ],'fileCopy')
    if(accept){
        // check if file exist
    if(fs.existsSync(file)){
        // check if dir exist
        if(fs.existsSync(dir)){
            // check if the name of file exist in dir
            const fx = fs.readdirSync(dir).indexOf(file)
            if(fx == -1){
                // file does not exist
                lib.fileContentCopy(file,path.join(dir,file),type)
                const r = {
                    status: true,
                    case: 1,
                    message: `${file} was successfully copied in ${dir} directory folder`
                }
                return lib.resolve(r)
            }else {
                // file exist
                const modes = ['ovrt','cnf']
                if(modes.indexOf(mode) != -1 && modes.indexOf(mode) == 0){
                    lib.fileContentCopy(file,path.join(dir,file),type)
                    const r = {
                        status: true,
                        case: 2,
                        message: `${file} was successfully copied in ${dir} directory but ${file} file was overwritten`
                        }
                    return lib.resolve(r)
                }else if(modes.indexOf(mode) != -1 && modes.indexOf(mode) == 1){

                    const regexFileExt = /[^.]+$/gm
                    const fileExt = regexFileExt.exec(file)
                    const regexNameFile = new RegExp(`.+?(?=.${fileExt})`,'gm')
                    const nameFile = regexNameFile.exec(file)
                    const c = `.${fileExt[0]}`
                    const regexNum = new RegExp(`\d${c}$`)
                    const num = regexNum.exec(file)                    
                    const fileDirArray = fs.readdirSync(dir)
                    let finalName = []

                    for(let i = 0; i < fileDirArray.length; i++){
                        const tryMatch = `${nameFile}.${i}.${fileExt}`
                        if(fileDirArray.indexOf(tryMatch) == -1){
                            finalName.push(tryMatch)
                        }
                    }

                    lib.fileContentCopy(file,path.join(dir,`${finalName[0]}`),type)
                    return lib.resolve({
                        status:true,
                        case: 3,
                        createdFile: finalName[0],
                        message: `${file} and its contents was successfully copied in ${dir} directory, a file name ${file} was already present in the ${dir} directory, so I created a new file named ${ finalName[0] }`
                    })
                }
                else if(modes.indexOf(mode) == -1){ 
                    const r = {
                        status: false,
                        message: 'Ivalid mode flag'
                    }
                    return lib.reject(r)
                }
            }
        }else{
            return lib.reject({
                status: false,
                message: `${dir} does not exist`
            })
        }
    } else {
        return lib.reject({
            status: false,
            message: `${file} does not exist`
        })
    }
    }
}
//done
lib.fileContentCopy = (_from,to,type) => {
    const accept = lib.checktype([
        [typeof _from]=='string',
        [typeof to]=='string',
        [typeof type]=='string'
    ],'fileContentCopy')
    if(accept){
        if(fs.existsSync(_from)){
            if(!fs.existsSync(to)){
                fs.writeFileSync(to,lib.fileRead(_from,type),type == undefined || type == null ? 'utf-8': type)
                return lib.resolve({
                    status: true,
                    case: 1,
                    message: `${_from} successfully copied to newly create ${to} file`
                })
            }else{
                fs.writeFileSync(to,lib.fileRead(_from,type),type == undefined || type == null ? 'utf-8' : type)
                return lib.resolve({
                    status: true,
                    case: 2,
                    message: `${_from} successfully copied to ${to} file, ${to} file is overwritten`
                })
            }
        }else{
            return lib.reject({
                status: false,
                message: `${_from} file does not exist`
            })
        }
    }
}

//Zip file related
lib.zipFile = (file) => {
    const accept = lib.checktype([
        [typeof file] == 'string'
    ])
    if(accept){
        if(fs.existsSync(lib.path(file))){
            const gzip = zlib.createGzip()
            const inp = fs.createReadStream(lib.path(file))
            const out = fs.createWriteStream(`${lib.path(file)}.gz`)

            lib.fileDelete(file)

            inp.pipe(gzip).pipe(out)
            if(fs.existsSync(`${lib.path(file)}.gz`)){
                return lib.resolve({
                    status:true,
                    message: `${file}.gz successfully created`
                })
            }
        } else {
            return lib.reject({
                status: false,
                message: `unable to zip ${file} file`
            })
        }
    }
}

// Dir related
lib.dirProp = (dir) => {
    let o = {
        size: undefined,
        name: undefined,
        length: undefined,
        filetype: undefined,
        dateCreated: undefined,
        dateLastModified: undefined,
        parentDir: undefined,
        contents: undefined        
    }
}
//done
lib.dirList = (path) => {
    return fs.readdirSync(path)
}
//done
lib.dirCreate = (path) => {
    const accept = lib.checktype([
        [typeof path]=='string'
    ],'dirCreate')

    if(accept){
        if(fs.existsSync(path)){
            // file already exist case
            return lib.reject({
                status: false,
                message: `${path} directory already exist`
            })
        }else {
            fs.mkdirSync(path, 0o776)
            if(fs.existsSync(path)){
                return lib.resolve({
                    status: true,
                    message: `${path} folder directory was successfully created`
                })
            }else{
                return lib.reject({
                    status: false,
                    message: `something went wrong on creating the directory`
                })
            }
        }
    }
}
//done
lib.dirDelete = (path) => {
    lib.checktype([
        [typeof path] == 'string'
    ])
    if(!fs.existsSync(lib.path(path))){
        return lib.reject({
            status: false,
            message: `no such directory ${path}`
        })
    }
    if(lib.dirList(lib.path(path)).length == 0){
        fs.rmdirSync(lib.path(path))
        return lib.resolve({status:true})
    } else {
        fileList = lib.dirList(lib.path(path))
        const root = lib.path(path)    
        const crazyRecusiveFunctionThatTookMeHoursToMakeFuck = (path) =>{
            lib.setRootDir = undefined
            let recursivePath = ''
            let folderContentsList = lib.dirList(path)
            let arrayLen = fileList.length        
            for(let i = 0; i < arrayLen; i++){            
                // set initial path
                recursivePath = `${path}/`
                const eachFileNames = folderContentsList[i]            
                // get the address
                recursivePath = recursivePath.concat(eachFileNames)
                if(eachFileNames == undefined){                
                    fs.rmdirSync(path)
                    recursivePath = path
                    if(!lib.fileProp(recursivePath).status){
                        recursivePath = root
                    }
                }
                if( !fs.lstatSync(recursivePath).isDirectory() ){                
                    lib.fileDelete(lib.path(recursivePath)).status
                    recursivePath = path
                }
                if(lib.dirList(lib.path(root)).length != 0){
                    crazyRecusiveFunctionThatTookMeHoursToMakeFuck(recursivePath)

                }else{
                    fs.rmdirSync(root)
                }    
            }
        }
        crazyRecusiveFunctionThatTookMeHoursToMakeFuck(lib.path(path))

        return lib.resolve({
            status: true
        })
    }
}
lib.dirRename = (dir) => {

}
lib.dirCopy = (selectedDir,newLocation) => {

}
lib.dirFind = (dirName,dirToFind) => {

}

// Context related
lib.ctfindPhrase = () => {

}
lib.ctDeletePhrase = () => {

}
lib.ctInsertBetween = () => {

}
lib.ctInsertAfter = () => {

}
lib.ctInsertBefore = () => {

}
lib.ctReplacePhrase = () => {

}
lib.ctClearEverything = () => {

}
lib.ctFindAndReplace = () => {

}
lib.ctSearchAll = () => {
    
}

// export
module.exports = lib
