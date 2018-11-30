const FS = require("../../lib_dqfs.exts");
const nodefs = require("fs");
const fs = new FS();

it('should throw an error, undefined args', () => {
    expect(() => fs.cp()).toThrow()
})

it('should throw an error if only one arg is supplied', () => {
    expect(() => fs.cp('originPath/doesNotExist')).toThrow()
})

it('should throw an error if the args is not complete or does not have the correct value', () => {
    expect(() => fs.cp('', 'originPath/doesNotExist')).toThrow()
    expect(() => fs.cp('origin/FalsePath', '')).toThrow()
    expect(() => fs.cp('', '')).toThrow()
    expect(() => fs.cp(undefined, '')).toThrow()
    expect(() => fs.cp(undefined, undefined)).toThrow()
    expect(() => fs.cp(2, '')).toThrow()
    expect(() => fs.cp(2, 4)).toThrow()
    expect(() => fs.cp([], 2)).toThrow()

    expect(() => fs.cp('', 'originPath/doesNotExist') ).toThrow()
    expect(() => fs.cp('origin/FalsePath', '') ).toThrow()
    expect(() => fs.cp('', '') ).toThrow()
    expect(() => fs.cp(undefined, '') ).toThrow()
    expect(() => fs.cp(undefined, undefined) ).toThrow()
    expect(() => fs.cp(2, '') ).toThrow()
    expect(() => fs.cp(2, 4) ).toThrow()
    expect(() => fs.cp([], 2) ).toThrow()


})