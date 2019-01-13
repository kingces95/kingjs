/**
 * Bind descriptor functions with `target`.
 * @this {propertyDescriptor} The descriptor.
 * @param target The target to bind to any descriptor functions.
 * @param name The name to set on the newly bound functions.
 */
declare function bind(
  this: propertyDescriptor,
  target: any, 
  name: string) : propertyDescriptor;

interface propertyDescriptor {
  get: Function,
  set: function,
}