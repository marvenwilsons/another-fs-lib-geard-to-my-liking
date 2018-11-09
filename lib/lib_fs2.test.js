const d = require('./lib_dqfs')

// setRoot()
    test('set root directory', () => {
        // checks1
        expect( d.setRoot('lib/foo') ).toBe(true)
        // Checks2        
        try{
            d.setRoot('foi')
        }catch(e){
            expect( e.message ).toBe( "setRoot: no such directory foi/" )
        }
    })
    test('check parameter if correct type of string', () => {
        try{
            d.setRoot(2)
        }catch (e){
            expect(e.message).toBe("on setRoot() function argument position (1) cannot be undefined should be a string")
        }
    })
    test('should throw empty path error when param is undefined or empty', () => {
        try{
            d.setRoot('')
        }catch(e){
            expect(e.message).toBe('setRoot function cannot take an empty string as an argument')
        }
    })
// getChildren()




// d.getChildren()
// d.deleteChildren(['foo1','bar']) // provide an array of names
// d.sortChildren()

// d.findAndDelete('test.js')
// d.findAndRename('test.js','index.js')
// d.findAndReplace('test.js','index.js')


// d.getAllDir()
// d.emptyDir() // delete all files
// d.killSeflf() // delete all files and deletes it self

// d.sortByDateCreated() // parameter 'dec', 'asc'
// d.sortByDateModified() 
// d.sortByName()
// d.sortBySize()
// d.sortByType()

// d.groupItemsByType()
// d.groupItemsByName()
// d.groupItemsBySize()

// possible chains samples
// d.getChildren().sortbyName()
// d.getChildred().groupByType()