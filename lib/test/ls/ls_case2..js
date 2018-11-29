const d = require('../../lib_dqfs')

test('happy path case 2: arg is blank', () => {
    try {
        d.cd('playground')
        d.ls('lib/foo')
    } catch (e) {
        expect(e.message).toBe('ERROR_ls: Opps! we couldnt find playground/lib/foo/ directory')
    }
})