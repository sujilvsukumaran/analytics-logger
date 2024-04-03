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

    async sendEvent(event: IEvent): Promise<void> {

        const requestBody = JSON.stringify(this.config.createBody(event));

        console.log('Sending event with headers:', this.config.headers);
        console.log('Sending event with body:', requestBody);

        const response = await fetch(this.config.url, {
            method: 'POST',
            headers: this.config.headers,
            body: requestBody
        });

        if (!response.ok) {
            throw new Error(`Failed to send event to ${this.config.url}`);
        } else {
            console.log('Event sent successfully');
        }
    }
}