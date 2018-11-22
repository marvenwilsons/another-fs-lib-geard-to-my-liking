const layer = require('../lib/lib_layers')

const utils = new layer

const sampleObj = {
    payload: 'test',
    method: 'the quick brown fox',
    name: 'Marven',
    head: "test"
}

utils.setLayerHead(sampleObj, "object")
// utils.config.logging = true
// utils.config.useTrace = true

utils.layer("parsing user input", (data) => {
    let currentObj = {}
    if(data.data.payload == "test"){
        currentObj = {
            status: "pass",
            method: "POST"
        }
    }
    return utils.next(currentObj)
})

utils.layer("test", (data) => {
    let x = {}
    if(data.data.status == "pass"){
        x.status = "go now"
    }
    return utils.next(x)
})

utils.layer("layer 3",(data) => {
    var x = data
    console.log(x.states)
})