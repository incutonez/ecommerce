import { TSubscribeListener } from "@/types.ts";

export class BaseStore<T> {
  declare snapshot: T;
  listeners: TSubscribeListener[] = [];
  declare apiController: AbortController;

  abort() {
  	this.apiController?.abort();
  	this.apiController = new AbortController();
  }

  /**
   * We use arrow functions for the subscribe and getSnapshot methods, so we can access the scope of "this" properly
   * from React's useSyncExternalStore.  If we didn't do this, we'd get an error saying "this" is undefined because of
   * how they call the function
   */
  subscribe = (subscriber: TSubscribeListener) => {
  	this.listeners = [...this.listeners, subscriber];
  	return () => {
  		this.listeners = this.listeners.filter((listener) => listener !== subscriber);
  	};
  };

  getSnapshot = () => {
  	return this.snapshot;
  };

  setSnapshot(snapshot: T) {
  	this.snapshot = snapshot;
  	this.publish();
  }

  publish() {
  	for (const listener of this.listeners) {
  		listener();
  	}
  }
}
