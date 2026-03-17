const logs = false

function log(text) {
  if (process.env.NODE_ENV !== "production" && logs) {
    console.log(text)
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