var fs = require('fs');

const dirFile = 'database/heloo.html'

// openFile();
// stats();
// reading_with_opening();
// reading_withOut_opening();
// writeFile();
// write_with_buf_etc();
// writeFileAsync();
readDir();

/*************************************************
 * OPEN
 */

    /**
     * fs.open(path, flag, [mode], callback);
     * fs.openSync(path, flag, [mode]) -> synchronous
     * 
     * FLAGS
     * 
     * - Reading files
     * 
     *      r   - Open file for reading.
     *      r+  - Open file for reading and writting
     *      rs  - Open file for reading in sychronous mode.
     *      rs+ - Open file for reading and writing, asking the OS to open synchronously.
     * 
     * - Writing to files
     * 
     *      w   - Open file for writing. The file is created (if doesn not exist) or truncated (if it exist)
     *      wx  - Like 'w' but fails if the path exist.
     *      w+  - Open file for reading and writing.
     *      wx+ - Like w+ but fails if the path exist.
     * 
     * - Appending to files
     * 
     *      a   - Open file for appending.
     *      ax  - Like 'a' but fails if the path exists.
     *      a+  - Open file for reading and appeding.
     *      ax+ - Like 'a+' but fails if the path exists.
     * 
     * fd - an int the represents the file in program.
     */

    function openFile() {        
        fs.open(dirFile, "r+", (err, fd) => {
            if(err){
                console.log(`code: ${err.code}\nmessage: ${err.message}`);
            }
            else {
                // read
                // write
                console.log(`file (${fd}) succesfully opened!`)
    
                fs.close(fd, (err) => {
                    if(err){
                        throw err;
                    } else {
                        console.log('file closed')
                    }
                });
            }
         });    
         // output  : file (3) succesfully opened
         // file closed
    }

/*************************************************
 * READ
 */

    /**
     * fs stats
     * fs.stat(path, callback);
     * fs.statSync(path) -> synchronous
     * 
     * returns the description properties of the file.
     */

    function stats() {

        let stat = fs.statSync(dirFile);
        console.log(stat);
        console.log(stat.isSocket); // is functions returns boolean
        console.log(`size: ${stat.size} bytes`); // returns int

        fs.stat(dirFile, (err, stats)=> {
            
            if(err){
                throw err;
            } else {
                console.dir(stats, {colors: true});
            }
        })
    }

    /**
     * fs.read(fd, buffer, offset, length, position, callback)
     * fs.readSync(fd, buffer, offset, length, position) -> sychronous
     * 
     * fd       -> file descriptor
     * buffer   -> to hold the contents you read from the file.
     * offset   -> where in the buffer you want to put data.
     * length   -> how much data from a file you want to read.
     * position -> where in the file you want to start reading.
     * callback -> 2 args, err and bytes, the number of bytes that was read from the file. /Async
    */
    // I want to read the content of the file
    function reading_with_opening() {
        let fileSize = fs.statSync(dirFile).size;
        let buf = new Buffer(fileSize);

         fs.open(dirFile, "r+", (err, fd) => {
            if(err){
                return console.log(`code: ${err.code}\n msg: ${err.message}`);
            } else {
                _readSync(fd);
                _readAsync(fd);

                console.log(`file (${fd}) successfully opened!`);
                
                fs.close(fd, (err) => {
                    console.log('\nFile Closed');
                })
            }
        })

        let _readSync = (_fd) => {
            let bytes = fs.readSync(_fd, buf, 0, fileSize, 0);
            console.log('bytes: '+ bytes);
            console.log('content:\n\n '+ buf.toString()); // outputs the content of the file
        }

        let _readAsync = (_fd) => {
            fs.read(_fd, buf, 0, fileSize, 0, (err, bytes) => {
                if(err){
                    console.log(err.message);
                } else {
                    console.log(bytes);
                    console.log(buf.toString); // outputs the content of the file
                    // console.log(fs.statSync(dirFile).birthtime);
                }
            });
        }
    }

    function reading_withOut_opening() {
        let data = fs.readFileSync(dirFile, 'utf8');
        // console.log(data)

        //or

        fs.readFile(dirFile, 'utf8', (err, data)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log(data); // output the contents of the file
            }
        })
    }

    // I want to read the content in the directory
    function readDir() {
        let files = fs.readdirSync('../app');
        console.log(files); // returns an array
        console.log(files.length); // returns number 

        //sync
        fs.readdir('../app', (err, files)=> {
            if(err) {
                console.log(err)
            } else {
                console.log(files);
            }
        })
    }

