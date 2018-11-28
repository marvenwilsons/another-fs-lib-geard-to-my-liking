const FS = require('../../lib_dqfs.exts')
const fs = new FS

it("should throw an error", () => {
    expect(fs.touch()).toThrow();
    expect(fs.touch()).toThrowError('test')
})