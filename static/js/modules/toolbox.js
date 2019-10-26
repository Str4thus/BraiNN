console.log("ToolBox Module loaded");


// -----------
// -  Tools  -
// -----------
class Tool {
    constructor(options = {}) {
        this.hovers = options.hovers == undefined;
        this.earlyDisplay = options.earlyDisplay != undefined;
    }

    display() { }

    handleKey(key) { }

    handleClick(event) { }

    handleDrag(event) { }
}

class NeuronTool extends Tool {
    constructor(options = {}) {
        addDataToObject(options, {
            hovers: false,
        })
        super(options);
        this.neuronType = options.neuronType;
        this.neuronClass = this.getNeuronClass(); // javascript Class

        noCursor();
    }

    display() {
        let c = color(...Neurons.colors[this.neuronType], 150);
        fill(c);
        strokeWeight(3);
        stroke(0);

        circle(mouseX, mouseY, Neurons.neuronRadius * 2);
    }

    handleClick(event) {
        if (!isMouseOverNeuron()) {
            let options = {
                x: mouseX - xoff,
                y: mouseY - yoff,
            }
            Neurons.add(this.neuronClass, options);
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
    constructor(options = {}) {
        addDataToObject(options, {
            earlyDisplay: true,
        })
        super(options);

        this.rootNeuron = null;

        cursor(CROSS);
    }

    display() {
        if (this.rootNeuron) {
            stroke(...Connections.colors["empty"]);
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
                let options = {
                    neuronA: this.rootNeuron,
                    neuronB: event.neuron,
                    weight: 100,  // TODO change inital weight
                }
                Connections.add(options);

                this.rootNeuron = null;
                return;
            }
        }
    }
}

class HandTool extends Tool {
    constructor(options = {}) {
        super(options);
        cursor(ARROW);
    }

    handleClick(event) {
        if (event.ctrlKey) { // Deletion when clicked with ctrl key held
            if (event.neuron) {
                Neurons.remove(event.neuron);
            } else if (event.connection) {
                Connections.remove(event.connection);
            }

        }
    }

    handleDrag(event) {
        if (!event.ctrlKey) { // Normal Action without ctrl key held
            if (event.neuron) {
                event.neuron.move(event.movementX, event.movementY);
            } else if (event.connection) {
                // TODO maybe bend connections?
            }
        }
    }
}
// ----------