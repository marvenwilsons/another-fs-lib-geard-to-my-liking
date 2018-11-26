const d = require('../../lib_dqfs')

//change directory cd()
test('set root directory', () => {
    // checks1
    expect(d.cd('lib/foo')).toBe(true)
    // Checks2        
    try {
        d.cd('foi')
    } catch (e) {
        expect(e.message).toBe("ERROR_cd: Opps! we couldnt find foi/ directory")
    }
})
test('check parameter if correct type of string', () => {
    expect(() => d.cd(2)).toThrow()
})
test('should throw empty path error when param is undefined or empty', () => {
    try {
        d.cd('')
    } catch (e) {
        expect(e.message).toBe("cd cannot be an empty string");
    }
})