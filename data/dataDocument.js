class DataDocument {
    message = "OK";
    projects = [];

    constructor(){}

    setProjects(projects){
        this.projects = projects
    }

    setMessage(message){
        this.message = message
    }
}

export default DataDocument;