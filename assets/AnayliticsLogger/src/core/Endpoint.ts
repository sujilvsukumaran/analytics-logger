import {IEvent} from "../interfaces/IEvent";
import {analyticsConfig} from "./AnalyticsConfig";

export class Endpoint {
    private readonly config: any;
    constructor(service: 'posthog' | 'google_analytics') { // Add other services as needed
        this.config = analyticsConfig[service];
        if (!this.config) {
            throw new Error(`Unsupported analytics service: ${service}`);
        }
    }

    public setDistinctId(distinctId: string): void {
        if (!this.config) {
            throw new Error(`No config found`);
        }
        if (typeof this.config.setDistinctId === 'function') {
            this.config.setDistinctId(distinctId);
        } else {
            throw new Error(`setDistinctId method not found in config`);
        }
    }

    async sendEvent(events: IEvent): Promise<void> {
        const requestBody = JSON.stringify(this.config.createSingleEventBody(events));

        console.log('Sending single event with headers:', this.config.headers);
        console.log('Sending single event with body:', requestBody);

        const response = await fetch(this.config.single_event_end_point, {
            method: 'POST',
            headers: this.config.headers,
            body: requestBody
        });

        if (!response.ok) {
            throw new Error(`Failed to send single of event to ${this.config.single_event_end_point}`);
        } else {
            console.log('single event sent successfully');
        }
    }

    async sendEvents(events: IEvent[]): Promise<void> {
        const requestBody = JSON.stringify(this.config.createBatchEventBody(events));

        console.log('Sending batch of events with headers:', this.config.headers);
        console.log('Sending batch of events with body:', requestBody);

        const response = await fetch(this.config.batch_event_end_point, {
            method: 'POST',
            headers: this.config.headers,
            body: requestBody
        });

        if (!response.ok) {
            throw new Error(`Failed to send batch of events to ${this.config.batch_event_end_point}`);
        } else {
            console.log('Batch of events sent successfully');
        }
    }
}
