const sy = require('../lib_dqfs')

// define the class
var Kitten = function() {
    this.finalVal = undefined
  };
  
  Kitten.prototype.setName = function(name) {
    this.finalVal = name;
    return this;
  };
  
  Kitten.prototype.setColor = function(color) {
    this.finalVal = color;
    return this;
  };
  
  Kitten.prototype.setGender = function(gender) {
    this.finalVal = gender;
    return this;
  };
  
  Kitten.prototype.return = function() {
    const x = this.finalVal
    return x
  };

  const bob = new Kitten()
  
  bob
  .setName('Bob')
  .setColor('black')
  .setGender('male')
  .return();

console.log(bob)
// **************************************************************************************
// const ArgsParamTypeError = (message) =>  this.message = message
// const PathDoesNotExistError = (message) => this.message = message
// function isUndef(val,fnName){
//     let y = []
//     val.forEach(el => {
//         y.push(el == undefined)
//     })
//     if(y.indexOf(true) != -1){
//         throw{
//             message: `${fnName} function arg position ${y.indexOf(true)} cannot be undefined`
//         }
//     }
// }
// function isType(types,fnName,t){
//     isUndef([types,fnName,t],fnName)

//     if(types.indexOf(false) == -1){
//         return true
//     }else{
//         throw new ArgsParamTypeError(
//             `on ${fnName}() function argument position (${types.indexOf(false) + 1}) cannot be undefined should be a ${t[types.indexOf(false)]}`
//         )
//     }
// }
// function isEmpty(val,fn){
//     if(val == ''){
//         throw {
//             message: `${fn} function cannot take an empty string as an argument`
//         }
//     }
// }
// function setC(T){
//     let newA = []
//     cd = fs.readdirSync(T)
//     cd.forEach(child => {
//         const G = Object.create(dir)
//         G.name = child
//         G.publicPath = `${T}${child}`
//         G.parentDir = T
//         G.label = 'none'
//         G.items = fs.lstatSync(`${T}${child}`).isDirectory() ? G.items = fs.readdirSync(`${T}${child}`).length : G.items = 'none'
//         G.size = fs.lstatSync(T).size
//         G.birthtime = fs.lstatSync(T).birthtime
//         G.type = fs.lstatSync(`${T}/${child}`).isDirectory() ? 'folder/directory' : 'file/application'
//         G.fileAccess = 'rw+'
//         if(fs.lstatSync( `${T}${child}` ).isDirectory() ){
//             delete G.fileAccess
//             G.folderAccess = 'rw+'
//         }else{
//             G.fileAccess = 'rw+'
//         }
//         newA.push(G)
//     })
//     cd = newA
// }

// const fs = () => {
//     this.name = undefined
//     this.publicPath = undefined
//     this.parentDir = undefined,
//     this.size= undefined
//     this.items= undefined
//     this.type= undefined // directory or file
//     this.fileAccess= undefined
//     this.birttime= undefined
//     this.label = undefined
// }

// fs.prototype.cd = (path) => {
//     return this
// }
// fs.prototype.ls = (absolutePath,options) => {
//     // case 1, absolutepath is object, so the path that well be used
//     //         to travers the directory is the cd path,
//     //         it is expected that the object has object keys for options array
//     const objFirstArg = typeof absolutePath == 'object' && absolutePath 
    
//     // case 2, absolutepath is string, it means the user provided an absolute path
//     //         which means the cd path if it is being set will be ignored
//     const stringFirstArg = typeof absolutePath == 'string' && true  
    
//     // case 3, 
//     const completeArgs = typeof absolutePath == 'string' && typeof options == 'object'  
    
//     // case 4
//     const allUndef = absolutePath == undefined && options == undefined  
    
//     // options error
//     const optionsErr = (err) => {throw {message: err}}  
    
//     // switch base on what case the user take
//     const opts = objFirstArg ? objFirstArg : options
//     const opts2 = stringFirstArg ? absolutePath : opts
//     const opts3 = completeArgs ? options : opts2
//     const opts4 = allUndef && lib.rootPath
//     const optsRes = opts4 ? opts4 : opts3

//     // toggle types
//     let currentType = 'object'
//     const changeType = (type) => currentType = type
//     stringFirstArg && changeType('string')
//     completeArgs && changeType('object')
//     allUndef && changeType('string')    
    
//     // This the only available options, this is the keys that the user will provide
//     const optionsArray = ['endsWith','startsWith','wildCard']
//     Object.seal(optionsArray)   
    
//     // if option is not a type of object throw an error | ls()
//     typeof optsRes != currentType && optionsErr(`ls: Options should be a type of ${currentType} only`)  
    
//     // if options object is empty throw an error | ls({})
//     typeof opts == currentType && Object.keys(opts).length == 0 && optionsErr(`listError: Options ${currentType} cannot be empty`)  
    
//     // if options object has more than one key throw an error
//     typeof opts == currentType && Object.keys(opts).length != 1 && optionsErr('listError: Options object cannot be more than one')  
    
//     // typo in the options key
//     typeof opts == currentType && Object.keys(opts).length == 1 && 
//     optionsArray.indexOf(Object.keys(opts)[0]) == -1 && optionsErr(`listError: "${Object.keys(opts)[0]}" is not recognized, options are "${optionsArray}"`)

//     // empty value
//     typeof opts == currentType && Object.keys(opts).length == 1 &&
//     optionsArray.indexOf(Object.keys(opts)[0]) != -1 && opts[Object.keys(opts)[0]] == '' && 
//     optionsErr('listError: Options value cannot be an empty string')    
    
//     // not a string value
//     typeof opts == 'object' && Object.keys(opts).length == 1 &&
//     optionsArray.indexOf(Object.keys(opts)[0]) != -1 && typeof opts[Object.keys(opts)[0]] != 'string' && 
//     optionsErr('listError: Options value type should be a string')  
    
//     // Container that will be use to be mutated later, used to for return of the data
//     let res = undefined 
    
//     // returned methods
//     let methods = {}    
    
//     // modes 
//     const modes = ['asc','dec'] 
    
//     // UseData
//     let UserData = undefined
//     objFirstArg     && (UserData = {path: lib.rootPath, options:absolutePath})
//     stringFirstArg  && (UserData = {path: absolutePath.endsWith('/') ? absolutePath : `${absolutePath}/`, options:undefined})
//     completeArgs    && (UserData = {path: absolutePath.endsWith('/') ? absolutePath : `${absolutePath}/`, options})
//     allUndef        && (UserData = {path: lib.rootPath, options:options})   
//     // path.endsWith('/') ? path : `${path}/`   
//     // Contents
//     let contents = []
//     const doesPathExist = fs.existsSync(UserData.path)
//     doesPathExist ? (contents = setC(UserData.path)) : (PathDoesNotExistError(`no such directory --> ${UserData.path}`))
//     contents = cd

//     return this
// }