const FS = require('../../lib_dqfs.exts')
const nodefs = require('fs')
const fs = new FS

// happy path cse 4 : copying a file into a dir
it('should copy the selected file to the dist folder', () => {
    fs.cp("playground/lib_fs(depracted).js", "lib/foo");
    expect(nodefs
        .readdirSync("lib/foo")
        .indexOf("lib_fs(depracted).js") != -1).toBe(true);
})