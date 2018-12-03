const FS = require("../../lib_dqfs.exts");
const fs = new FS();

// Args is array

it("should throw an error invalid file name", () => {
  expect(() =>  fs.cd("lib/foo").touch('')).toThrowError('(fileSystem) ValueError: touch: invalid operand value')
  expect(() => fs.cd("lib/foo").touch(' ')).toThrowError('(fileSystem) ValueError: touch: invalid operand value')
  expect(() => fs.cd("lib/foo").touch('                      ')).toThrowError('(fileSystem) ValueError: touch: invalid operand value')

})