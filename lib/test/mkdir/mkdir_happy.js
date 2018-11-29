const FS = require('../../lib_dqfs.exts')
const nodefs = require('fs')
const fs = new FS

it('should create a new directory', () => {
    fs.mkdir('lib/foo/dan')
    expect(nodefs.existsSync('lib/foo/dan')).toBe(true)
})

it('should mass create directories', () => {
    nodefs.existsSync('lib/foo/dan')
    fs
    .cd('lib/foo/dan')
    .mkdir(['1','2','3','4'])
    expect(nodefs.existsSync('lib/foo/dan/1')).toBe(true)
    expect(nodefs.existsSync('lib/foo/dan/2')).toBe(true)
    expect(nodefs.existsSync('lib/foo/dan/3')).toBe(true)
    expect(nodefs.existsSync('lib/foo/dan/4')).toBe(true)
})