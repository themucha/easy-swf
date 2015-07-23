import interfaces = require("./Interfaces");
export declare class ActivityRegister implements interfaces.IActivityRegister {
    private workflow;
    constructor(workflow: interfaces.IOptions);
    registerActivity(name: string, version: string, taskList: string): interfaces.IActivity;
    getActivity(name: string, version: string): interfaces.IActivity;
    getActivityByRef(reference: string): interfaces.IActivity;
}
