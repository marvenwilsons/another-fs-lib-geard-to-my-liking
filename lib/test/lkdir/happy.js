
// configuration of the directory convenction
const conf = {
    props: {
        name: 'forms'
    },
    directChild: {
        type: 'dir'
    },
    childContents: {
        type: 'file',
        files: ['conf.js','index.js'],
    }
}

// initializing
fs.lkdir.init('lib/foo/bom',conf)

fs.lkdir.getContents('user login form')
// [{name: 'user login form', 'conf.js': 'text content of the file' }]

fs.lkdir.getContents()
// returns everything in the dir