const FS = require('./lib_dqfs.exts')
const fs = new FS

test('cd',() => {
    try{
        fs.cd('teehee')

    }catch(e){
        expect(e.message).toBe('cd: no such directory teehee/')
    }
})

test('touch t2', () => {
    try{
        fs.touch()
    }catch(e){
        expect(e.message).toBe('error touch: touch parameter cannot be undefined')
    }
})

test('touch t3', () => {
    try{
        fs.touch('lib/test/jennyAnn/test.js')
    }catch(e){
        expect(e.message).toBe('there is no such directory /lib/test/jennyAnn')
    }
})

fs.touch('lib/hello2/hey')
// test('touch t1', () => {
//     try{
//         fs
//         .cd('lib')
//         .touch()
//     }catch(e){
//         expect(e.message).toBe('error touch: touch parameter cannot be undefined')
//     }
// })



// const x = fs
//     .cd('playground')
//     .ls()
//     .sortByName('asc')
//     .done()

// console.log(x)