import AWS = require("aws-sdk");
export declare function buildScheduleActivityTask(input: string, activityName: string, version: string, taskList: string): AWS.Swf.Decision;
export declare function buildRecordMarker(markerName: string): AWS.Swf.Decision;
export declare function buildCompleteWorkflowExecution(): AWS.Swf.Decision;
export declare function buildFailWorkflowExecution(reason: string, detail: string): AWS.Swf.Decision;
