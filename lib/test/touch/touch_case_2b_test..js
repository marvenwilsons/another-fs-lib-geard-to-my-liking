const FS = require("../../lib_dqfs.exts");
const fs = new FS();

// args is string no cd

it("should create a single file name touch2.js in lib/foo dir", () => {
  try {
    fs.touch("lib/foo/touch2.js");
  } catch (e) {
    console.log(e);
  }
})
