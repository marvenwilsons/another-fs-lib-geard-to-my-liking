const fs = require('fs')
const path = require('path')
const dqfs = require('../../lib_dqfs.exts')
const myfs = new dqfs
const l = path.join(__dirname, '../../foo')

const deleteTArr = () => {
    const mfackingArray2 = ['hello.js', 'hey.js']

    mfackingArray2.map(e => {
        if (fs.existsSync(path.join(__dirname, `../../${e}`))) {
            fs.unlinkSync(path.join(__dirname, `../../${e}`))
        }
    })
}

const deleteTArr2 = () => {
    const mfackingArray = ['in1.js', 'in2.js', 'in3.js']

    mfackingArray.map(e => {
        if (fs.existsSync(`${l}/${e}`)) {
            fs.unlinkSync(`${l}/${e}`)
        }
    })
}

const createRMdir = () => {
    if(!fs.existsSync(`${l}/rm`)){
        fs.mkdirSync(`${l}/rm`)
    }    
}

const removeBazinga = () => {
    if (fs.existsSync(`${l}/bazinga`)) {
        myfs.rm(`${l}/bazinga`)
    }
}

const resetIndex = () => {
    fs.existsSync(`${l}/index2.js`) && myfs.mv(`${l}/index2.js`, `${l}/index.js`)
    fs.existsSync(`${l}/sofo2`) && myfs.mv(`${l}/sofo2`, `${l}/sofo`)
}


afterAll(() => {
    resetIndex()
    removeBazinga()
    createRMdir()
    deleteTArr()
    deleteTArr2()
})

beforeAll(() => {
    resetIndex()
    removeBazinga()
    createRMdir()
    deleteTArr()
    deleteTArr2()
})

it('should be true', () => {
    expect(true).toBe(true)
})