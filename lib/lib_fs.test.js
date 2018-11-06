const fs = require('./lib_fs')

fs.setRootDir = "lib/"

test("fs.setRootDir setting the root directory", () => {
    expect(fs.setRootDir).toBe('lib/')
})

test("fs.libpath() normalize path", () => {
    expect(fs.path("sample")).toBe("lib/sample")
})

// File properties
    /* Desc:
     *   returns the basic properties of the file selected 
     *   reads directory or file
     */
    test("fileProp test1", () => {
        expect(fs.fileProp('sample/hell.js').status).toBe(true)
    })

    test("fileProp test2",() => {
        expect(fs.fileProp('sample/hell.j').status).toBe(false)
    })

// Dir Create
    /* Desc: 
    *   Creates a directory
    */
    test("directory create: should create folders in the array", () => {
        const folder = ['foo','bar','baz','ben']
        folder.forEach(el => {
            expect(fs.dirCreate(`sample/${el}`).status)
            .toBe(true)
        })
    })
// file Create
    /* Desc:
    *   Creates a file in a directory
    */
    test("file create: should create files in the directroy", () => {
        const files = ['foo.js','foo.txt','foo.cmd','bar','bar,js']
        const folder = ['foo','bar','baz','ben']
        folder.forEach(folderNames => {
            files.forEach(fileNames => {
                expect(fs.fileCreate(`sample/${folderNames}/${fileNames}`).status)
                .toBe(true)
            })
        })
    })
// File Delete
    /* Desc:
    *    Deletes the a file only
    */
    test("delete file test1: deletion success", () => {
        expect(fs.fileDelete('sample/index2.js').status)
        .toBe(true)
    })
    test("delete file test2: deletes dir", () => {
        expect(fs.fileDelete('sample/').status)
        .toBe(false)
    })
// File Content Copy

    /* Desc: 
     *   Reads the file content by performing fs.readfileSync to origin file
     *   then writes the contents of the file to the distination file
     *   if the specified distination file does not exist it will create a new file
     *   if the specified already exist, that file will be overwritten
     */
    test("fileContentCopy test1: rejection", () => {
        expect(fs.fileContentCopy('sample/hell','sample/index.js','utf-8').status).toBe(false)
    })

    test("fileContentCopy test2: overwritten", () => {
        expect(fs.fileContentCopy('sample/hell.js','sample/index.js','utf-8').case).toBe(2)
    })

    test("fileContentCopy test3: newly create", () => {
        expect(fs.fileContentCopy('sample/hell.js','sample/index2.js','utf-8').case).toBe(1)
    })
// directory delete
   /* Desc:
   *    Deletes the directory
   */
    // test("directory delete: should delete the directory and all of the contents", () => {
    //     const folder = ['foo','bar','baz','ben']
    //     // folder.forEach(el => {
    //     //     expect(fs.dirDelete(el))
    //     //     .toBe(true)
    //     // })
    //     expect(fs.dirDelete('sample').status)
    //     .toBe(true)
    // })

