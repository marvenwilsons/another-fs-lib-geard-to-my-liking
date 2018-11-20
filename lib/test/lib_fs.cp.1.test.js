const FS = require('../lib_dqfs.exts')
const fs = new FS

it('should throw an error, undefined args',() => {
    expect(() => fs.cp()).toThrow()
})

it('should throw an error if only one arg is supplied', () => {
    expect(() => fs.cp('originPath/doesNotExist')).toThrow()
})

it('should throw an error if the args is not complete or does not have the correct value',() => {
    expect(() => fs.cp('','originPath/doesNotExist')).toThrow()
    expect(() => fs.cp('origin/FalsePath','')).toThrow()
    expect(() => fs.cp('','')).toThrow()
    expect(() => fs.cp(undefined,'')).toThrow()
    expect(() => fs.cp(undefined,undefined)).toThrow()
    expect(() => fs.cp(2,'')).toThrow()
    expect(() => fs.cp(2,4)).toThrow()
    expect(() => fs.cp([],2)).toThrow()

    try{
        fs.cp('','originPath/doesNotExist')
    }catch(e){
        expect(e.message).toBe('ERROR_cp: cp parameter cannot be undefined an empty string or a type of number')
    }

    try{
        fs.cp('origin/FalsePath','')
    }catch(e){
        expect(e.message).toBe('ERROR_cp: cp parameter cannot be undefined an empty string or a type of number')
    }
        
    try{
        fs.cp('','')
    }catch(e){
        expect(e.message).toBe('ERROR_cp: cp parameter cannot be undefined an empty string or a type of number')
    }

    try{
        fs.cp(undefined,'')
    }catch(e){
        expect(e.message).toBe('ERROR_cp: cp parameter cannot be undefined an empty string or a type of number')
    }

    try{
        fs.cp(undefined,undefined)
    }catch(e){
        expect(e.message).toBe('ERROR_cp: cp parameter cannot be undefined an empty string or a type of number')
    }

    try{
        fs.cp(2,'')
    }catch(e){
        expect(e.message).toBe('ERROR_cp: cp parameter cannot be undefined an empty string or a type of number')
    }

    try{
        fs.cp(2,4)
    }catch(e){
        expect(e.message).toBe('ERROR_cp: cp parameter cannot be undefined an empty string or a type of number')
    }

    try{
        fs.cp([],2)
    }catch(e){
        expect(e.message).toBe('ERROR_cp: cp parameter cannot be undefined an empty string or a type of number')
    }
})

it('it should throw an error if the origin is an array an',() => {
    expect(() => fs.cp([],'dist')).toThrow()
    try{
        fs.cp(['directChild'],'dist')
    }catch(e){
        expect(e.message).toBe('ERROR_cp: ')
    }
})

// happy path case 1
it('copy everyhing inside that folder to dist',() => {
    fs
    .cd('playground')
    .cp('*','lib/foo/dan')
})

// case 1 sad path
it('Should throw an error if the cd is set and select all active',() => {
    expect(()=> fs.cp('*','lib/foo/dan')).toThrow()
    try{
        fs.cp('*','lib/foo/dan')
    }catch(e){
        expect(e.message).toBe('ERROR_cp: Select all "*" can only work if the root directory is set, please use cd')
    }
})