import interfaces = require("./Interfaces");
export declare class FunctionWrapper {
    private activity;
    private context;
    constructor(activity: interfaces.IActivity, context: interfaces.IDecisionContext);
    getFunction(): (input: string, clientMethod: (err: any, data: any) => void) => void;
    timedOut(input: string, clientMethod: (err, data) => void): void;
    failed(input: string, clientMethod: (err, data) => void): void;
    scheduled(input: string, clientMethod: (err, data) => void): void;
    started(input: string, clientMethod: (err, data) => void): void;
}
