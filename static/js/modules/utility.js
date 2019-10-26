console.log("Utility Module loaded");

// -------------------------------
// -  General Utility Functions  -
// -------------------------------
let lastID = -1;
function getNextID() {
    return ++lastID;
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

// ------------------------------
// -  Neuron Utility Functions  -
// ------------------------------
let bufferDistance = 4;
function isMouseOverNeuron() {
    for (let i = 0; i < neurons.length; i++) {
        if (dist(neurons[i].getX(), neurons[i].getY(), mouseX, mouseY) < (2 * neuronRadius + bufferDistance)) {
            return true;
        }
    }
}

function getHoveredNeuron() {
    let hoveredNeuron = null;
    for (let i = 0; i < neurons.length; i++) {
        if (dist(neurons[i].getX(), neurons[i].getY(), mouseX, mouseY) < neuronRadius) {
            hoveredNeuron = neurons[i];
            break;
        }
    }

    return hoveredNeuron;
}

function connectionExisits(neuronA, neuronB) {
    if (connectionDict[neuronA.id]) {
        return connectionDict[neuronA.id].includes(neuronB.id);
    }
    return false;
}