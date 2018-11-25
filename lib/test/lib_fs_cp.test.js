const FS = require('../lib_dqfs.exts')
const nodefs = require('fs')
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

// case 1 sad path
it('Should throw an error if the cd is set and select all active',() => {
    expect(()=> fs.cp('*','lib/foo/dan')).toThrow()
    try{
        fs.cp('*','lib/foo/dan')
    }catch(e){
        expect(e.message).toBe('ERROR_cp: Select all "*" can only work if the root directory is set, please use cd')
    }
})


// happy path case 1
it('copy everyhing inside the originPath folder to dist folder',() => {
    const originPath = 'playground'
    const distinationPath = 'lib/foo/baz'

    // Copy all of the contents inside the originPath to the distanation directory
    fs
    .cd(originPath)
    .cp('*',distinationPath)
    .done()

    const originsContents = nodefs.readdirSync(originPath)
    const distContents = nodefs.readdirSync(distinationPath)

    const set = new Set(distContents)

    originsContents.map(e => {
        expect(set.has(e)).toBe(true)
    })

})

// happy path case 2
it('should copy everthing inside originPath to distanation path 2',() => {
    // expect(typeof fs.cp('playground/*','lib/foo/dan')).toBe('object')
    const originPath = "playground"
    const distinationPath = "lib/foo/ben"

    fs.cp('playground/*', 'lib/foo/ben')

    const originsContents = nodefs.readdirSync(originPath)
    const distContents = nodefs.readdirSync(distinationPath)

    const set = new Set(distContents)

    originsContents.map(e => {
        expect(set.has(e)).toBe(true)
    })
})


