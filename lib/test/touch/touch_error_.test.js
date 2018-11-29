const FS = require("../../lib_dqfs.exts");
const fs = new FS();

// Args is array

it("should throw an error invalid file name", () => {
  try {
    fs
    .cd("lib/foo")
    .touch('');
  } catch (e) {
    expect(e).toBe('(fileSystem) touch: invalid file name')
  }
})

it("should throw an error invalid file name", () => {
  try {
    fs
      .cd("lib/foo")
      .touch(' ');
  } catch (e) {
    expect(e).toBe('(fileSystem) touch: invalid file name')
  }
})


it("should throw an error invalid file name", () => {
  try {
    fs
      .cd("lib/foo")
      .touch('             ');
  } catch (e) {
    expect(e).toBe('(fileSystem) touch: invalid file name')
  }
})