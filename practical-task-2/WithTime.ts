import { EventEmitter } from "./EventEmitter";

class WithTime extends EventEmitter {

    execute(asyncFunc: Function, ...args: any[]): void {
        this.emit('begin');
        console.time('TIME');

        asyncFunc(...args)
            .then((result: any) => result.json())
            .then((data: any) => this.emit('data', data))
            .catch((err: any) => this.emit('error', err))
            .finally(() => {
                console.timeEnd('TIME');
                this.emit('end');
            })
    }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('Execution started'));
withTime.on('data', (data: any) => console.log('Data received:', data));
withTime.on('error', (err: any) => console.error('Error occurred:', err));
withTime.on('end', () => console.log('Execution ended'));

withTime.execute(fetch, 'https://jsonplaceholder.typicode.com/posts/1');