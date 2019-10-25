console.log("ToolBox Module loaded");

// ---------------
// -  Variables  -
// ---------------
let currentTool = null;
// ---------------




// -----------
// -  Tools  -
// -----------
class ToolBox {
    static select(clazz, options = null) {
        let nextTool = clazz ? new (clazz)(options) : new HandTool(options);
        currentTool = nextTool;

        console.log(nextTool);
    }
}

class Tool {
    display() {}

    handleKey(key) {}

    handleClick(click) {}
}

class NeuronTool extends Tool {
    constructor(options) {
        super();
        this.neuronType = options["neuronType"];
        this.neuronClass = this.getNeuronClass();
    }

    display() {
        let c = color(...neuronColors[this.neuronType], 150);
        fill(c);
        strokeWeight(3);
        stroke(0);
        
        circle(mouseX, mouseY, neuronRadius);
    }

    handleClick(click) {
        if (!click.shiftKey) {
            let neuron = new (this.neuronClass)(mouseX - xoff, mouseY - yoff);
            neurons.push(neuron);
        }
    }

    getNeuronClass() {
        switch (this.neuronType) {
            case "input":
                return InputNeuron;

            case "hidden":
                return HiddenNeuron;

            case "output":
                return OutputNeuron;
        }
    }
}

class ConnectionTool extends Tool {
    constructor(options) {
        super();
    }
}

class HandTool extends Tool {
    constructor(options) {
        super();
    }
}
// ----------