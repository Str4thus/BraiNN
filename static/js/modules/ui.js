console.log("Interface Module loaded");


// ---------------
// -  UIElement  -
// ---------------
class UIElement {
    constructor(options = {}) {
        this.id = getNextID();
        this.x = options.x || Infinity;
        this.y = options.y || Infinity;

        this.defaultColor = options.color || [140];
        this.hoverColor = options.hoverColor || this.defaultColor;
        this.color = this.defaultColor;

        this.isHovered = false;
    }

    // Hovering
    onHoverEnter() {
        this.isHovered = true;
        this.color = this.hoverColor;
    }

    onHoverExit() {
        this.isHovered = false;
        this.color = this.defaultColor;
    }

    onHover() { }


    // Life Cycle
    update() { }
    display() { }
    remove() { }

    // Get Position Data
    getPosition() {
        return { x: this.x + xoff, y: this.y + yoff };
    }

    getX() {
        return this.x + xoff;
    }

    getY() {
        return this.y + yoff;
    }
}
// -------------



// -------------
// -  Neurons  -
// -------------
class Neuron extends UIElement {
    constructor(options = {}) {
        addDataToObject(options, {
            hoverColor: Neurons.colors["hovered"],
        })
        super(options);

        this.radius = options.radius || Neurons.neuronRadius;
        this.canConnectTo = options.canConnectTo == undefined;
        this.canConnectFrom = options.canConnectFrom == undefined;
    }

    display() {
        fill(this.color);
        strokeWeight(3);
        stroke(0);
        circle(this.getX(), this.getY(), this.radius * 2);
    }

    move(x, y) {
        this.x += x;
        this.y += y;
    }

    remove() { }
}

class InputNeuron extends Neuron {
    constructor(options = {}) {
        addDataToObject(options, {
            color: Neurons.colors["input"],
            canConnectTo: false,
        });
        super(options);
    }
}

class HiddenNeuron extends Neuron {
    constructor(options = {}) {
        addDataToObject(options, {
            color: Neurons.colors["hidden"],
        });
        super(options);
    }
}

class OutputNeuron extends Neuron {
    constructor(options = {}) {
        addDataToObject(options, {
            color: Neurons.colors["output"],
            canConnectFrom: false,
        });
        super(options);
    }
}
// -------------



// ----------------
// -  Connection  -
// ----------------
class Connection extends UIElement {
    constructor(options = {}) {
        addDataToObject(options, {
            color: Connections.colors["empty"],
            hoverColor: Connections.colors["hovered"],
        });
        super(options);

        // General
        this.neuronA = options.neuronA;
        this.neuronB = options.neuronB;
        this.weight = options.weight;
        this.isRecurrent = this.neuronA.id == this.neuronB.id;

        // Drawing values
        this.arrowColor = options.arrowColor || Connections.colors["arrow"];
        this.arrowMinLength = options.arrowMinLength || 2;
        this.arrowMaxLength = options.arrowMaxLength || 40;
        this.arrowBaseSideLength = options.arrowBaseSideLength || 30;
        this.strokeWeight = constrain(abs(this.weight) * 3, 2, 15); // Clamp line thickness

        // Update neuronA.id key of connection dict
        if (Connections.connectionDict[this.neuronA.id]) {
            Connections.connectionDict[this.neuronA.id].push(this.neuronB.id);
        } else {
            Connections.connectionDict[this.neuronA.id] = [this.neuronB.id]
        }
    }

    display() {
        strokeWeight(this.strokeWeight); // Thicker line -> higher absolute value of the weight
        stroke(...this.color);

        if (this.isRecurrent) { // Draw Recurrent Connection
            noFill();
            curve(this.neuronA.getX() - this.neuronA.radius * .1, this.neuronA.getY() + this.neuronA.radius * 20,
                this.neuronA.getX() - this.neuronA.radius * .8, this.neuronA.getY(),
                this.neuronA.getX() + this.neuronA.radius * .8, this.neuronA.getY(),
                this.neuronA.getX() + this.neuronA.radius * .1, this.neuronA.getY() + this.neuronA.radius * 20);
        } else { // Draw Normal Connection
            angleMode(RADIANS);
            // Line values
            let p1 = { x: this.neuronA.getX(), y: this.neuronA.getY() }
            let p2 = { x: this.neuronB.getX(), y: this.neuronB.getY() }
            let middleX = p1.x + ((p2.x - p1.x) / 2);
            let middleY = p1.y + ((p2.y - p1.y) / 2);
            let length = dist(p1.x, p1.y, p2.x, p2.y);

            // Arrow values
            let arrowLength = constrain(length * 0.3, this.arrowMinLength, this.arrowMaxLength);
            let angle = atan((p2.y - p1.y) / (p2.x - p1.x));

            if (p1.x > p2.x) { // Correct atan result, if necessary
                angle += PI;
            }

            // Draw line
            line(p1.x, p1.y, p2.x, p2.y);

            // Rotate and draw the direction arrow
            push(); // New drawing context
            strokeWeight(1);
            stroke(...Connections.colors["arrow"]);
            fill(...Connections.colors["arrow"]);

            translate(middleX, middleY);
            rotate(angle);
            triangle(arrowLength / 2, 0, -arrowLength / 2, this.arrowBaseSideLength / 2, -arrowLength / 2, -this.arrowBaseSideLength / 2);
            pop(); // Restore old drawing context
        }
    }


    remove() { }
}
// ----------------
