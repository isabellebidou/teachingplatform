const logs = true

export function log(...args) {
  if (process.env.NODE_ENV !== "production" && logs) {
    for (let index = 0; index < args.length; index++) {
      console.log(args[index]);
      
    }
  }
}
export function logError(...args) {
  if (process.env.NODE_ENV !== "production" && logs) {
    for (let index = 0; index < args.length; index++) {
      console.log(args[index]);
      
    }
  }
}
export function warn(...args) {
  if (process.env.NODE_ENV !== "production" && logs) {
    for (let index = 0; index < args.length; index++) {
      console.log(args[index]);
      
    }
  }
}
//module.exports = { log, logError, warn };