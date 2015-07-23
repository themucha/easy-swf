import a = require("./Activity");
import d = require("./Decider");
import dal = require("./SwfDataAccess");
import interfaces = require("./Interfaces");
export declare class WorkflowClient {
    private workflow;
    private swf;
    constructor(workflow: interfaces.IOptions, awsConfig?: any, swf?: dal.ISwfDataAccess);
    private validateOptions(workflow);
    private validateConfig(awsConfig);
    createActivityHost(taskList: string): a.ActivityHost;
    createDeciderHost(taskList: string): d.DecisionHost;
    startWorkflow(name: string, version: string, input: string, callback: (err) => void): void;
}
