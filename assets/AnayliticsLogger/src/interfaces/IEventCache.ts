import { IEvent } from './IEvent';

export interface IEventCache {
    addEvent(event: IEvent): void;
    getEvents(): IEvent[];
    clear(): void;
}
