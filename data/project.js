export default class Project {

    title = "";
    metaData = {
        type : "",
        repoLink : "",
        url : ""
    }

    constructor(title, metaData){
        this.title = title;
        this.metaData = metaData;
    }
}