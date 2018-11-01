const fs = require('fs')
const path = require('path')
let lib = {}

lib.usePromise = false
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
    if(fs.existsSync(path)){
        const fd = fs.openSync(path,"rs")
        if(typeof fd == 'number'){
            let stat = fs.lstatSync(path)
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
    if(fs.existsSync(path)){
        const fd = fs.openSync(path,'rs')
        if(typeof(fd) == "number"){
            if(type == null || type == undefined){
                return lib.resolve(fs.readFileSync(path,'utf-8')) 
            }else{
                return lib.resolve(fs.readFileSync(path,type))
            }
        }
    } else {
        return lib.reject({
            status: false,
            message: `${path} file does not exist`
        })
    }
}
lib.fileCreate = (dir,file) => {

}
lib.fileDelete = (dir,file) => {

}
lib.fileRename = (dir,oldName,newName) => {

}
//done
lib.fileCopy = (file,dir,mode,type) => {
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
lib.zipFile = () => {

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
lib.dirOpen = (dir) => {

}
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
lib.dirDelete = (dir) => {

}
lib.dirRename = (dir) => {

}
lib.dirCopy = (selectedDir,newLocation) => {

}
lib.dirFind = (dirName,dirToFind) => {

}
lib.createZip = () => {

}
lib.unzip = () => {

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
