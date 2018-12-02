const FS = require('../../lib_dqfs.exts')
const nodefs = require('fs')
const fs = new FS

it('should print case1', () => {
    fs.mv('lib/foo/index.js','lib/foo/index.js')
})

it('should print case2', () => {
    fs.mv('lib/foo/index.js', 'lib/baz/sample.js')
})

it('should print case2', () => {
    fs.mv('lib/foo/index.js', 'lib/baz')
})