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
    }
}

class Tool {
    constructor(options = {}) {
        this.hovers = "hovers" in options ? options["hovers"] : true;
        this.earlyDisplay = "earlyDisplay" in options ? options["earlyDisplay"] : false;
    }

    display() { }

    handleKey(key) { }

    handleClick(event) { }
}

class NeuronTool extends Tool {
    constructor(options) {
        super({ "hovers": false });
        this.neuronType = options["neuronType"];
        this.neuronClass = this.getNeuronClass();

        noCursor();
    }

    display() {
        let c = color(...neuronColors[this.neuronType], 150);
        fill(c);
        strokeWeight(3);
        stroke(0);

        circle(mouseX, mouseY, neuronRadius * 2);
    }

    handleClick(event) {
        if (!isMouseOverNeuron()) {
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
        super({ "earlyDisplay": true });

        this.rootNeuron = null;

        cursor(CROSS);
    }

    display() {
        if (this.rootNeuron) {
            stroke(...connectionColor);
            line(this.rootNeuron.getX(), this.rootNeuron.getY(), mouseX, mouseY);
        }
    }

    handleClick(event) {
        if (event.ctrlKey) { // Cancel
            this.rootNeuron = null;
        }

        if (event.neuron) {
            // Set neuron from which the connection begins
            if (!this.rootNeuron && event.neuron.canConnectFrom) {
                this.rootNeuron = event.neuron;
                return;
            } 

            // Create connection if the second neuron was clicked and prevent double connections
            if (this.rootNeuron && event.neuron.canConnectTo && !connectionExisits(this.rootNeuron, event.neuron)) { 
                connections.push(new Connection(this.rootNeuron, event.neuron, 100)); // TODO change inital weight
                this.rootNeuron = null;
                return;
            }
        }
    }
}

class HandTool extends Tool {
    constructor(options) {
        super();
        cursor(ARROW);
    }
}
// ----------