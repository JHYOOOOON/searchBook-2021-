import { request } from "./api/api.js";
export default class App{
    constructor($target){
        console.log(request("밝은 밤", 1));
    }
}