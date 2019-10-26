console.log("Neural Module loaded");


// -------------
// -  General  -
// -------------
let neuronRadius = 25;
// -------------



// -------------
// -  Colours  -
// -------------
let neuronColors = {
    "input": [234, 232, 103],
    "hidden": [104, 214, 108],
    "output": [247, 158, 64],
}
let connectionColor = [240];
let connectionArrowColor = [0];
// -------------



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

        this.canConnectTo = true;
        this.canConnectFrom = true;
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

        this.canConnectTo = false;
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


        this.canConnectFrom = false;
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
    }

    display() {
        let sw = constrain(abs(this.weight) * 3, 2, 15); // Clamp line thickness
        strokeWeight(sw); // Thicker line -> higher absolute value of the weight
        stroke(...connectionColor);
        noFill();

        if (this.isRecurrent) {
            curve(this.neuronA.getX() - this.neuronA.getRadius() * .1, this.neuronA.getY() + this.neuronA.getRadius() * 20,
                this.neuronA.getX() - this.neuronA.getRadius() * .8, this.neuronA.getY(),
                this.neuronA.getX() + this.neuronA.getRadius() * .8, this.neuronA.getY(),
                this.neuronA.getX() + this.neuronA.getRadius() * .1, this.neuronA.getY() + this.neuronA.getRadius() * 20);
        } else {
            angleMode(RADIANS);
            // Line values
            let p1 = { x: this.neuronA.getX(), y: this.neuronA.getY() }
            let p2 = { x: this.neuronB.getX(), y: this.neuronB.getY() }
            let middleX = p1.x + ((p2.x - p1.x) / 2);
            let middleY = p1.y + ((p2.y - p1.y) / 2);
            let length = dist(p1.x, p1.y, p2.x, p2.y);

            // Arrow values
            let arrowMinLength = 2;
            let arrowMaxLength = 40;
            let arrowLength = constrain(length * 0.3, arrowMinLength, arrowMaxLength);
            let baseSideLengthOfArrow = 30;
            let angle = atan((p2.y - p1.y) / (p2.x - p1.x));
            
            if (p1.x > p2.x) { // Correct atan result, if necessary
                angle += PI;
            }

            // Draw line
            line(p1.x, p1.y, p2.x, p2.y);
            
            // Rotate and draw the direction arrow
            push();
            strokeWeight(1);
            stroke(...connectionArrowColor);
            fill(...connectionArrowColor);

            translate(middleX, middleY);
            rotate(angle);
            triangle(arrowLength / 2, 0, -arrowLength / 2, baseSideLengthOfArrow / 2, -arrowLength / 2, -baseSideLengthOfArrow / 2);
            pop();
        }
    }
}