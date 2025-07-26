export declare const POST_MESSAGE_TYPES: {
    readonly INIT: "EUSATE_INIT";
    readonly READY: "EUSATE_READY";
    readonly AUTH_ERROR: "EUSATE_AUTH_ERROR";
    readonly CLOSE_CHAT: "CLOSE_CHAT";
    readonly OPEN_CHAT: "OPEN_CHAT";
    readonly DESTROY: "EUSATE_DESTROY";
};
export type ValueOf<K> = K[keyof K];
export type MessageObjectType<T = unknown> = {
    type: ValueOf<typeof POST_MESSAGE_TYPES>;
    data?: T;
    timestamp: number;
};
