/// <reference path="../../typings/tsd.d.ts" />

var dec = require("../Decider");
var help = require("../Helpers/TestHelper");
var gently = new (require("gently"));
var testGroup = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    "Can create a Decider Host": function (test) {
        var t = createHostData();
        var host = new dec.DecisionHost(t.wiReg, t.reg, t.domain, t.taskList, t.swf, t.parser);
        test.notEqual(host, null, "nothing returned");
        test.equal(host.taskList, t.taskList, "taskList not set");
        test.done();
    },
    "Throws an error when given bad constructors": function (test) {
        var t = createHostData();
        var host;
        help.nullErrorTest(test, function () {
            host = new dec.DecisionHost(null, t.reg, t.domain, t.taskList, t.swf, t.parser);
        });
        help.nullErrorTest(test, function () {
            host = new dec.DecisionHost(t.wiReg, null, t.domain, t.taskList, t.swf, t.parser);
        });
        help.nullErrorTest(test, function () {
            host = new dec.DecisionHost(t.wiReg, t.reg, null, t.taskList, t.swf, t.parser);
        });
        help.nullErrorTest(test, function () {
            host = new dec.DecisionHost(t.wiReg, t.reg, "", t.taskList, t.swf, t.parser);
        });
        help.nullErrorTest(test, function () {
            host = new dec.DecisionHost(t.wiReg, t.reg, t.domain, null, t.swf, t.parser);
        });
        help.nullErrorTest(test, function () {
            host = new dec.DecisionHost(t.wiReg, t.reg, t.domain, "", t.swf, t.parser);
        });
        help.nullErrorTest(test, function () {
            host = new dec.DecisionHost(t.wiReg, t.reg, t.domain, null, t.swf, t.parser);
        });
        help.nullErrorTest(test, function () {
            host = new dec.DecisionHost(t.wiReg, t.reg, t.domain, t.taskList, null, t.parser);
        });
        help.nullErrorTest(test, function () {
            host = new dec.DecisionHost(t.wiReg, t.reg, t.domain, t.taskList, t.swf, null);
        });
        test.done();
    },
    "Can register a workflow decider": function (test) {
        var t = createHostData();
        var host = new dec.DecisionHost(t.wiReg, t.reg, t.domain, t.taskList, t.swf, t.parser);
        var handler = function (context) {
        };
        gently.expect(t.wiReg, "addItem", function (reference, name, version, taskList, callback) {
            test.equal(name, t.name);
            test.equal(version, t.version);
            test.equal(reference, t.reference);
            test.equal(taskList, t.taskList);
            test.equal(callback, handler);
        });
        host.handleWorkflow(t.name, t.version, handler);
        test.done();
    },
    "parameters cannot be null for handleWorkflow": function (test) {
        var t = createHostData();
        var host = new dec.DecisionHost(t.wiReg, t.reg, t.domain, t.taskList, t.swf, t.parser);
        var handler = function (context) {
        };
        help.nullErrorTest(test, function () {
            host.handleWorkflow(null, t.version, handler);
        });
        help.nullErrorTest(test, function () {
            host.handleWorkflow("", t.version, handler);
        });
        help.nullErrorTest(test, function () {
            host.handleWorkflow(t.name, null, handler);
        });
        help.nullErrorTest(test, function () {
            host.handleWorkflow(t.name, "", handler);
        });
        help.nullErrorTest(test, function () {
            host.handleWorkflow(t.name, t.version, null);
        });
        test.done();
    },
    "Can receive an empty polling response": function (test) {
        var t = createHostData();
        var host = new dec.DecisionHost(t.wiReg, t.reg, t.domain, t.taskList, t.swf, t.parser);
        var handler = function (context) {
        };
        gently.expect(t.wiReg, "addItem", function (reference, name, version, taskList, callback) {
        });
        gently.expect(t.swf, "pollForDecisionTask", function (domain, taskList, callback) {
            test.equal(domain, t.domain);
            test.equal(taskList, t.taskList);
            callback(null, null);
        });
        gently.expect(t.swf, "pollForDecisionTask", function (domain, taskList, callback) {
            host.stop(function (err) {
                test.equal(err, null);
            });
            callback(null, null);
        });
        host.handleWorkflow(t.name, t.version, handler);
        host.listen();
        test.done();
    }
};
function createHostData() {
    var domain = "myDomain";
    var taskList = "myList";
    var swf = gently.stub("Interfaces", "ISwfDataAccess");
    var reg = gently.stub("Activity", "ActivityRegister");
    var parser = gently.stub("EventParser", "EventParser");
    var wiReg = gently.stub("WorkflowItemRegister", "WorkflowItemRegister");
    var name = "TestWorkflow";
    var version = "1";
    var reference = name + "(" + version + ")";
    return {
        domain: domain,
        taskList: taskList,
        swf: swf,
        reg: reg,
        parser: parser,
        wiReg: wiReg,
        name: name,
        version: version,
        reference: reference
    };
}
var testGroup2 = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    "Can create a Decision Context": function (test) {
        var taskList = "myList";
        var swf = gently.stub("Interfaces", "ISwfDataAccess");
        //var reg = gently.stub("Activity", "ActivityRegister");
        var parser = gently.stub("EventParser", "EventParser");
        var state = { events: [] };
        var activity = gently.stub("Activity", "Activity");
        activity.name = "test";
        activity.version = "1";
        activity.taskList = taskList;
        activity.reference = "test_1";
        activity.input = "input";
        gently.expect(parser, "extractActivities", function (events) {
            return ([activity]);
        });
        gently.expect(parser, "extractWorkflowExecutionData", function (events) {
            var data = {
                name: "name",
                version: "version",
                input: "input"
            };
            return (data);
        });
        var context = new dec.DecisionContext(taskList, parser, swf, null, state);
        test.notEqual(context, null, "nothing returned");
        test.equal(context.state, state, "taskList not set");
        test.equal(context.activities[0].name, activity.name, "activities not properly set");
        test.done();
    },
    "Throws an error when given bad constructors": function (test) {
        var taskList = "myList";
        var swf = gently.stub("Interfaces", "ISwfDataAccess");
        //var reg = gently.stub("Activity", "ActivityRegister");
        var parser = gently.stub("EventParser", "EventParser");
        var state = { events: [] };
        help.nullErrorTest(test, function () {
            var context = new dec.DecisionContext(null, parser, swf, null, state);
        });
        help.nullErrorTest(test, function () {
            var context = new dec.DecisionContext(taskList, null, swf, null, state);
        });
        help.nullErrorTest(test, function () {
            var context = new dec.DecisionContext(taskList, parser, null, null, state);
        });
        help.nullErrorTest(test, function () {
            var context = new dec.DecisionContext(taskList, parser, swf, null, null);
        });
        test.done();
    },
    "Can define a feedbackHandler and receive messages": function (test) {
        var t = basicDCSetup();
        gently.expect(t.parser, "extractActivities", function (events) {
            return ([t.activity]);
        });
        gently.expect(t.parser, "extractWorkflowExecutionData", function (events) {
            var data = {
                name: "name",
                version: "version",
                input: "input"
            };
            return (data);
        });
        gently.expect(t.swf, "respondScheduleActivityTask", function (taskToken, decisions, callback) {
            test.equal(taskToken, t.state.taskToken, "task token not correctly set");
            callback(null, "data");
        });
        var called = false;
        var fnc = function (err, message, c) {
            test.equal(c, context, "did not receive the correct context object");
            test.equal(err, null, "unexpected error from feedbackHandler");
            test.equal((message.length > 0), true, "no message returned when one was expected");
            called = true;
        };
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, fnc, t.state);
        context.doNothing();
        test.equal(called, true, "handler was not called");
        test.done();
    },
    "Can get a function": function (test) {
        var t = basicDCSetup();
        gently.expect(t.parser, "extractActivities", function (events) {
            return ([t.activity]);
        });
        gently.expect(t.parser, "extractWorkflowExecutionData", function (events) {
            var data = {
                name: "name",
                version: "version",
                input: "input"
            };
            return (data);
        });
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, null, t.state);
        var fnc = context.getFunction(t.activity.name, t.activity.version);
        test.notEqual(fnc, null, "did not return a function");
        test.done();
    },
    "A function that with a null name emits a error to the decider host": function (test) {
        var t = basicDCSetup();
        var feedbackHandler = decisionHandlerTest(t, "name", test);
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, feedbackHandler, t.state);
        var fnc = context.getFunction(null, t.activity.version);
        test.equal(fnc, null, "did not return a function");
        test.done();
    },
    "A function that with a empty string name emits a error to the decider host": function (test) {
        var t = basicDCSetup();
        var feedbackHandler = decisionHandlerTest(t, "name", test);
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, feedbackHandler, t.state);
        var fnc = context.getFunction("", t.activity.version);
        test.equal(fnc, null, "did not return a function");
        test.done();
    },
    "A function that with a null version emits a error to the decider host": function (test) {
        var t = basicDCSetup();
        var feedbackHandler = decisionHandlerTest(t, "version", test);
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, feedbackHandler, t.state);
        var fnc = context.getFunction(t.activity.name, null);
        test.equal(fnc, null, "did not return a function");
        test.done();
    },
    "A function that with a empty string version emits a error to the decider host": function (test) {
        var t = basicDCSetup();
        var feedbackHandler = decisionHandlerTest(t, "version", test);
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, feedbackHandler, t.state);
        var fnc = context.getFunction(t.activity.name, "");
        test.equal(fnc, null, "did not return a function");
        test.done();
    },
    "Can fail a workflow": function (test) {
        var errorMsg = "my error";
        var t = basicDCSetup();
        gently.expect(t.parser, "extractActivities", function (events) {
            return ([t.activity]);
        });
        gently.expect(t.parser, "extractWorkflowExecutionData", function (events) {
            var data = {
                name: "name",
                version: "version",
                input: "input"
            };
            return (data);
        });
        gently.expect(t.swf, "respondScheduleActivityTask", function (taskToken, decisions, callback) {
            var decision = decisions[0];
            test.equal(decision.failWorkflowExecutionDecisionAttributes.reason, errorMsg, "wrong error message returned");
            test.equal(decision.failWorkflowExecutionDecisionAttributes.details, errorMsg, "wrong error detail returned");
            test.equal(taskToken, t.state.taskToken, "task token not correctly set");
            callback(null, "data");
        });
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, null, t.state);
        context.failWorkflow(new Error(errorMsg));
        test.done();
    },
    "Can signal 'do nothing' when a activity does not yet need to be scheduled": function (test) {
        var t = basicDCSetup();
        gently.expect(t.parser, "extractActivities", function (events) {
            return ([t.activity]);
        });
        gently.expect(t.parser, "extractWorkflowExecutionData", function (events) {
            var data = {
                name: "name",
                version: "version",
                input: "input"
            };
            return (data);
        });
        gently.expect(t.swf, "respondScheduleActivityTask", function (taskToken, decisions, callback) {
            test.equal(decisions.length, 0, "no decisions should have been made");
            test.equal(taskToken, t.state.taskToken, "task token not correctly set");
            callback(null, "data");
        });
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, null, t.state);
        context.doNothing();
        test.done();
    },
    "Can complete a workflow": function (test) {
        var t = basicDCSetup();
        gently.expect(t.parser, "extractActivities", function (events) {
            return ([t.activity]);
        });
        gently.expect(t.parser, "extractWorkflowExecutionData", function (events) {
            var data = {
                name: "name",
                version: "version",
                input: "input"
            };
            return (data);
        });
        gently.expect(t.swf, "respondScheduleActivityTask", function (taskToken, decisions, callback) {
            test.equal(decisions[0].decisionType, "CompleteWorkflowExecution");
            test.equal(decisions.length, 1, "no decisions should have been made");
            test.equal(taskToken, t.state.taskToken, "task token not correctly set");
            callback(null, "data");
        });
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, null, t.state);
        context.completeWorkflow();
        test.done();
    },
    "Can schedule a task with no input": function (test) {
        var t = basicDCSetup();
        gently.expect(t.parser, "extractActivities", function (events) {
            return ([t.activity]);
        });
        gently.expect(t.parser, "extractWorkflowExecutionData", function (events) {
            var data = {
                name: "name",
                version: "version",
                input: "input"
            };
            return (data);
        });
        gently.expect(t.swf, "respondScheduleActivityTask", function (taskToken, decisions, callback) {
            test.equal(taskToken, t.state.taskToken, "task token not correctly set");
            var decision = decisions[0].scheduleActivityTaskDecisionAttributes;
            test.equal(decision.input, "", "no input was sent");
            test.equal(decision.activityType.name, t.activity.name, "names do not match");
            test.equal(decision.activityType.version, t.activity.version, "names do not match");
            test.equal(decision.taskList.name, t.taskList, "names do not match");
            callback(null, "data");
        });
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, null, t.state);
        context.doActivity(t.activity);
        test.done();
    },
    "Can schedule a task with input": function (test) {
        var t = basicDCSetup();
        var input = "myInput";
        gently.expect(t.parser, "extractActivities", function (events) {
            return ([t.activity]);
        });
        gently.expect(t.parser, "extractWorkflowExecutionData", function (events) {
            var data = {
                name: "name",
                version: "version",
                input: "input"
            };
            return (data);
        });
        gently.expect(t.swf, "respondScheduleActivityTask", function (taskToken, decisions, callback) {
            test.equal(taskToken, t.state.taskToken, "task token not correctly set");
            var decision = decisions[0].scheduleActivityTaskDecisionAttributes;
            test.equal(decision.input, input, "no input was sent");
            test.equal(decision.activityType.name, t.activity.name, "names do not match");
            test.equal(decision.activityType.version, t.activity.version, "names do not match");
            test.equal(decision.taskList.name, t.taskList, "names do not match");
            callback(null, "data");
        });
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, null, t.state);
        context.doActivity(t.activity, input);
        test.done();
    },
    "Can schedule multiple tasks in parallel": function (test) {
        var t = basicDCSetup();
        var input = "myInput";
        var act2 = gently.stub("Activity", "Activity");
        act2.name = "test2";
        act2.version = "1";
        act2.taskList = t.taskList;
        act2.reference = "test_2";
        gently.expect(t.parser, "extractActivities", function (events) {
            return ([t.activity, act2]);
        });
        gently.expect(t.parser, "extractWorkflowExecutionData", function (events) {
            var data = {
                name: "name",
                version: "version",
                input: "input"
            };
            return (data);
        });
        gently.expect(t.swf, "respondScheduleActivityTask", function (taskToken, decisions, callback) {
            test.equal(taskToken, t.state.taskToken, "task token not correctly set");
            var decision = decisions[0].scheduleActivityTaskDecisionAttributes;
            var decision2 = decisions[1].scheduleActivityTaskDecisionAttributes;
            test.equal(decision.input, input, "no input was sent");
            test.equal(decision.activityType.name, t.activity.name, "names do not match");
            test.equal(decision.activityType.version, t.activity.version, "names do not match");
            test.equal(decision.taskList.name, t.taskList, "names do not match");
            test.equal(decision2.input, input, "no input was sent");
            test.equal(decision2.activityType.name, t.activity.name, "names do not match");
            test.equal(decision2.activityType.version, t.activity.version, "names do not match");
            test.equal(decision2.taskList.name, t.taskList, "names do not match");
            callback(null, "data");
        });
        var context = new dec.DecisionContext(t.taskList, t.parser, t.swf, null, t.state);
        context.doActivity(t.activity, input);
        context.doActivity(t.activity, input);
        test.done();
    }
};
function basicDCSetup() {
    var taskList = "myList";
    var swf = gently.stub("Interfaces", "ISwfDataAccess");
    var reg = gently.stub("Activity", "ActivityRegister");
    var parser = gently.stub("EventParser", "EventParser");
    var state = { events: [], taskToken: "token" };
    var activity = gently.stub("Activity", "Activity");
    activity.name = "test";
    activity.version = "1";
    activity.taskList = taskList;
    activity.reference = "test_1";
    activity.input = "input";
    return {
        taskList: taskList,
        swf: swf,
        reg: reg,
        parser: parser,
        state: state,
        activity: activity
    };
}
function decisionHandlerTest(t, paramName, test) {
    gently.expect(t.parser, "extractActivities", function (events) {
        return ([t.activity]);
    });
    gently.expect(t.parser, "extractWorkflowExecutionData", function (events) {
        var data = {
            name: "name",
            version: "version",
            input: "input"
        };
        return (data);
    });
    var feedbackHandler = function (err, msg, context) {
        test.notEqual(err, null);
        test.equal(err.message, paramName);
    };
    return feedbackHandler;
}
exports.deciderTests = testGroup;
exports.decisionContextTests = testGroup2;
//# sourceMappingURL=Decider-test.js.map
