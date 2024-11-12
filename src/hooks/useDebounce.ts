import { useRef, useCallback } from 'react';

type CallbackFunction<T extends any[]> = (...args: T) => void;

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
