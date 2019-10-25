console.log("Neural Module loaded");

let neuronColors = {
    "input": [234, 232, 103],
    "hidden": [104, 214, 108],
    "output": [247, 158, 64],
}

let neuronRadius = 50;

// -------------
// -  Neurons  -
// -------------
class Neuron {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.r = neuronRadius;
        this.color = color;
    }

    display() {
        fill(this.color);
        strokeWeight(3);
        stroke(0);
        circle(this.x + xoff, this.y + yoff, this.r);
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
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