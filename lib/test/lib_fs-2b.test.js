
(() => {
    const d = require('../lib_dqfs')

    test('happy path case2: arg is 2 with path and options',() => {
        try{
            d.ls('foo/bazzzz',{startsWith: 'test'})
        }catch(e){
            expect(e.message).toBe('ERROR_ls: Opps! we couldnt find foo/bazzzz/ directory')
        }
    })
    
    test('happy path case4: arg is blank',() => {
        try{
             d.cd('playground')
             d.ls('lib/foo')
        }catch(e){
            expect(e.message).toBe('ERROR_ls: Opps! we couldnt find playground/lib/foo/ directory')
        }
    })
})()
