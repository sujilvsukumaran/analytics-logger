import { IEvent } from './IEvent';

export interface IEndpoint {
    sendEvent(event: IEvent): Promise<void>;
}
