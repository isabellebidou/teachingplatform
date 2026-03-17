const logs = false;
export function log(text) {
  if (process.env.NODE_ENV !== "production" && logs) {
    console.log(text);
  }
}

export function logError(text) {
  if (process.env.NODE_ENV !== "production" && logs) {
    console.error(text);
  }
}

export function warn(text) {
  if (process.env.NODE_ENV !== "production" && logs) {
    console.warn(text);
  }
}