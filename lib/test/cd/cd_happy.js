const FS = require("../../lib_dqfs.exts");
const nodefs = require("fs");
const fs = new FS();

it('should return true', () => {
    expect(typeof fs.cd("lib/test")).toBe("object")
})