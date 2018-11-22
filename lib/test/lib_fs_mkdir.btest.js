const FS = require('../lib_dqfs.exts')
const nodefs = require('fs')
const fs = new FS

it('should throw an error if mkdir is undefined',() => {
    expect( () => fs.mkdir()).toThrow()

    try{
        fs.mkdir()
    }catch(e){
        expect(e.message).toBe('ERROR_mkdir: mkdir cannot be undefined')
    }
})

it('should throw an error if mkdir param is an empty string',() => {
    expect( () => fs.mkdir('')).toThrow()
    try{
        fs.mkdir('')
    }catch(e){
        expect(e.message).toBe('ERROR_mkdir: mkdir cannot be an empty string')
    }
})

it('should throw an error if mkdir path does not exist',() => {
    let p = 'pathNotExist/baz/ben/raw'
    expect( () => fs.mkdir(p)).toThrow()
    try{
        fs.mkdir(p)
    }catch(e){
        expect(e.message).toBe("ERROR_mkdir: Opps! we couldnt find pathNotExist/baz/ben/ directory")
    }
})

it('should throw an error if arg is not a type of string or array',() => {
    expect( () => fs.mkdir(1)).toThrow()
    try{
        fs.mkdir(1)
    }catch(e){
        expect(e.message).toBe('ERROR_mdkir: Acceptable arguments are a type of string and array only')
    }
})

it('should throw an error if mkdir arg is an array but empty',() => {
    expect( () => fs.mkdir([])).toThrow()
    try{
        fs.mkdir([])
    }catch(e){
        expect(e.message).toBe('ERROR_mdkir: Arg should not be an empty array')
    }
})

it('should throw an error if mkdir arg is an array and cd is not define',() => {
    expect( () => fs.mkdir(['foo','bar','baz'])).toThrow()
    try{
        fs.mkdir(['foo','bar','baz'])
    }catch(e){
        expect(e.message).toBe(`ERROR_mkdir: Please define the directory where you want to create directories foo,bar,baz use the cd method`)
    }
})

it('should throw an error if the directory already exist', () => {
    expect( () => fs.mkdir('lib/foo')).toThrow()
    try{
        fs.mkdir('lib/foo')
    }catch(e){
        expect(e.message).toBe('ERROR_mkdir: foo directory already exist')
    }
})

it('should throw an error cd is define but invalid arguments',() => {
    fs.cd('lib/foo')
    expect(() => fs.mkdir().toThrow() )
    expect(() => fs.mkdir('').toThrow() )
    expect(() => fs.mkdir([]).toThrow() )
})