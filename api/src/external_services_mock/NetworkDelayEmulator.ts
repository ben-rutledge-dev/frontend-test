const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function NetworkDelayEmulator<T extends object>(target: T, delayMs: number = 100): T {
  return new Proxy(target, {
    get(target, prop) {
      const original = target[prop as keyof T];
      if (typeof original === 'function') {
        return async (...args: any[]) => {
          await delay(delayMs);
          return original.apply(target, args);
        };
      }
      return original;
    },
  });
}
