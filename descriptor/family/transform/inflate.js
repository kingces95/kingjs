function inflate(name, copyOnWrite) {
  return map.call(this, function(key, value) {

    if (value instanceof Function == false)
      return value;
    
    if (value.name != '$')
      return value;

    return value(name, key);    
  }, copyOnWrite)
}