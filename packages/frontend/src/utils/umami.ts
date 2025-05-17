export const trackUmamiEvent = (eventName: string, data?: object) => {
  if (typeof window !== 'undefined' && window.umami) {
    window.umami.track(eventName, data);
  }
};