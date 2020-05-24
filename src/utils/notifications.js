export function askNotificationPermission() {
  Notification.requestPermission((status) => {
    console.log("Notification permission status:", status);
  });
}

export function displayNotification(title, body) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.showNotification(title, { body, vibrate: [100, 50, 100] });
    });
  }
}
