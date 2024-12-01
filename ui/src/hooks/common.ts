import { useEffect, useRef } from "react";

/**
 * Taken from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useInterval(callback: () => void, delay: number | null = 2000) {
	const savedCallback = useRef<() => void>();

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			if (savedCallback.current) {
				savedCallback.current();
			}
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}