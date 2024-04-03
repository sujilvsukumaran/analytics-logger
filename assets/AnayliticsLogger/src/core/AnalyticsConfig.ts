import { IEvent } from "../interfaces/IEvent";

export const analyticsConfig = {
    posthog: {
        url: 'https://app.posthog.com/capture/',
        headers: {
            "Content-Type": "application/json"
        },
        createBody: (event: IEvent) => ({
            api_key: 'phc_dYe6Tn67vCgCRW24aGhrYMKMlpo4gTacy7WFwd1ozkM',
            event: event.type,
            properties: {
                ...event.payload, // Append the event payload
                distinct_id: 'user01', // Default property
            },
            timestamp: new Date().toISOString()
        })
    },

    // We can add more plugins based on the need
};
