const logs = false

function log(...args) {
  if (process.env.NODE_ENV !== "production" && logs) {
    for (let index = 0; index < args.length; index++) {
      console.log(args[index]);
      
    }
  }
}
function logError(text) {
  if (process.env.NODE_ENV !== "production" && logs) {
    console.error(text)
  }
}
function warn(text) {
  if (process.env.NODE_ENV !== "production" && logs) {
    console.warn(text)
  }
}
module.exports = { log, logError, warn };