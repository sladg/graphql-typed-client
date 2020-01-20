import { GraphQLNamedType, GraphQLSchema } from 'graphql';
import { RenderContext } from '../render/common/RenderContext';
export interface TypeRenderer {
    (type: GraphQLNamedType, ctx: RenderContext): void;
}
export interface SchemaRenderer {
    (schema: GraphQLSchema, ctx: RenderContext): void;
}
export declare const toClientSchema: (schemaGql: string) => Promise<GraphQLSchema>;
export declare const schemaRenderTest: (schemaGql: string, renderer: SchemaRenderer, parser?: "html" | "json" | "babylon" | "babel" | "babel-flow" | "flow" | "typescript" | "postcss" | "css" | "less" | "scss" | "json5" | "json-stringify" | "graphql" | "markdown" | "vue" | "angular" | "mdx" | "yaml" | undefined) => Promise<string>;
export declare const typeRenderTest: (schemaGql: string, renderer: TypeRenderer, typeNames: string[], parser?: "html" | "json" | "babylon" | "babel" | "babel-flow" | "flow" | "typescript" | "postcss" | "css" | "less" | "scss" | "json5" | "json-stringify" | "graphql" | "markdown" | "vue" | "angular" | "mdx" | "yaml" | undefined) => Promise<string>;
export declare const typeRenderTestCase: (dirName: string, file: string, renderer: TypeRenderer, typeNames: string[], output?: boolean) => Promise<void>;
