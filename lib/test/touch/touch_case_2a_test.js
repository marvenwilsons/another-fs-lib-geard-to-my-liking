const FS = require('../../lib_dqfs.exts')
const fs = new FS

// args is string

it('should create a single file name touch.js in dir lib/foo', () => {
    try {
        fs.touch('lib/foo/touch.js')
    }catch(e){
        console.log(e)
    }
})