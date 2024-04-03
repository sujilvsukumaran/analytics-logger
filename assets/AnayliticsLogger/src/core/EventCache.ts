import {IEventCache} from "db://assets/AnayliticsLogger/src/interfaces/IEventCache";
import {IEvent} from "db://assets/AnayliticsLogger/src/interfaces/IEvent";


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
