
function augment(target, source, action) {

  if (action === undefined)
    return source;

  if (action instanceof Function)
    return action.call(this, target, source);

  if (source == undefined)
    return target;

  var targetClone = null;
  for (name in action) {
    var nameIsStar = name == '*';

    if (!nameIsStar && name in source == false)
      continue;

    if (!targetClone)
      targetClone = Object.create(
        typeof target == 'object' ? target : null);

    if (nameIsStar) {
      for (var sourceName in source) {

        targetClone[sourceName] = augment.call(
          this,
          targetClone[sourceName], 
          source[sourceName], 
          action[name]
        );
      }
      continue;
    }

    targetClone[name] = augment.call(
      this,
      targetClone[name], 
      source[name], 
      action[name]
    );
  }

  return targetClone || target;
}

Object.defineProperties(module, {
  exports: { value: augment }
});