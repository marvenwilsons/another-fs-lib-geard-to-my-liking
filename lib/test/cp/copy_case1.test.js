const FS = require('../../lib_dqfs.exts')
const nodefs = require('fs')
const fs = new FS

// case 1 sad path
it('Should throw an error if the cd is set and select all active',() => {
    expect(()=> fs.cp('*','lib/foo/dan')).toThrow()
})


// happy path case 1: copying full contents inisde a directory using cd
it('copy everyhing inside the originPath folder to dist folder',() => {
    const originPath = 'playground'
    const distinationPath = 'lib/foo/baz'

    // Copy all of the contents inside the originPath to the distanation directory
    fs
    .cd(originPath)
    .cp('*',distinationPath)
    .done()

    const originsContents = nodefs.readdirSync(originPath)
    const distContents = nodefs.readdirSync(distinationPath)

    const set = new Set(distContents)

    originsContents.map(e => {
        expect(set.has(e)).toBe(true)
    })

})