import { useSyncExternalStore } from "react";

export type TSubscribeListener = () => void;

export type ExtStoreSub = Parameters<typeof useSyncExternalStore>[0];

export type ExtStoreSubParam = Parameters<ExtStoreSub>[0];
