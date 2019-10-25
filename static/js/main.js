console.log("App started");

// -------------
// -  General  -
// -------------
let canvas;
let neurons = [];
let connections = [];
// -------------



// ----------------------------
// -  Display Transformation  -
// ----------------------------
let xoff = 0;
let yoff = 0;
// ----------------------------



// --------------------
// -  Mouse Handling  -
// --------------------
function mouseDragged(event) {
    if (event.shiftKey) { // Scrolling for infinte workspace
        xoff += event.movementX;
        yoff += event.movementY;
    }

    return false;
}

function mouseClicked(event) {
    let target = $(event.target)[0]
    if (target.id != "app") return true; // Prevent click handling by this method since the click was outside of the canvas 

    event.neuron = getHoveredNeuron(); // Neuron hovered during the click, can be null
    if (!event.shiftKey) {
        try {
            currentTool.handleClick(event);
        } catch (e) {
            // Currently selected tool does not provide the handle key method
            console.error(e);
        }
    }

    return false;
}
// --------------------



// -----------------------
// -  Keyboard Handling  -
// -----------------------
function keyTyped() {
}
// -----------------------


// ---------------------
// -  Canvas Handling  -
// ---------------------
function windowResized() {
    resizeCanvas($("#appWrapper").width(), $("#appWrapper").height());
}
// -----------------------



// ---------------
// -  Lifecycle  -
// ---------------
function setup() {
    // Canvas creation
    canvas = createEditor();
    ToolBox.select(null); // null is shortcut for HandTool
}

function draw() {
    background(195, 212, 229);

    // ----------
    // - Update - 
    // ----------


    // -----------
    // - Display - 
    // -----------
    if (currentTool.earlyDisplay) currentTool.display();

    // Connections
    for (let i = 0; i < connections.length; i++) {
        connections[i].display();
    }

    // Neurons
    for (let i = 0; i < neurons.length; i++) {
        neurons[i].display();
    }
    
    if (!currentTool.earlyDisplay) currentTool.display();
}
// ---------------