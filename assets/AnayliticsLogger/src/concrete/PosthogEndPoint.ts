import { _decorator} from 'cc';
import { IEvent } from '../interfaces/IEvent';
import { Endpoint } from '../core/Endpoint';
const { ccclass, property } = _decorator;

@ccclass('PosthogEndPoint')
export class PosthogEndPoint extends Endpoint {
    private singleEventEndPoint: string = 'https://app.posthog.com/capture/';
    private batchEventEndPoint: string = 'https://app.posthog.com/batch/';
    private apiKey: string = 'phc_dYe6Tn67vCgCRW24aGhrYMKMlpo4gTacy7WFwd1ozkM';
    private distinctId: string = 'user01';

    private headers =  {
        "Content-Type": "application/json"
    }

    public sendEvent(event: IEvent): void {
        const eventBody = this.createSingleEventBody(event);
        console.log('sending single event');
        this.sendEventInternal(this.singleEventEndPoint, this.headers, eventBody);
    }

    public sendEvents(events: IEvent[]): void {
        const eventBody = this.createBatchEventBody(events);
        console.log('sending batch events');
        this.sendEventInternal(this.batchEventEndPoint, this.headers, eventBody);
    }

    public setDistinctId(newDistinctId: string): void {
        this.distinctId = newDistinctId;
    }

    private createBatchEventBody(events: IEvent[]) {
        return {
            api_key: this.apiKey,
            historical_migration: false,
            batch: events.map(event => ({
                event: event.type,
                properties: {
                    ...event.payload,
                    distinct_id: this.distinctId,
                },
                timestamp: new Date().toISOString()
            }))
        };
    }

    private createSingleEventBody(event: IEvent) {
        return {
            api_key: this.apiKey,
            event: event.type,
            properties: {
                ...event.payload,
                distinct_id: this.distinctId,
            },
            timestamp: new Date().toISOString()
        };
    }
}

