const FS = require('./lib_dqfs.exts')
const fs = new FS



try {
    const x = fs
        .cd('lib/foo')
        .ls()
        .done()
}catch(e){
    console.log(e)
}