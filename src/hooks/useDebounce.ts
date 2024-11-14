import { useRef, useCallback } from 'react';

type CallbackFunction<T extends any[]> = (...args: T) => void;

/**
 * Custom hook that returns a debounced version of a callback function.
 * The debounced function will delay the execution of the callback until after
 * a specified delay has passed since the last time the debounced function was invoked.
 *
 * @template T - The types of arguments that the callback function accepts.
 * @param {CallbackFunction<T>} callback - The function to debounce.
 * @param {number} delay - The delay in milliseconds to wait before invoking the callback.
 * @returns {(...args: T) => void} A debounced version of the callback function.
 *
 * @example
 * // Example usage:
 * const handleInputChange = useDebounce((value) => {
 *   console.log('Input value:', value);
 * }, 300);
 *
 * <input onChange={(e) => handleInputChange(e.target.value)} />
 *
 * @typedef {(...args: T) => void} CallbackFunction - The type of the callback function.
 *
 * @remarks
 * This hook uses `useRef` to keep track of the timeout ID and `useCallback` to memoize the debounced function.
 * It clears the previous timeout whenever the debounced function is called before the delay ends.
 * This ensures that the callback is only executed once after the specified delay when there are no further calls.
 */

export function useDebounce<T extends any[]>(callback: CallbackFunction<T>, delay: number) {
	const timeoutRef = useRef<number | null>(null);

	const debouncedFunction = useCallback(
		(...args: T) => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = window.setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);

	return debouncedFunction;
}
