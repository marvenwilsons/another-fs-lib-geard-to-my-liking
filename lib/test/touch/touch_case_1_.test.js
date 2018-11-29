const FS = require('../../lib_dqfs.exts')
const fs = new FS

it('should create 3 files in lib/foo', () => {
    fs.cd("lib/foo").touch("in1.js , in2.js , in3.js")
})

it('should throw an error file already existed', () => {
    try{
        fs
        .cd('lib/foo')
        .touch('in1.js , in2.js , in3.js')
    }catch(e){
        expect(e).toBe("(fileSystem) touch: in1.js , in2.js , in3.js already exist")
    }
})