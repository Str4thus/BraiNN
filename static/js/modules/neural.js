console.log("Neural Module loaded");

let neuronColors = {
    "input": [234, 232, 103],
    "hidden": [104, 214, 108],
    "output": [247, 158, 64],
}

let neuronRadius = 25;

// -------------
// -  Neurons  -
// -------------
class Neuron {
    constructor(x, y, color) {
        this.id = getNextID();
        this.x = x;
        this.y = y;
        this.r = neuronRadius;
        this.color = color;
    }

    display() {
        // Change color on hover with HandTool
        if (currentTool.hovers && dist(this.x + xoff, this.y + yoff, mouseX, mouseY) < this.r) {
            fill(color(199));
        } else {
            fill(this.color);
        }

        strokeWeight(3);
        stroke(0);
        circle(this.getX(), this.getY(), this.r * 2);
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getRadius() {
        return this.r;
    }

    getX() {
        return this.x + xoff;
    }

    getY() {
        return this.y + yoff;
    }
}

class InputNeuron extends Neuron {
    constructor(x, y) {
        super(x, y, color(...neuronColors["input"]));
    }
}

class HiddenNeuron extends Neuron {
    constructor(x, y) {
        super(x, y, color(...neuronColors["hidden"]));
    }
}

class OutputNeuron extends Neuron {
    constructor(x, y) {
        super(x, y, color(...neuronColors["output"]));
    }
}
// -------------


// ----------------
// -  Connection  -
// ----------------
let connectionDict = {}; // Every neuron has its id as key mapped to a list of neuron ids that this neuron is connected to

class Connection {
    constructor(neuronA, neuronB, weight) {
        this.id = getNextID();
        this.neuronA = neuronA;
        this.neuronB = neuronB;
        this.weight = weight;
        this.isRecurrent = neuronA.id == neuronB.id;

        // Update neuronA.id key of connection dict
        if (connectionDict[this.neuronA.id]) {
            connectionDict[this.neuronA.id] = [...connectionDict[this.neuronA.id], this.neuronB.id]
        } else {
            connectionDict[this.neuronA.id] = [this.neuronB.id]
        }

        // Update neuronB.id key of connection dict
        if (connectionDict[this.neuronB.id]) {
            connectionDict[this.neuronB.id] = [...connectionDict[this.neuronB.id], this.neuronA.id]
        } else {
            connectionDict[this.neuronB.id] = [this.neuronA.id]
        }
    }

    display() {
        let sw = constrain(abs(this.weight) * 3, 0.1, 15); // Clamp line thickness
        strokeWeight(sw); // Thicker line -> higher absolute value of the weight
        stroke(0);
        noFill();

        if (this.isRecurrent) {
            curve(this.neuronA.getX() - this.neuronA.getRadius() * .1, this.neuronA.getY() + this.neuronA.getRadius() * 20,
                this.neuronA.getX() - this.neuronA.getRadius() * .8, this.neuronA.getY(),
                this.neuronA.getX() + this.neuronA.getRadius() * .8, this.neuronA.getY(),
                this.neuronA.getX() + this.neuronA.getRadius() * .1, this.neuronA.getY() + this.neuronA.getRadius() * 20);
        } else {
            line(this.neuronA.getX(), this.neuronA.getY(), this.neuronB.getX(), this.neuronB.getY());
        }
    }
}