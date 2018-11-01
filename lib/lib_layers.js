class layer {
    constructor() {
        this.dataStack = undefined
        this.dataStates = []
        this.descs = []
        this.logs = []
        this.setLayerHead = (data) => {            
            this.dataStack = data
        }
        this.layer = (desc,callback) => {           
            this.dataStates.push({[desc]:this.dataStack})
            callback({
                data: this.dataStack,
                states: this.dataStates
            })
        }
        this.next = (data) => {
            this.dataStack = data
        }
    }    
}
module.exports = layer