/// <reference path="../Scripts/typings/aws-sdk/aws-sdk.d.ts" />
import AWS = require("aws-sdk");
export declare var monitor: Console;
export declare var debug: Console;
export interface ISwfDataAccess {
    startWorkflowExecution(request: AWS.Swf.StartWorkflowExecutionRequest, callback: (err: Error) => void): any;
    pollForActivityTask(domain: string, taskList: string, callback: (err: any, data: AWS.Swf.ActivityTask) => void): any;
    respondActivityTaskCanceled(params: AWS.Swf.RespondActivityTaskCanceledRequest, callback: (err: any, data: any) => void): any;
    respondActivityTaskCompleted(taskToken: string, data: string, callback: (err: any, data: any) => void): any;
    respondActivityTaskFailed(taskToken: string, errMessage: string, callback: (err: any, data: any) => void): any;
    pollForDecisionTask(domain: string, taskList: string, callback: (err: any, data: AWS.Swf.DecisionTask) => void): any;
    respondFailWorkflowExecution(taskToken: string, reason: string, detail: string, callback: (err: any, data: any) => void): any;
    respondCompleteWorkflowExecution(taskToken: string, callback: (err: any, data: any) => void): any;
    respondRecordMarker(taskToken: string, callback: (err: any, data: any) => void): any;
    respondScheduleActivityTask(taskToken: string, decisions: AWS.Swf.Decision[], callback: (err: any, data: any) => void): any;
}
export declare class SwfDataAccess implements ISwfDataAccess {
    private swf;
    constructor();
    respondScheduleActivityTask(taskToken: string, decisions: AWS.Swf.Decision[], callback: (err: any, data: any) => void): void;
    respondRecordMarker(taskToken: string, callback: (err: any, data: any) => void): void;
    respondCompleteWorkflowExecution(taskToken: string, callback: (err: any, data: any) => void): void;
    respondFailWorkflowExecution(taskToken: string, reason: string, detail: string, callback: (err: any, data: any) => void): void;
    respondActivityTaskCanceled(params: AWS.Swf.RespondActivityTaskCanceledRequest, callback: (err: any, data: any) => void): void;
    respondActivityTaskCompleted(taskToken: string, result: string, callback: (err: any, data: any) => void): void;
    respondActivityTaskFailed(taskToken: string, errMessage: string, callback: (err: Error, data: any) => void): void;
    pollForDecisionTask(domain: string, taskList: string, callback: any): void;
    pollForActivityTask(domain: string, taskList: string, callback: any): void;
    startWorkflowExecution(request: AWS.Swf.StartWorkflowExecutionRequest, callback: (err: Error) => void): void;
}
