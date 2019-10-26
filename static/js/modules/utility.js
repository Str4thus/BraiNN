console.log("Utility Module loaded");

// -------------------------------
// -  General Utility Functions  -
// -------------------------------
let lastID = -1;
function getNextID() {
    return ++lastID;
}

function pointOnLineNearestToMouse(line, x, y) {
    let dx = line.x1 - line.x0;
    let dy = line.y1 - line.y0;
    let t = ((x - line.x0) * dx + (y - line.y0) * dy) / (dx * dx + dy * dy);
    let lineX = lerp(line.x0, line.x1, t);
    let lineY = lerp(line.y0, line.y1, t);
    return ({
        x: lineX,
        y: lineY
    });
}

function lerp(a, b, x) {
    return (a + x * (b - a));
}

function addDataToObject(obj, data) {
    for (let key in data) {
        obj[key] = data[key];
    }
}


// --------------------------
// -  p5 Utility Functions  -
// --------------------------
function createEditor() {
    let editorCanvas = createCanvas($("#appWrapper").width(), $("#appWrapper").height());
    editorCanvas.parent("appWrapper");
    $(editorCanvas.canvas)[0].id = "app";


    $(editorCanvas.canvas)[0].style.width = '100%';
    $(editorCanvas.canvas)[0].style.height = '100%';
    $(editorCanvas.canvas)[0].width = $(editorCanvas.canvas)[0].offsetWidth;
    $(editorCanvas.canvas)[0].height = $(editorCanvas.canvas)[0].offsetHeight;

    return editorCanvas;
}

function fitToContainer(canvas) {
}



// ---------------------------------------------
// -  Neuron and Connection Utility Functions  -
// ---------------------------------------------
function isMouseOverNeuron() {
    let bufferDistance = 4;
    for (let i = 0; i < Neurons.neurons.length; i++) {
        if (dist(Neurons.get(i).getX(), Neurons.get(i).getY(), mouseX, mouseY) < (2 * Neurons.neuronRadius + bufferDistance)) {
            return true;
        }
    }
}

function getHoveredNeuron() {
    let hoveredNeuron = null;
    for (let i = 0; i < Neurons.neurons.length; i++) {
        if (dist(Neurons.get(i).getX(), Neurons.get(i).getY(), mouseX, mouseY) < Neurons.neuronRadius) {
            hoveredNeuron = Neurons.get(i);
            break;
        }
    }

    if (hoveredNeuron)
        return { element: hoveredNeuron, type: "neuron" };
    return null;
}


function getHoveredConnection() {
    let connection = null;

    for (let i = 0; i < Connections.connections.length; i++) {
        let line = {
            x0: Connections.get(i).neuronA.getX(), y0: Connections.get(i).neuronA.getY(),
            x1: Connections.get(i).neuronB.getX(), y1: Connections.get(i).neuronB.getY()
        }

        let pointOnLine = pointOnLineNearestToMouse(line, mouseX, mouseY);
        let dx = mouseX - pointOnLine.x;
        let dy = mouseY - pointOnLine.y;
        let distance = abs(sqrt(dx * dx + dy * dy));
        let bufferDistance = constrain(abs(Connections.get(i).weight), 5, 12); // Adjusted by the thickness of the line (abs value of the weight)
        
        if (mouseX > min(line.x0, line.x1) && mouseX < max(line.x0, line.x1) && distance < bufferDistance) {
            if (connection) {
                connection = Connections.get(i).id > connection.id ? Connections.get(i) : connection;
            } else {
                connection = Connections.get(i);
            }
        }
    }

    if (connection)
        return { element: connection, type: "connection" };
    return null;
}

function connectionExisits(neuronA, neuronB) {
    if (Connections.connectionDict[neuronA.id] && Connections.connectionDict[neuronA.id].includes(neuronB.id)) {
        return true;
    }

    if (Connections.connectionDict[neuronB.id] && Connections.connectionDict[neuronB.id].includes(neuronA.id)) {
        return true;
    }

    return false;
}