import interfaces = require("./Interfaces");
export declare class WorkflowItemRegister implements interfaces.IWorkflowItemRegister {
    private workflowItems;
    constructor();
    addItem(reference: string, name: string, version: string, taskList: string, callback: any): void;
    getItem(name: string, version: string): interfaces.IWorkflowItem;
    getItemByRef(reference: string): interfaces.IWorkflowItem;
}
