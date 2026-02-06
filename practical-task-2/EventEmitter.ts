interface Listeners {
    [key: string]: Function[]
}

let instance: EventEmitter;

export class EventEmitter {

    constructor() {
        if (instance) {
            return instance;
        
        }

        instance = this;
    }

    private listeners: Listeners = {}

    addListener(eventName: string, fn: Function): this {
        if(this.listeners[eventName]) {
            this.listeners[eventName].push(fn);
        } else {
            this.listeners[eventName] = [fn];
        }

        return this
    }

    on = this.addListener

    once(eventName: string, fn: Function): this {
        const onceWrapper = (data: any) => {
            fn(data);
            this.removeListener(eventName);
        }

        this.addListener(eventName, onceWrapper);

        return this
    }

    removeListener(eventName: string): this {
        delete this.listeners[eventName];

        return this
    }

    off = this.removeListener;

    emit(eventName: string, data?: any): void {
        const listeners = this.listeners[eventName];

        if (listeners && listeners.length > 0) {
            listeners.forEach(listener => listener(data));
        } else {
            throw Error(`No listeners for event ${eventName}`)
        }
    }

    listenerCount(eventName: string): number {
        const listeners = this.listeners[eventName];

        if (listeners) {
            return listeners.length;
        }

        return 0;
    }

    rawListeners(eventName: string): Function[] {
        const listeners = this.listeners[eventName];

        if (listeners) {
            return listeners.slice()
        }

        return [];
    }
}