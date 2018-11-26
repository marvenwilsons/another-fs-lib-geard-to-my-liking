const FS = require('../../lib_dqfs.exts')
const nodefs = require('fs')
const fs = new FS

// happy path case 3 : copying a directory into a directory
it('should copy everything inside originPath to dist path', () => {
    fs.cp('playground/bazinga', 'lib/foo')
    const distContents = nodefs.readdirSync('lib/foo')
    expect( distContents.indexOf("bazinga") != -1 ).toBe(true)
})