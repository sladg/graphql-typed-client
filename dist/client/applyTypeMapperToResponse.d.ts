import { ExecutionResult } from 'graphql'
import { LinkedType } from './linkTypeMap'
export interface TypeMapper {
  [type: string]:
    | {
        serialize: (input: any) => any
        deserialize: (output: any) => any
      }
    | undefined
}
export declare const applyTypeMapperToResponse: <T>(
  root: LinkedType,
  result: ExecutionResult<T>,
  mapper: TypeMapper,
) => ExecutionResult<T>
