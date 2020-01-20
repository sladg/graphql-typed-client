import { OperationTypeNode } from 'graphql';
import { TypeMapper } from './applyTypeMapperToResponse';
import { LinkedType } from './linkTypeMap';
export interface Args {
    [arg: string]: any | undefined;
}
export interface Fields {
    [field: string]: Request;
}
export declare type Request = boolean | number | Fields | [Args, Fields?];
export interface Variables {
    [name: string]: {
        value: any;
        typing: [string, LinkedType];
    };
}
export interface Context {
    root: LinkedType;
    varCounter: number;
    variables: Variables;
    fragmentCounter: number;
    fragments: string[];
}
export interface Gql {
    query: string;
    variables: {
        [name: string]: any;
    };
}
export declare const requestToGql: (operation: OperationTypeNode, root: LinkedType, fields: Fields, typeMapper?: TypeMapper | undefined) => Gql;
