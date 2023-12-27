export function processRequestBodyValidationErrors (errors) {
  return errors.map(error => `${error.msg} "${error.value}" for path ${error.path}`)
}

export function processDatabaseActionErrors (error) {
  if (error.code === 11000) {
    // duplicate key error
    const key = Object.keys(error.keyPattern)[0] || 'unknown'
    const value = error.keyValue[key] || 'unknown'
    return `Duplicate ${key} detected with value ${value}`
  }
  return error
}
