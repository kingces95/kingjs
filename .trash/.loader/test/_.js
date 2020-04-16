var test = {
  foo() { },
  get bar() { }
};

console.log(Object.getOwnPropertyDescriptor(test, 'foo'));
console.log(Object.getOwnPropertyDescriptor(test, 'bar'));
console.log(Object.getOwnPropertyDescriptor(test, 'bar').get);

return