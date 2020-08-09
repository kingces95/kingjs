var { assert,
  '@kingjs': {
    ISubject,
    ISubject: { Subscribe, Next, Complete, Error },
    '-rx': { SubscribeAndAssert,
      '-subject': { SubjectProxy, Subject },
    }
  }
} = module[require('@kingjs-module/dependencies')]()

var crud = SubjectProxy()

crud[Subscribe]({
  [Next](o) { console.log(o) }
})

crud.foo = null
console.log(Object.getOwnPropertyNames(crud))
crud.foo = 'bar'
var foo = crud.foo
delete crud.foo
