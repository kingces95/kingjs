'use strict';

var assert = require('assert');
var createConstructor = require('..');

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

assert(Vehicle.prototype.constructor == Vehicle);
assert(Vehicle.name == 'Vehicle');
assert(Vehicle.prototype instanceof Object);

assert(Car.prototype.constructor == Car);
assert(Car.name == 'Car');
assert(Car.prototype instanceof Vehicle);

assert(Truck.prototype.constructor == Truck);
assert(Truck.name == 'Truck');
assert(Truck.prototype instanceof Vehicle);

var bmw = new Car('BMW', '330i');
var ford = new Truck('Ford', 'F150', 1000);
var chevy = new Truck('Chevy', 'Tahoe', 2000);

assert(bmw instanceof Vehicle);
assert(bmw instanceof Car);
assert(bmw instanceof Truck == false);
assert(bmw.isVehicle);
assert(bmw.isCar);
assert(bmw.company == 'BMW');
assert(bmw.name == '330i');

assert(ford instanceof Vehicle);
assert(ford instanceof Truck);
assert(ford instanceof Car == false);
assert(bmw.isVehicle);
assert(ford.isTruck);
assert(ford.company == 'Ford');
assert(ford.name == 'F150');
assert(ford.towingCapacity == 1000);

assert(chevy.company == 'Chevy');
assert(chevy.name == 'Tahoe');
assert(chevy.towingCapacity == 2000);