const d = require('./lib_dqfs')

// change directory cd()
    test('set root directory', () => {
        // checks1
        expect( d.cd('lib/foo') ).toBe(true)
        // Checks2        
        try{
            d.cd('foi')
        }catch(e){
            expect( e.message ).toBe( "cd: no such directory foi/" )
        }
    })
    test('check parameter if correct type of string', () => {
        try{
            d.cd(2)
        }catch (e){
            expect(e.message).toBe("on cd() function argument position (1) cannot be undefined should be a string")
        }
    })
    test('should throw empty path error when param is undefined or empty', () => {
        try{
            d.cd('')
        }catch(e){
            expect(e.message).toBe('cd function cannot take an empty string as an argument')
        }
    })
// list ls()
    test('should throw an error',() => {
        try{
            d.ls({})
        }catch(e){
            expect(e.message).toBe('listError: Options object cannot be empty')
        }
    })
    test('should throw an error 1: incorect option',() => {
        try{
            d.ls({endWith: ''})
        }catch(e){
            expect(e.message).toBe('listError: "endWith" is not recognized, options are "endsWith,startsWith,wildCard"')
        }
    })
    test('should throw an error 2: empty string',() => {
        try{
            d.ls({endsWith: ''})
        }catch(e){
            expect(e.message).toBe('listError: Options value cannot be an empty string')
        }
    })
    test('should throw an error 3: not a type of string',() => {
        try{
            d.ls({endsWith: undefined})
        }catch(e){
            expect(e.message).toBe('listError: Options value type should be a string')
        }
    })
    test('happy path case1: arg is 1 and object',() => {
        try{
            d.ls({endsWith: 'foo'})
        }catch(e){
            console.log(e)
        }
    })
    test('happy path case2: arg is 2 with path and options',() => {
        try{
            d.ls('foo/bazzzz',{startsWith: 'test'})
        }catch(e){
            console.log(e)
        }
    })
    test('happy path case3: arg is 1 path only ',() => {
        try{
            d.ls('foo/bar')      
        }catch(e){
            console.log(e)
        }
   })
   test('happy path case4: arg is blank',() => {
       try{
            d.ls()
       }catch(e){
           console.log(e)
       }
   })

// d.ls().sortByName()
// mkdir()


// directory methods
    // create
    // d.mkdir() --> creates folder
    // d.mkdtemp() --> make a temporart directory

    // removing
    // d.rmdir() --> deletes folder and its contents
    // d.rm(path,'')
    // d.emptyDir()

    // listing
    // d.ls() --> list all items in a folder
    // d.ls(path,{endsWith:'.js'}) --> list all files that ends with the string specified in folder, returns how many match found
    // d.ls(undefiend,{startsWith: '_'})
    // d.ls(undefiend,'.js') --> list all files that has a .js wherever in the name 
    // d.lsDir() --> list all directories inside that folder

    // rename
    // d.rename(path,path)
    
    // listing + grouping
    // d.ls().groupItemsByType()
    // d.ls().groupItemsByName()
    // d.ls().groupItemsBySize()

    // listing + sort
    // d.ls().sortByDateCreated() // parameter 'dec', 'asc'
    // d.ls().sortByDateModified() 
    // d.ls().sortByName()
    // d.ls().sortBySize()
    // d.ls().sortByType()

    // find
    // d.find()

    //copy
    // d.copy(from,to)
    // d.flushContent(fromFile,toFile)

