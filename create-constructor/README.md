# @[kingjs](https://www.npmjs.com/package/kingjs)/create-constructor
## Usage
```js
var createConstructor = require('@kingjs/create-constructor');

var Vehicle = createConstructor(
  'Vehicle',
  null,
  function Vehicle(company, name) { 
    this.company = company;
    this.name = name;
  }
);
Vehicle.prototype.isVehicle = true;

var Car = createConstructor(
  'Car',
  Vehicle
);
Car.prototype.isCar = true;

var Truck = createConstructor(
  'Truck',
  Vehicle,
  function(company, name, towingCapacity) {
    this.towingCapacity = towingCapacity;
  }
);
Truck.prototype.isTruck = true;
```
result:
```js
```
## API
```ts
declare function createConstructor(
): any
```
### Parameters
### Returns
## Remarks
## Install
With [npm](https://npmjs.org/) installed, run
```
$ npm install @kingjs/create-constructor
```
## License
MIT

![Analytics](https://analytics.kingjs.net/create-constructor)