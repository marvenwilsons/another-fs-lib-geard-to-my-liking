const FS = require('./lib_dqfs.exts')
const fs = new FS

test('cd',() => {
    try{
        fs.cd('teehee')

    }catch(e){
        expect(e.message).toBe('cd: no such directory teehee/')
    }
})

const x = fs
    .cd('lib')
    .ls('foo')
    .sortByNameReverse('dec')
    .done()

console.log(x)