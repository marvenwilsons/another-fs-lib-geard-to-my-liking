const FS = require('../../lib_dqfs.exts')
const nodefs = require('fs')
const fs = new FS

// happy path cse 4 : copying a file into a dir
it('should copy the selected file to the dist folder', () => {
    fs.cp('playground/sample.js','lib/foo')
    expect(nodefs.readdirSync("lib/foo").indexOf("sample.js") != -1).toBe(true)
})