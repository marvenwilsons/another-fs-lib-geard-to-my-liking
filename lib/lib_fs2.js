const directory = {
    name: '',
    publicPath: '',
    getName(name) {
        console.log(name)
        return this // for chaining
    },
    test(msg) {
        console.log(msg)
        return this
    }
}

const folders = ['foo','bar','test']

const dir = () => {
    const folder = []

    folders.forEach(el => {
        const f = Object.create(directory)
        f.name = el
        f.publicPath = el
        folder.push(f)
    })

    return folder
}
console.log( dir()[0].getName('test') )

dir.setRoot = 'foo'

dir().getChildren()
dir().deleteChildren(['foo1','bar']) // provide an array of names
dir().sortChildren()

dir().findAndDelete('test.js')
dir().findAndRename('test.js','index.js')
dir().findAndReplace('test.js','index.js')

dir().getAllDir()
dir().emptyDir() // delete all files
dir().killSeflf() // delete all files and deletes it self

// ***************

// Ideal syntax
// d('address/path')
// .deleteChildren(['test.js','index.js','index.html'])
// .deleteChild('index.js')
// .delete()

// dir(``)
// .createFile()
// .createDir()