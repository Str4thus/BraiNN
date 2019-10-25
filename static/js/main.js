console.log("App started");

// -------------
// -  General  -
// -------------
let canvas;
let neurons = []; // runs smooth with up to 3000 neurons
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
    if (event.shiftKey) {
        xoff += event.movementX;
        yoff += event.movementY;
    }

    return false;
}

function mouseClicked(event) {
    let target = $(event.target)[0]
    if (target.id != "app") return true; // Prevent click handling by this method since the click was outside of the canvas 

    try {
        currentTool.handleClick(event);
    } catch (e) {
        // Currently selected tool does not provide the handle key method
        console.error(e);
    }


    if (!event.shiftKey) {
        //let neuronToAdd = new (getNeuronByType(activeType))(mouseX, mouseY, 20);
        //neurons.push(neuronToAdd);
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
    
    // Input


    // Update

    // Display
    for (let i = 0; i < neurons.length; i++) {
        neurons[i].display();
    }

    currentTool.display();
}
// ---------------

