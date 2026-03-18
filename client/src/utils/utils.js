const logs = false

function log(...args) {
  if (process.env.NODE_ENV !== "production" && logs) {
    for (let index = 0; index < args.length; index++) {
      console.log(args[index]);
      
    }
  }
}
function logError(...args) {
  if (process.env.NODE_ENV !== "production" && logs) {
    for (let index = 0; index < args.length; index++) {
      console.log(args[index]);
      
    }
  }
}
function warn(...args) {
  if (process.env.NODE_ENV !== "production" && logs) {
    for (let index = 0; index < args.length; index++) {
      console.log(args[index]);
      
    }
  }
}
module.exports = { log, logError, warn };