import { IEvent } from "../interfaces/IEvent";
import { analyticsConfig } from "./AnalyticsConfig";

export class Endpoint {
    private config: any;

    constructor(service: 'posthog' | 'google_analytics') { // Add other services as needed
        this.config = analyticsConfig[service];
        if (!this.config) {
            throw new Error(`Unsupported analytics service: ${service}`);
        }
    }

    async sendEvent(events: IEvent): Promise<void> {
        const requestBody = JSON.stringify(this.config.createSingleEventBody(events));

        console.log('Sending batch of events with headers:', this.config.headers);
        console.log('Sending batch of events with body:', requestBody);

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
