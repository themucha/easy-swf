import AWS = require("aws-sdk");
import interfaces = require("./Interfaces");
export declare class EventParser {
    extractWorkflowInput(events: AWS.Swf.HistoryEvent[]): string;
    extractWorkflowExecutionData(events: AWS.Swf.HistoryEvent[]): interfaces.IWorkflowExecutionData;
    extractActivities(events: AWS.Swf.HistoryEvent[]): interfaces.IActivity[];
}
