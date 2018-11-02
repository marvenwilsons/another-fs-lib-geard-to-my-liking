# File Types

ASCII - A text file in which each byte represents one character according to the ASCII code.
UTF-8 - A text file where character encoding is capable of encoding all possible Unicode code points.
JSON - A text file, written with JavaScript object notation.
CBOR - A binary file, containing the Concise Binary Object Representation (CBOR) data format.
Binary - A binary file, written in raw bytes.

# File Related Methods
        
fileRead(path,filetype)

    Accepts two argument parameters, <path:string> <type:string>, it returns a contents of the choosen file.
    <path:string> the directroy address of the file
    <type:string> File types, use the print.filetypes() to know more about file types

fileProp(path)

    Accepts one argument parameter, <path:string>, it returns an object, the data property contains the basic
    properties on the selected file.
    <path:string> the directory address of the file

fileCreate(path)

    Accepts one argument parameter, <path:string>, it create's a new empty file, it returns an object that tells 
    you if the method execution is successfull or fail and why.

fileDelete(path)

    Accepts one argument parameter, <path:string> it deletes's a file from the directory, it returns an object that
    tells you if the method execution is successfull of fail and why.

fileRename(oldname,newname)

    Accepts two argument parameter, <path:string> it updates the name of the file, it returns an object that tells you
    if the the method execution is successfull or fail and why.

fileCopyToDir(file,distDir,mode,type)

    Accepts four argument parameter, <origin:string> <dist:string> <mode:string> <type:string>
    copys the file and its contents to its distanation directory,  it returns an object that tells you if the method 
    execution is successfull of fail and why.

    This function has no support for setRootDir config

fileContentCopy(origin,dist,filetype)

    Accepts three argument parameter, <origin:string> <dist:string> <filetype:string>
    copy the contents of the origin file into the distanation file. it returns an object that tells you if the method 
    execution is successfull of fail and why.