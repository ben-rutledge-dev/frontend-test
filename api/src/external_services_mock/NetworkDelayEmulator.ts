const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type AsyncReturnType<T> = T extends Promise<infer R>
  ? T
  : Promise<T>;

type Asyncify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => AsyncReturnType<R>
    : T[K];
};

export function NetworkDelayEmulator<T extends object>(target: T, delayMs: number = 100): Asyncify<T> {
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
  }) as Asyncify<T>;
}
