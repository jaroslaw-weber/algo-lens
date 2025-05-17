interface Window {
  umami: {
    track: (eventName: string, data?: object) => void;
  };
}