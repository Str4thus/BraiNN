console.log("Manager Module loaded");

// ----------------------------
// -  Static Manager Classes  -
// ----------------------------
class ToolBox {
    static currentTool = null;

    static select(clazz, options = {}) {
        let nextTool = clazz ? new (clazz)(options) : new HandTool(options);
        ToolBox.currentTool = nextTool;
    }
}

class Neurons {
    static neurons = []
    static neuronRadius = 25;
    static colors = {
        "input": [234, 232, 103],
        "hidden": [104, 214, 108],
        "output": [247, 158, 64],
        "hovered": [140],
    }

    static displayAll() {
        for (let i = 0; i < Neurons.neurons.length; i++) {
            Neurons.neurons[i].display();
        }
    }

    static add(cstrct, options) { // cstrct is the constructor of the desired Neuron-subclass
        Neurons.neurons.push(new (cstrct)(options));
    }

    static remove(neuron) {
        let index = Neurons.neurons.indexOf(neuron);
        Neurons.neurons.splice(index, 1);

        let allConnections = Connections.connections;
        for (let i = 0; i < allConnections.length; i++) {
            if (allConnections[i].neuronA.id == neuron.id || allConnections[i].neuronB.id == neuron.id) {
                Connections.remove(allConnections[i]);
            }
        }

        neuron.remove();
    }

    static get(index) {
        return Neurons.neurons[index];
    }

    static getNeuronById(id) {
        for (let i = 0; i < Neurons.neurons.length; i++) {
            if (Neurons.neurons[i].id == id) {
                return Neurons.neurons[i];
            }
        }

        return null;
    }
}

class Connections {
    static colors = {
        "empty": [240],
        "arrow": [0],
        "hovered": [180],
    }
    static connections = []
    static connectionDict = {}; // Every neuron has its id as key mapped to a list of neuron ids that this neuron is connected to

    static displayAll() {
        for (let i = 0; i < Connections.connections.length; i++) {
            Connections.get(i).display();
        }
    }

    static add(options) {
        Connections.connections.push(new Connection(options));
    }

    static remove(connection) {
        let index = Connections.connections.indexOf(connection);
        Connections.connections.splice(index, 1);

        let connectionsOfNeuronA = Connections.connectionDict[connection.neuronA.id];
        connectionsOfNeuronA.splice(connectionsOfNeuronA.indexOf(connection.neuronB.id), 1);
        
        if (connectionsOfNeuronA.length == 0) {
            delete Connections.connectionDict[connection.neuronA.id];
        }
        
        connection.remove();
    }

    static get(index) {
        return Connections.connections[index];
    }
}
// ----------------------------