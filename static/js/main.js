console.log("Welcome to BraiNN!");

// -------------
// -  General  -
// -------------
let canvas;
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
    if (event.shiftKey) { // Scrolling (for infinte workspace)
        xoff += event.movementX;
        yoff += event.movementY;
    } else {
        let hoveredElementInfo = checkElementHovering.currentlyHoveredElementInfo;
        if (hoveredElementInfo.type == "neuron")
            event.neuron = hoveredElementInfo.element;

        ToolBox.currentTool.handleDrag(event);
    }

    return false;
}

function mouseClicked(event) {
    let target = $(event.target)[0]
    if (target.id != "app") return true; // Prevent click handling by this method if the click was outside of the canvas (#app)

    // Determine hovered element on click
    let hoveredElementInfo = checkElementHovering.currentlyHoveredElementInfo;
    event.neuron = event.connection = null;
    switch (hoveredElementInfo.type) {
        case "neuron":
            event.neuron = hoveredElementInfo.element;
            break;
        case "connection":
            event.connection = hoveredElementInfo.element;
            break;
    }

    if (!event.shiftKey) {
        ToolBox.currentTool.handleClick(event);
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
function checkElementHovering() {
    if (!ToolBox.currentTool.hovers) return;

    let hoveredElementInfo = getHoveredNeuron() || getHoveredConnection() || { element: null, type: null } // ADD HOVERABLE ELEMENTS HERE
    let hoveredElement = hoveredElementInfo.element;
    checkElementHovering.currentlyHoveredElementInfo = hoveredElementInfo;
    checkElementHovering.currentlyHoveredElement = hoveredElement;

    // If something has been hovered before and now something new is being hovered (moving mouse from one connection to another at an intersection e.g.)
    if (checkElementHovering.previouslytHoveredElement // previously hovered element exisits
        && hoveredElement // currently hovered element exists
        && checkElementHovering.previouslytHoveredElement.id != hoveredElement.id) { // previous element and current element are different
        checkElementHovering.previouslytHoveredElement.onHoverExit();
    }

    // If something has been hovered before and is now not hovered anymore
    if (checkElementHovering.previouslytHoveredElement
        && !hoveredElement) {
        checkElementHovering.previouslytHoveredElement.onHoverExit();
    }

    // If the hovered element hasn't been hovered before
    if (hoveredElement && !hoveredElement.isHovered) {
        hoveredElement.onHoverEnter();
    }

    // If an element is being hovered at the moment
    if (hoveredElement && hoveredElement.isHovered) {
        hoveredElement.onHover();
    }

    checkElementHovering.previouslytHoveredElementInfo = hoveredElementInfo;
    checkElementHovering.previouslytHoveredElement = hoveredElement;
}

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
    checkElementHovering();

    // -----------
    // - Display - 
    // -----------
    if (ToolBox.currentTool.earlyDisplay) ToolBox.currentTool.display();

    // Display Connections
    Connections.displayAll();

    // Display Neurons
    Neurons.displayAll();

    if (!ToolBox.currentTool.earlyDisplay) ToolBox.currentTool.display();
}
// ---------------