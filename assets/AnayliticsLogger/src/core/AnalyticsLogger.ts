import { IEvent } from "../interfaces/IEvent";
import { Endpoint } from "./Endpoint";
import { EventCache } from "./EventCache";

export class AnalyticsLogger {
    private static instance: AnalyticsLogger;
    private endpoints: Endpoint[];
    private eventCache: EventCache;
    private cacheInterval: number;
    private maxCacheSize: number;
    private intervalId: any;

    private constructor(endpoints: Endpoint[], eventCache: EventCache, cacheInterval: number, maxCacheSize: number) {
        this.endpoints = endpoints;
        this.eventCache = eventCache;
        this.cacheInterval = cacheInterval;
        this.maxCacheSize = maxCacheSize;
    }

    public static initialize(endpoints: Endpoint[], eventCache: EventCache, cacheInterval: number, maxCacheSize: number): void {
        if (!AnalyticsLogger.instance) {
            AnalyticsLogger.instance = new AnalyticsLogger(endpoints, eventCache, cacheInterval, maxCacheSize);
        }
    }

    public static getInstance(): AnalyticsLogger {
        if (!AnalyticsLogger.instance) {
            throw new Error('AnalyticsLogger not initialized. Call initialize() first.');
        }
        return AnalyticsLogger.instance;
    }

    public start(): void {
        this.intervalId = setInterval(() => this.sendCachedEvents(), this.cacheInterval);
    }

    public stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    public logEvent(event: IEvent): void {
        this.eventCache.addEvent(event);
        if (this.eventCache.getEvents().length >= this.maxCacheSize) {
            this.sendCachedEvents();
        }
    }

    private sendCachedEvents(): void {
        const events = this.eventCache.getEvents();
        this.eventCache.clear();
        if (events.length > 0) {
            this.endpoints.forEach(async endpoint => {
                try {
                    await endpoint.sendEvent(events);
                } catch (error) {
                    console.error('Failed to send batch of events:', error);
                }
            });
        }
    }
}
