const fs = require("../lib/lib_fs");
const ff = require("fs");
fs.usePromise = false
fs.setRootDir = 'playground/'


/*
* Finish lists
*
* fs.fileProp
* fs.dirCreate
*/


// const file = fs.fileProp('test.txt')
// console.log(file)

// const file = fs.dirCreate('tesing.js')
// console.log(file)

// console.log(fs.fileCopy('lib_fs(depracted).js','tesing','ovrt','utf-8'))

// console.log(fs.fileCopy('lib_fs(depracted).js','tesing','cnf','utf-8')

const del = fs.dirDelete('Trios Project Collections')
// console.log(del)

// console.log(fs.fileCreate('hello'))
// console.log(fs.fileRename('private','foo'))

// console.log(fs.zipFile('test.json'))

// console.log(fs.dirMove('foo','playground/'))

// console.log(fs.dirCreate('foo'))


// COPY FOO FOLDER AND ITS CONTENTS NOT ONLY FOO'S CONTENTS
// console.log(fs.dirCopy('foo','baz'))
// fs.dirCopy('foo','baz')

// console.log(fs.dirList('foo'))