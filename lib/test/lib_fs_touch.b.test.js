const FS = require('../lib_dqfs.exts')
const fs = new FS


test('should throw an error if touch is called with empty parameter', () => {
    try{
        fs.touch()
    }catch(e){
        expect(e.message).toBe('ERR_ON_TOUCH: touch parameter cannot be undefined')
    }
})

test('should throw an error if touch is called with a wrong path', () => {
    const fs2 = new FS
    try{
        fs2.touch('lib/test/jennyAnn/test.js')
    }catch(e){
        expect(e.message).toBe("ERROR_touch: Opps! we couldnt find lib/test/jennyAnn directory")
    }
})

test('cd is define buy should throw an error if touch is called with empty parameter', () => {
    try{
        fs
        .cd('lib')
        .touch()
    }catch(e){
        expect(e.message).toBe('ERR_ON_TOUCH: touch parameter cannot be undefined')
    }
})

const scopeFreak = () => {
    test('should throw an error if cd is not defined', () => {
        try{
            fs.touch(['foo/a.js','foo/c.js','foo/d.js','foo/e.js'],['test','yow'])
        }catch(e){
            expect(e.message).toBe('ERR_ON_TOUCH: Set directory (cd) first if you want mass create files')
        }
    })
    
}
scopeFreak()




// *********************************************************
// const obj = {
//     childType: 'dir',
//     childShouldHave: ['conf.js','view.js','license.js'],
// }
// fs.setDirRule('lib/foo',obj)

// *********************************************************