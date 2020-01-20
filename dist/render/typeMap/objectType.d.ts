import { GraphQLInterfaceType, GraphQLObjectType, GraphQLInputObjectType } from 'graphql';
import { RenderContext } from '../common/RenderContext';
import { FieldMap, Type } from './renderTypeMap';
export declare const objectType: (type: GraphQLObjectType<any, any, {
    [key: string]: any;
}> | GraphQLInterfaceType | GraphQLInputObjectType, ctx: RenderContext) => Type & {
    fields: FieldMap;
};
