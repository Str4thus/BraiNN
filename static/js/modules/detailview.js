console.log("Detail Module loaded")

class DetailView {
    static display(element) {
        let panel = document.getElementById("details");
        $(panel).html(createDetailHTML(element));
    }

    static updateElement() {
        let panel = document.getElementById("details");
        let neuron = Neurons.getNeuronById($(panel).find("#id").html());
        console.log(neuron);

        let newX = Number($(panel).find("#x").val());
        neuron.x = newX;
    }
}


function createDetailHTML(element) {
    if (element instanceof Neuron) {
        return createNeuronDetails(element);
    } else if (element instanceof Connection) {
        return createConnectionDetails(element);
    }
}

function createNeuronDetails(neuron) {
    console.log(neuron);
    let html = "<h1>" + neuron.constructor.name + "</h1>" + 
    "<p id='id'>" + neuron.id + "</p>" + 
    "<input type='number' id='x' value=" + Math.round(neuron.getX()) + ">"

    html += ""
    return html;
}

function createConnectionDetails(connection) {
    let html = "<h1>" + connection.constructor.name + "</h1>" + 
    ""

    return html;
}
