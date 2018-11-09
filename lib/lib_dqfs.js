"use strict"

const fs = require('fs')
const d = (() => {
// init empty lib
    let lib = {}
// Current Data set 
    let _CD =  []
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
// libs
    
    // a. set rooth path directory
    lib.rootPath = undefined
    lib.setRoot = (path) => {        
        isType([
            [typeof path] == 'string'
        ],'setRoot',['string'])
        isEmpty(path,'setRoot')
        
        const sanitizedPath = path.endsWith('/') ? path : `${path}/`
        
        if(fs.existsSync(sanitizedPath)){
            lib.rootPath = path
        }else{
            throw{
                message: `setRoot: no such directory ${sanitizedPath}`
            }
        }        
        return true
    }
    
    // b.
    lib.getChildren = () => {
        return lib.rootPath
    }


    delete lib.rootPath
    return lib
})()

module.exports = d