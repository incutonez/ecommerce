import { useEffect, useRef, useState } from "react";
import { IOption } from "@/types.ts";

/**
 * Taken from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export function useInterval(callback: () => void, delay: number | null = 2000) {
	const savedCallback = useRef<() => void>(undefined);

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

export function useSelection<T = IOption>(selected?: T) {
	return useState<T | undefined>(selected);
}
