const FS = require('../../lib_dqfs.exts')
const nodefs = require('fs')
const fs = new FS

// happy path case 2 : copying full contents inisde a directory using absolute path
it('should copy everthing inside originPath to distanation path 2',() => {
    // expect(typeof fs.cp('playground/*','lib/foo/dan')).toBe('object')
    const originPath = "playground"
    const distinationPath = "lib/foo/ben"

    fs.cp('playground/*', 'lib/foo/ben')

    const originsContents = nodefs.readdirSync(originPath)
    const distContents = nodefs.readdirSync(distinationPath)

    const set = new Set(distContents)

    originsContents.map(e => {
        expect(set.has(e)).toBe(true)
    })
})

// fs
// .cd('playground')
// .cp('playground/*')