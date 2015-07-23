export declare class BadConfigError implements Error {
    name: string;
    message: string;
    constructor(message?: string);
}
export declare class NullOrEmptyArgumentError implements Error {
    name: string;
    message: string;
    constructor(message?: string);
}
export declare class InvalidArgumentError implements Error {
    name: string;
    message: string;
    constructor(message?: string);
}
