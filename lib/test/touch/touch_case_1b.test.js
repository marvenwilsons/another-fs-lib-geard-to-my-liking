const FS = require("../../lib_dqfs.exts");
const fs = new FS();

// Args is array

it("should create a files in lib/foo directory", () => {
  try {
    fs
    .cd("lib/foo")
    .touch(["in4.js", "in5.js", "in6.js"]);
  } catch (e) {
    console.log(e)
  }
});

it("should throw an error file already exist", () => {
  try {
    fs
      .cd("lib/foo")
      .touch(["in4.js", "in5.js", "in6.js"]);
  } catch (e) {
    console.log(e)
  }
});
