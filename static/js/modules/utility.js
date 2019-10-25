console.log("Utility Module loaded");

// -------------------------------
// -  General Utility Functions  -
// -------------------------------


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