import { POST_MESSAGE_TYPES } from './constants';
export type ValueOf<K> = K[keyof K];
export declare enum ErrorType {
    INIT = "init",
    AUTH = "auth"
}
export type MessengerConfig = {
    apiKey: string;
    onReady?: () => void;
    onError?: (error: Error) => void;
};
export type MessageObjectType<T = unknown> = {
    type: ValueOf<typeof POST_MESSAGE_TYPES>;
    data?: T;
    timestamp: number;
};
export interface EusateMessengerSDK {
    init: (config: string | MessengerConfig) => void;
    open: () => void;
    close: () => void;
    destroy: () => void;
    isInitialized: () => boolean;
    isOpen: () => boolean;
}
