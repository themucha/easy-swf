import nodeunit = require("nodeunit");
export declare function nullErrorTest(test: nodeunit.Test, fnc: () => void): void;
export declare function invalidArgumentErrorTest(test: nodeunit.Test, fnc: () => void): void;
export declare function badConfigErrorTest(test: nodeunit.Test, fnc: () => void): void;
export declare function errorTest(test: nodeunit.Test, errorType: Error, fnc: () => void): void;
