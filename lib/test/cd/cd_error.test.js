const FS = require("../../lib_dqfs.exts");
const nodefs = require("fs");
const fs = new FS();

//change directory cd()
it('should throw error', () => {
    // expect(() => fs.cp("", "originPath/doesNotExist")).toThrow();
    expect(() => fs.cd("")).toThrow()
    expect(() => fs.cd("/")).toThrow()
    expect(() => fs.cd(2)).toThrow()
    expect(() => fs.cd({})).toThrow()
})

it('should throw an error', () => {
    try {
        fs.cd('teehee')

    } catch (e) {
        expect(e.message).toBe("ERROR_cd: Opps! we couldnt find teehee/ directory")
    }
})