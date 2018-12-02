const fileSystem = require('./lib/lib_dqfs.exts')
const nodefs = require('fs')
const fs = new fileSystem

try{
    const x = fs
    .cd('./lib/foo')
    .ls()
    console.log(x)
}catch(e){
    console.log(e)
}
