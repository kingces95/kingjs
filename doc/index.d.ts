/**
 * @argument {number} [foo=42] arg-2
 * @constructor a-constructor
 * @param path arg-0
 * @arg description arg-1
 * @returns a-string 
 * @return a-return 
 * @summary a-summary
 * @see seeThis see-comment
 * @type {(string | boolean)}
 */
declare function docs(
  path: string, 
  description: any) : string;