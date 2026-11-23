// Register the service worker once the application has loaded.
export function registerPwa() {
  if (!('serviceWorker' in navigator) || location.protocol !== 'https:') return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.error('E104A-H2: service worker registration failed', error);
    });
  });
}
