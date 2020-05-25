var {
  '@kingjs': {
    '-linq': { Join, EnumerateAndAssert,
      '-static': { of },
    },
  }
} = module[require('@kingjs-module/dependencies')]()

of(
  { name: `Alice`, key: 0 },
  { name: `Bob`, key: 1 },
  { name: `Chris`, key: 2 }, // no pets
)[Join](
  of(
    { name: `Fluffy`, ownerKey: 0 },
    { name: `Spike`, ownerKey: 0 },
    { name: `Snuggles`, ownerKey: 1 },
    { name: `Butch`, ownerKey: 3 }, // no owner
  ),
  function(person) { return person.key },
  function(animal) { return animal.ownerKey },
  function(owner, pet) { return owner.name + ' owns ' + pet.name },
)[EnumerateAndAssert]([
  'Alice owns Fluffy',
  'Alice owns Spike',
  'Bob owns Snuggles'
])

of(
  { name: `Fluffy`, ownerKey: 0 },
  { name: `Spike`, ownerKey: 0 },
  { name: `Snuggles`, ownerKey: 1 },
  { name: `Butch`, ownerKey: 3 }, // no owner
)[Join](
  of(
    { name: `Alice`, key: 0 },
    { name: `Bob`, key: 1 },
    { name: `Chris`, key: 2 }, // no pets
  ), 
  function(animal) { return animal.ownerKey },
  function(person) { return person.key },
  function(owner, pet) { return owner.name + ' is owned by ' + pet.name },
)[EnumerateAndAssert]([
  'Fluffy is owned by Alice',
  'Spike is owned by Alice',
  'Snuggles is owned by Bob'
])