const FS = require("../../lib_dqfs.exts");
const nodefs = require("fs");
const fs = new FS();

it('should remove a single file',()=> {
    fs.rm('lib/foo/rm.js')
})

it('should remove a dir file', () => {
    fs.rm("lib/foo/rm")

})

it('should remove a file and a directory', () => {

})