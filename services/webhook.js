import keys from "../config/keys.js";

const newUserWebhookUrlRailway = keys.newUserWebhookUrlRailway;
//const loginHookUrl = keys.loginWebHookUrl;

function sendNotification(url, event, user) {
  // A missing URL must never break authentication.
  if (!url) {
    console.warn(`[n8n] ${event}: webhook URL not configured`);
    return;
  }

  const payload = {
    event,
    user: {
      email: user.email,
      name: user.name,
    },
    timestamp: new Date().toISOString(),
  };

  // Intentionally do not await this request.
  // Handle HTTP errors and network failures inside the promise chain.
  void fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(3000),
  })
    .then((response) => {
      if (!response.ok) {
        console.warn(
          `[n8n] ${event}: webhook returned HTTP ${response.status}`
        );
      }
    })
    .catch((err) => {
      console.warn(
        `[n8n] ${event}: notification unavailable (${err.name})`
      );
    });
}

/*export function notifyUserLogin(user) {
  sendNotification(
    loginHookUrl, 
    "user_login", 
    user);
}*/

export function notifyNewUser(user) {
  sendNotification(
    newUserWebhookUrlRailway,
    "new_user",
    user
  );
}