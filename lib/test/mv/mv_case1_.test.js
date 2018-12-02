const FS = require('../../lib_dqfs.exts')
const nodefs = require('fs')
const fs = new FS

// rename a file
it('it should rename file', () => {
    fs.mv('lib/foo/index.js','lib/foo/index2.js')
})

// rename a dir
// it('it should rename dir', () => {
//     fs.mv('lib/foo/sofo', 'lib/foo/sofo2')
// })

// rename and move a file
// it('should print case2', () => {
//     fs.mv('lib/foo/index.js', 'lib/foo/sofo/sample.js')
// })

// rename and move a dir
// it('should print case2', () => {
//     fs.mv('lib/foo/sofo', 'lib/foo/ben/sofo2')
// })

// // move a dir to another directory
// it('move a dir', () => {
//     fs.mv('lib/foo/sofo', 'lib/foo/sofo2/sofo')
// })

// move a file to another directory
// it('move a file', () => {
//     fs.mv('lib/foo/index.js', 'lib/foo/sofo/index.js')
// })