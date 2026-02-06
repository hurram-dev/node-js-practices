/* EventEmitter is a class that helps us create a publisher-subscriber pattern in NodeJS. 
With an event emitter, we can simply raise a new event from a different part of an application, and a listener will listen to the raised 
event and have some action performed for the event.

EventEmitter is an object provided by the events module. It binds a function with an event. 
This bound function is then used to handle the event and perform actions accordingly. 
We can emit events in any part of the application and have a function setup that listens to it.
*/

/*
Creating an Event Emitter
To create an event emitter, we need to create an instance of the event emitter instance from the events module in NodeJS.

import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();

This will create an EventEmitter instance.

*/


/*

Publishing Events and Listening to Them
The EventEmitter class comes with a lot of member functions. We’ll be using these member functions to publish events and listen to them.

Below are the member functions in the EventEmitter class.

class EventEmitter extends internal {
    static listenerCount(emitter: EventEmitter, event: string | symbol): number;
    static defaultMaxListeners: number;
    
    addListener(event: string | symbol, listener: (...arg: any[]) => void): this;
    on(event: string | symbol, listener: (...arg: any[]) => void): this;
    once(event: string | symbol, listener: (...arg: any[]) => void): this;
    prependListener(event: string | symbol, listener: (...arg: any[]) => void): this;
    prependOnceListener(event: string | symbol, listener: (...arg: any[]) => void): this;
    off(event: string | symbol, listener: (...arg: any[]) => void): this;
    removeAllListeners(event?: string | symbol): this;
    setMaxListeners(n: number): this;
    getMaxListeners(): number;
    listeners(event: string | symbol): Function[];
    rawListeners(event: string | symbol): Function[];
    emit(event: string | symbol, ...arg: any[]): boolean;
    eventNames(): Array<string | symbol>;
    listenerCount(type: string | symbol): number;
}

*/

import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => {
    console.log('Event Started'); 
})

eventEmitter.emit('start');



