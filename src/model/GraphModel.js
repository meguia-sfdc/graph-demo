/* eslint-disable no-multi-str */
class GraphModel {
    nodes = null;
    constructor(){
        this.nodes = {}
    }

    addNode(id, dependencies){
        console.log("adding node", id, dependencies);
        this.nodes[id] = {
            linksTo: []
        };

        for (let i in dependencies){
            let parentId = dependencies[i];
            let parent = this.nodes[parentId];

            if (!parent){
                parent = {
                    linksTo: []
                };
                this.nodes[parentId] = parent;
            }

            if (parent.linksTo.includes(id)){
                throw new Error("duplicate link: " + parentId + " -> " + id);
            }
            parent.linksTo.push(id);
        }
    }

    getModelManifest(){
        /*
        graph TD
            A[Client] --> B[Load Balancer]
            B --> C[Server01]
            B --> D[Server02]
        */
        let manifest = "graph TD\n";
        for (let id in this.nodes){
            for (let linkToId of this.nodes[id].linksTo){
                manifest = manifest + id + " --> " + linkToId +"\n"
            }
        }

        return manifest;
    }
}

export default GraphModel;