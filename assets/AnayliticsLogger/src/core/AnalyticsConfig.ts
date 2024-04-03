import { IEvent } from "../interfaces/IEvent";

export const analyticsConfig = {
    posthog: {
        single_event_end_point: 'https://app.posthog.com/capture/',
        batch_event_end_point: 'https://app.posthog.com/batch/',
        headers: {
            "Content-Type": "application/json"
        },
        createBatchEventBody: (events: IEvent[]) => ({
            api_key: 'phc_dYe6Tn67vCgCRW24aGhrYMKMlpo4gTacy7WFwd1ozkM',
            historical_migration: false,
            batch: events.map(event => ({
                event: event.type,
                properties: {
                    ...event.payload, // Append the event payload
                    distinct_id: 'user01', // Default property
                },
                timestamp: new Date().toISOString()
            }))
        }),

        createSingleEventBody: (event: IEvent) => ({
            api_key: 'phc_dYe6Tn67vCgCRW24aGhrYMKMlpo4gTacy7WFwd1ozkM',
            event: event.type,
            properties: {
                ...event.payload, // Append the event payload
                distinct_id: 'user01', // Default property
            },
            timestamp: new Date().toISOString()
        }),
    },

    // We can add more plugins based on the need
};
