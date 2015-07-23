import dal = require("./SwfDataAccess");
import interfaces = require("./Interfaces");
export declare class ActivityHost {
    private activityRegister;
    taskList: string;
    private domain;
    private activities;
    private swf;
    private feedbackHandler;
    private continuePolling;
    private lastHeartbeat;
    private heartId;
    private whenStopped;
    constructor(register: interfaces.IActivityRegister, domain: string, taskList: string, swf: dal.ISwfDataAccess);
    handleActivity(name: string, version: string, activityCode?: (data: string, next: (err: Error, result: string) => void) => void): void;
    private getActivityContainer(activityName, version);
    private createHeartbeatWrapper(feedbackHandler);
    listen(feedbackHandler?: (err: Error, message: string) => void): void;
    private start();
    stop(callback?: (err: Error) => void): void;
    private BeginActivityPolling();
    private doActivityPoll(me, domain, taskList);
    private proceedAfterActivity(activityName, activityVersion, taskToken, err?, data?);
}
export declare class WorkflowCallbackContainer implements interfaces.IActivity {
    workflowId: string;
    name: string;
    version: string;
    taskList: string;
    reference: string;
    code: (data: string, next: (err: Error, result: string) => void) => void;
}
export declare class Activity implements interfaces.IActivity {
    reference: string;
    name: string;
    version: string;
    taskList: string;
    result: string;
    input: string;
    hasStarted: boolean;
    hasCompleted: boolean;
    hasBeenScheduled: boolean;
    hasFailed: boolean;
    hasTimedOut: boolean;
}
