const FS = require('../../lib_dqfs.exts')
const nodefs = require('fs')
const fs = new FS

// rename a file
it('it should rename file', () => {
    fs.mv('lib/foo/index.js','lib/foo/index2.js')
    expect(nodefs.readdirSync('lib/foo').indexOf('index.js') == -1).toBe(true)
})

// rename a dir
it('it should rename dir', () => {
    fs.mv('lib/foo/sofo', 'lib/foo/sofo2')
    expect(nodefs.readdirSync('lib/foo').indexOf('sofo') == -1).toBe(true)
})