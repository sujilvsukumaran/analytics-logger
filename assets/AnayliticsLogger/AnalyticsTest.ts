import { Component, EditBox, _decorator } from "cc";
import { AnalyticsLogger } from "./src/core/AnalyticsLogger";
import { EventCache } from "./src/core/EventCache";
import { IEvent } from "./src/interfaces/IEvent";
import { PosthogEndPoint } from "./src/concrete/PosthogEndPoint";

const { ccclass, property } = _decorator;

@ccclass('AnalyticsTest')
export class AnalyticsTest extends Component {

    @property(EditBox)
    distinctIdInput: EditBox | null = null;

    private logger: AnalyticsLogger;

    start(): void {
        const posthogEndpoint = new PosthogEndPoint();
       // const googleAnalyticsEndpoint = new Endpoint('google_analytics'); // Example for adding another service
        const endpoints = [posthogEndpoint];
        const cache = new EventCache();
        const cacheInterval = 10000;
        const maxCacheSize = 50;

        AnalyticsLogger.initialize(endpoints, cache, cacheInterval, maxCacheSize);
        this.logger = AnalyticsLogger.getInstance();
        this.logger.start();
    }

    onDestroy(): void {
        this.logger.stop();
    }

    public sendGamePlayStartBatchEvent(): void {
        const event: IEvent = {
            type: 'gameplay-start-batch-event',
            payload: { buttonId: 'play' },
        };
        this.logger.logBatchEvent(event);
    }

    public sendGamePlayScoreBatchEvent(): void {
        const event: IEvent = {
            type: 'gameplay-score-batch-event',
            payload: { buttonId: 'score' },
        };
        this.logger.logBatchEvent(event);
    }

    public sendGamePlayEndBatchEvent(): void {
        const event: IEvent = {
            type: 'gameplay-end-batch-event',
            payload: { buttonId: 'end' },
        };
        this.logger.logBatchEvent(event);
    }


    public sendGamePlayStartSingleEvent(): void {
        const event: IEvent = {
            type: 'gameplay-start-single-event',
            payload: { buttonId: 'start' },
        };
        this.logger.logEvent(event);
    }

    public sendGamePlayScoreSingleEvent(): void {
        const event: IEvent = {
            type: 'gameplay-score-single-event',
            payload: { buttonId: 'score' },
        };
        this.logger.logEvent(event);
    }

    public sendGamePlayEndSingleEvent(): void {
        const event: IEvent = {
            type: 'gameplay-end-single-event',
            payload: { buttonId: 'end' },
        };
        this.logger.logEvent(event);
    }

    public changeDistinctId () : void {
        if (this.distinctIdInput && this.distinctIdInput.string) {
            this.logger.setDistinctId(this.distinctIdInput.string);
            console.log('distinctId updated ' + this.distinctIdInput.string);
        }
    }

    public logout () : void {
        AnalyticsLogger.resetInstance()
    }
}
