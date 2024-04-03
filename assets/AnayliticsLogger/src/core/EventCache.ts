import { IEvent } from "../interfaces/IEvent";
import { IEventCache } from "../interfaces/IEventCache";


export class EventCache implements IEventCache {
    private events: IEvent[] = [];

    addEvent(event: IEvent): void {
        this.events.push(event);
    }

    getEvents(): IEvent[] {
        return this.events;
    }

    clear(): void {
        this.events = [];
    }
}
