const d = require('../../lib_dqfs')

test('happy path case1: arg is 2 with path and options', () => {
    try {
        d.ls('foo/bazzzz', { startsWith: 'test' })
    } catch (e) {
        expect(e.message).toBe('ERROR_ls: Opps! we couldnt find foo/bazzzz/ directory')
    }
})