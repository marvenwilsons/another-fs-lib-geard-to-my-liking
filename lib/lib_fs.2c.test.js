const FS = require('./lib_dqfs.exts')
const fs = new FS
const d = require('fs')

test('cd',() => {
    try{
        fs.cd('teehee')

    }catch(e){
        expect(e.message).toBe('cd: no such directory teehee/')
    }
})

// test('touch t2', () => {
//     try{
//         fs.touch()
//     }catch(e){
//         expect(e.message).toBe('error touch: touch parameter cannot be undefined')
//     }
// })

// test('touch t3', () => {
//     try{
//         fs.touch('lib/test/jennyAnn/test.js')
//     }catch(e){
//         expect(e.message).toBe('there is no such directory lib/test/jennyAnn')
//     }
// })


// fs
// .cd('lib/foo')
// .touch('hey.js')

fs
.cd('lib/foo')
.touch(['in1.js','in2.js','in3.js'],[{'test':'yow'},'//test2','//test3'])

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