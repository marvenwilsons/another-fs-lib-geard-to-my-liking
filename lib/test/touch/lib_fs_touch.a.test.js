const FS = require('../../lib_dqfs.exts')
const fs = new FS


test('cd',() => {
    try{
        fs.cd('teehee')

    }catch(e){
        expect(e.message).toBe("ERROR_cd: Opps! we couldnt find teehee/ directory")
    }
})

test('t', () => {
    try {
        fs
        .cd('lib/foo')
        .touch(['in1.js','in2.js','in3.js'],[{'test':'yow'},'//test2','//test3'])
    }catch(e){
        expect(e.message).toBe('ERR_ON_TOUCH: Items in array in 2nd argument should only be strings')
    }
})






// const x = fs
//     .cd('playground')
//     .ls()
//     .sortByName('asc')
//     .done()

// console.log(x)