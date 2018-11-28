const FS = require('../../lib_dqfs.exts')
const fs = new FS

// Args is array

it('should create 3 files in lib/foo', () => {
    try {
        fs
        .cd('lib/foo')
        .touch('in1.js , in2.js , in3.js')
    } catch (e) {
       console.log(e)
    }
})

it('should throw an error file already existed', () => {
    expect(
        fs
        .cd("lib/foo")
        .touch("in1.js , in2.js , in3.js")).toThrowError(' in1.js in2.js in3.js files already exist')
})