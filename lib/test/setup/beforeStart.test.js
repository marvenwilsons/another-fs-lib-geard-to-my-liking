const fs = require('fs')
const path = require('path')

const l = path.join(__dirname, '../../foo')

const deleteTArr = () => {
    const mfackingArray2 = ['hello.js', 'hey.js']

    mfackingArray2.map(e => {
        if (fs.existsSync(path.join(__dirname, `../../${e}`))) {
            // fs.unlinkSync(__dirname, `../../${e}`)
            fs.unlinkSync(path.join(__dirname, `../../${e}`))
        }
    })
}

const deleteTArr2 = () => {
    const mfackingArray = ['in1.js', 'in2.js', 'in3.js']

    mfackingArray.map(e => {
        if (fs.existsSync(`${l}/${e}`)) {
            // console.log(e)
            fs.unlinkSync(`${l}/${e}`)
        }
    })
}

afterAll(() => {
    // touch test creates this 3 files, I have to delete this before starting

    deleteTArr()
    deleteTArr2()
})

beforeAll(() => {
    deleteTArr()
    deleteTArr2()
})

// beforeAll(() => {
//     fs.unlinkSync(path.join(__dirname, '../../hello.js'))
//     fs.unlinkSync(path.join(__dirname, '../../hey.js'))
// })

it('should be true', () => {
    expect(true).toBe(true)
})