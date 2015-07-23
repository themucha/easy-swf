/// <reference path="../../typings/tsd.d.ts" />

var acts = require("../Activity");
var wrapper = require("../FunctionWrapper");
var errors = require("../CustomErrors");
var gently = new (require("gently"));
var testGroup = {
    setUp: function (callback) {
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    "Can schedule a task": function (test) {
        var activity = new acts.Activity();
        activity.version = "1.1";
        var context = gently.stub("Decider", "DecisionContext");
        var fnc = new wrapper.FunctionWrapper(activity, context).getFunction();
        gently.expect(context, "doActivity", function (a) {
            test.equal(a.version, activity.version, "The proper activity was not returned");
        });
        fnc(null, function (err, data) {
            test.equal(1, 0, "no callback should happen at this point");
        });
        test.done();
    },
    "Returns a timed out function appropriately": function (test) {
        var activity = new acts.Activity();
        activity.hasTimedOut = true;
        CheckError(activity, test, "TIMEDOUT");
        test.done();
    },
    "Returns a failed function appropriately": function (test) {
        var activity = new acts.Activity();
        activity.hasFailed = true;
        CheckError(activity, test, "FAILED");
        test.done();
    },
    "Returns a completed function appropriately": function (test) {
        var activity = new acts.Activity();
        activity.hasCompleted = true;
        activity.result = "answer";
        var context = gently.stub("Decider", "DecisionContext");
        var fnc = new wrapper.FunctionWrapper(activity, context).getFunction();
        fnc(null, function (err, data) {
            test.notEqual(data, null, "A result must be returned");
            test.equal(data, "answer", "The result property must be returned");
            test.equal(err, null, "No error was returned");
        });
        test.done();
    },
    "Takes no action with a schedule function": function (test) {
        var activity = new acts.Activity();
        activity.hasBeenScheduled = true;
        CheckNoCallback(activity, test, "scheduled");
        test.done();
    },
    "Takes no action with a start function": function (test) {
        var activity = new acts.Activity();
        activity.hasStarted = true;
        CheckNoCallback(activity, test, "started");
        test.done();
    },
    "Ensures that its constructors are set properly": function (test) {
        var activity = gently.stub("Activity", "Activity");
        var context = gently.stub("Decider", "DecisionContext");
        var fnc1 = new wrapper.FunctionWrapper(activity, context);
        try {
            var fnc2 = new wrapper.FunctionWrapper(activity, null);
            test.equal(1, 0, "Error should have occurred");
        }
        catch (e) {
            test.equal(e.name, new errors.NullOrEmptyArgumentError().name, "Null Exception not returned");
        }
        try {
            var fnc3 = new wrapper.FunctionWrapper(null, context);
            test.equal(1, 0, "Error should have occurred");
        }
        catch (e) {
            test.equal(e.name, new errors.NullOrEmptyArgumentError().name, "Null Exception not returned");
        }
        try {
            var fnc4 = new wrapper.FunctionWrapper(null, null);
            test.equal(1, 0, "Error should have occurred");
        }
        catch (e) {
            test.equal(e.name, new errors.NullOrEmptyArgumentError().name, "Null Exception not returned");
        }
        test.done();
    }
};
function CheckError(activity, test, msg) {
    var context = gently.stub("Decider", "DecisionContext");
    var fnc = new wrapper.FunctionWrapper(activity, context).getFunction();
    fnc(null, function (err, data) {
        test.equal(data, null, "Data should not be returned on a " + msg + " error");
        test.equal(err.message, msg, "A " + msg + " error was not returned");
    });
}
function CheckNoCallback(activity, test, msg) {
    var context = gently.stub("Decider", "DecisionContext");
    var fnc = new wrapper.FunctionWrapper(activity, context).getFunction();
    fnc(null, function (err, data) {
        test.equal(1, 0, msg + " should not be called");
    });
}
exports.functionWrapperTests = testGroup;
//# sourceMappingURL=FunctionWrapper-test.js.map
