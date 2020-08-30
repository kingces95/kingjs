var { assert,
  '@kingjs': {
    EmptyObject,
    IObservable,
    '-rx-sync': { GroupBy },
    '-module': { ExportInterfaceExtension },
  }
} = module[require('@kingjs-module/dependencies')]()

/**
 * @description Groups observations with a common key into `IGroupedObservables`
 * which in turn emit the observations. 
 * 
 * @this any The `IObservable` to group.
 * @param [keySelector] Select the key.
 * @param [groupCloser] Select if a group should be completed. 
 * 
 * @callback keySelector
 * @param value The value.
 * @returns Returns the key for the value.
 * 
 * @callback groupCloser
 * @param key The group's key.
 * @param value The group's next value.
 * @returns Returns `true` to complete the group instead of emitting 
 * `value` or false to emit the `value`.
 * 
 * @returns Returns an `IObservable` that emits `IGroupedObservable`.
 * 
 * @remarks Calling `cancel` inside the `keySelector` or `groupCloser`
 * is disallowed. 
 */
function groupBy(
  keySelector = Identity,
  options = EmptyObject
) {

  return this[GroupBy](
    keySelector, { 
      ...options,
      async: true,
    }
  )
}

module[ExportInterfaceExtension](IObservable, groupBy)