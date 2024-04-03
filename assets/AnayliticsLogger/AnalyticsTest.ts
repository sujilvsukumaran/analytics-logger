import { Component, _decorator } from "cc";
import { AnalyticsLogger } from "db://assets/AnayliticsLogger/src/core/AnalyticsLogger";
import { Endpoint } from "db://assets/AnayliticsLogger/src/core/Endpoint";
import { EventCache } from "db://assets/AnayliticsLogger/src/core/EventCache";
import { IEvent } from "db://assets/AnayliticsLogger/src/interfaces/IEvent";

const { ccclass } = _decorator;

@ccclass('AnalyticsTest')
export class AnalyticsTest extends Component {
    private logger: AnalyticsLogger;

    start(): void {
        const posthogEndpoint = new Endpoint('posthog');
       // const googleAnalyticsEndpoint = new Endpoint('google_analytics'); // Example for adding another service
        const endpoints = [posthogEndpoint];
        const cache = new EventCache();
        const cacheInterval = 5000;
        const maxCacheSize = 50;

        AnalyticsLogger.initialize(endpoints, cache, cacheInterval, maxCacheSize);
        this.logger = AnalyticsLogger.getInstance();
        this.logger.start();
    }

    onDestroy(): void {
        this.logger.stop();
    }

    public sendGamePlayStartEvent(): void {
        const event: IEvent = {
            type: 'gameplay-start',
            payload: { buttonId: 'play' },
        };
        this.logger.logEvent(event);
    }

    public sendGamePlayEndEvent(): void {
        const event: IEvent = {
            type: 'gameplay-end',
            payload: { buttonId: 'end' },
        };
        this.logger.logEvent(event);
    }
}
