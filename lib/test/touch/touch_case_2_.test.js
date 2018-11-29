const FS = require('../../lib_dqfs.exts')
const fs = new FS

it('should create files in root dir', () => {
    fs.touch('hey.js,hello.js ')
})

it('should throw an error', () => {
    expect(() => fs.touch('hey.js,hello.js ')).toThrow()
})