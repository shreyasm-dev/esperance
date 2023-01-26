import sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

export { Ok, Err } from './result';
export { Some, None } from './option';
