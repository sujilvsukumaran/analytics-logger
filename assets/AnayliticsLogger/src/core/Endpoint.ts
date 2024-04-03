import {IEvent} from "../interfaces/IEvent";

export abstract class Endpoint {
    public abstract sendEvent(event: IEvent): void;
    public abstract sendEvents(events: IEvent[]): void;
    public abstract setDistinctId(distinctId: string): void;

    protected async sendEventInternal (url : string, headers : any, body : any) : Promise<void> {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            console.log('error reason' + response.statusText);
            throw new Error(`Failed to send event to ${url}`);
        } else {
            console.log('event sent successfully');
        }
    }
}