/*************************************************
 * WRITE
 */
    /**
     * fs.write(fd, string[, position[, encoding]], callback)
     * fd       -> file discriptor
     * string   -> the data that we want to write to the file
     * position -> where in the file to start writting the data
     * encoding -> utf8
     * callback -> err, bytes
    */
    function writeFile() {
        theContent = '<div> Hello World </div>'
        theNewFile = 'index.html'

        fs.open(theNewFile, 'a', (err,fd) => {
            if(err){
                throw err.message;
            } else {
                startWriting(fd);

                fs.close(fd, (err) => {
                    if(err){
                        throw err;
                    } else {
                        console.log('file closed')
                    }
                });
            }
        })

        let startWriting = (_fd) => {
            // sync
            let bytes = fs.writeSync(_fd, theContent);
            console.log(bytes);
            
            // async
            fs.write(_fd, theContent, (err, bytes) => {
                if(err) {
                    throw err;
                } else {
                    console.log(bytes);
                }
            });

        }       
    }

    //fs.wrrite(fd, buffer, offset, length, position, callback);
    //fs.writeSync(fd, buffer, offset, length, position);
    function write_with_buf_etc() {
        const bufdata = "bufdata.txt";
        const data = "OFFSETTHE QUICK BROWN FOX JUMPS OVER THE LAZY DOG\n";
        const buf = Buffer.from(data, 'utf8');
        const offset = 6; // Deletes the first 6 characters in the data const

        fs.open(bufdata, 'w', (err, fd) => {
            if(err){
                throw err;
            } else {
                // sync
                let bytes = fs.writeSync(fd, buf, offset, buf.byteLength - offset, 0);
                console.log(bytes); // output

                // async
                fs.write(fd, buf, offset, buf.length - offset, 0, (err, bytes)=> {
                    if (err) {
                        return console.log(err.message);
                    } else {
                        return console.log(bytes); // output
                    }
                });

                fs.close(fd, (err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('file is closed');
                    }
                })
            }
        })
    }

    //fs.writeFile(file, data, [options], callback);
    //fs.writeFileSync(file, data, [options])
    // options: encoding, flag, mode
    function writeFileSync() {
        const path = 'marven.txt';
        let data = 'this is a string\n';
        let buf = Buffer.from('this is written in buffer\n');

        // fs.writeFileSync(path, data); // if you run this again it will replace the file 
        // fs.writeFileSync(path, data, {flag: 'a'}); // append
        fs.writeFileSync(path, buf, {flag: 'a'}); // content from buffer;
    }

    function writeFileAsync() {
        const path = 'marven.txt';
        let data = 'this is a string\n';
        let buf = Buffer.from('this is written in buffer\n');

        fs.writeFile(path, data, {flag:'a'}, (err) => { // append, the default flag is 'w'
            if(err) {
                console.log(err.message)
            } else {
                console.log('data written successfully')
            }
        })
    }''


/*************************************************
 * CREATE
 */
    // fs.mkdir(path, mode. callback);
    // fs.mkdirSync(path, mode);

    fs.mkdirSync('folderName', 0o776); // create a folder

    const dirName = {
        sync : "folder1",
        async: "folder2"
    }
    function copyTo_AnotherFile() {
        return console.log('hey!')
    }
    // creates a folder and a file inside that dir, 
    // then writes a content to that file.
    fs.writeFileSync(`${dirName.sync/file.js}`,`{${copyTo_AnotherFile()}()}`);
    

/*************************************************
 * EDIT
 */


