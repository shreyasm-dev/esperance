import sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

export { Result, Ok, Err } from './result';
export { Option, Some, None } from './option';
