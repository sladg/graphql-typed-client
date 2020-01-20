import { GraphQLInterfaceType, GraphQLObjectType } from 'graphql';
import { RenderContext } from '../common/RenderContext';
export declare const objectType: (type: GraphQLObjectType<any, any, {
    [key: string]: any;
}> | GraphQLInterfaceType, ctx: RenderContext) => void;
