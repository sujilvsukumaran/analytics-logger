import { IEvent } from "../interfaces/IEvent";

export const analyticsConfig = {
    posthog: {
        single_event_end_point: 'https://app.posthog.com/capture/',
        batch_event_end_point: 'https://app.posthog.com/batch/',
        headers: {
            "Content-Type": "application/json"
        },
        distinctId: 'user01', // Default distinct_id
        setDistinctId: function(newDistinctId: string) {
            this.distinctId = newDistinctId;
        },
        createBatchEventBody: function(events: IEvent[]) {
            return {
                api_key: 'phc_dYe6Tn67vCgCRW24aGhrYMKMlpo4gTacy7WFwd1ozkM',
                historical_migration: false,
                batch: events.map(event => ({
                    event: event.type,
                    properties: {
                        ...event.payload, // Append the event payload
                        distinct_id: this.distinctId, // Use the current distinct_id
                    },
                    timestamp: new Date().toISOString()
                }))
            };
        },

        createSingleEventBody: function(event: IEvent) {
            return {
                api_key: 'phc_dYe6Tn67vCgCRW24aGhrYMKMlpo4gTacy7WFwd1ozkM',
                event: event.type,
                properties: {
                    ...event.payload, // Append the event payload
                    distinct_id: this.distinctId, // Use the current distinct_id
                },
                timestamp: new Date().toISOString()
            };
        },
    },

    // We can add more plugins based on the need
};

// Example usage:
// analyticsConfig.posthog.setDistinctId('newDistinctId');
// const eventBody = analyticsConfig.posthog.createSingleEventBody(someEvent);

