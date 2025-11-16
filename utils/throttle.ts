/**
 * Creates a throttled version of a function that only executes at most once
 * per specified time period. Perfect for limiting expensive operations.
 *
 * @param func The function to throttle
 * @param limit The minimum time (in ms) between function calls
 * @returns The throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastArgs: Parameters<T> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
        // If there were calls during the throttle period, execute the last one
        if (lastArgs) {
          func.apply(context, lastArgs);
          lastArgs = null;
          // Reset throttle for the trailing call
          inThrottle = true;
          setTimeout(() => {
            inThrottle = false;
          }, limit);
        }
      }, limit);
    } else {
      // Store the most recent args to execute after throttle period
      lastArgs = args;
    }
  };
}

/**
 * Creates a debounced version of a function that delays execution until
 * after a specified time has passed since the last call.
 *
 * @param func The function to debounce
 * @param wait The delay in milliseconds
 * @returns The debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}