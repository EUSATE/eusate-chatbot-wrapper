export declare const PROD_CONFIG: {
    readonly TAILWIND_URL: "https://unpkg.com/@tailwindcss/browser@4";
    readonly ICOMOON_URL: "https://cdn.jsdelivr.net/gh/eusate/eusate-chatbot-core@latest/src/assets/icomoon/style.css";
    readonly CHAT_URL: "https://eusate-chatbot-core.vercel.app";
};
export declare const POST_MESSAGE_TYPES: {
    readonly INIT: "EUSATE_INIT";
    readonly READY: "EUSATE_READY";
    readonly AUTH_ERROR: "EUSATE_AUTH_ERROR";
    readonly CLOSE_CHAT: "CLOSE_CHAT";
    readonly OPEN_CHAT: "OPEN_CHAT";
    readonly DESTROY: "EUSATE_DESTROY";
};
export declare const ERROR_MESSAGES: {
    readonly NO_API_KEY: "[EUSATE SDK] API Key is required for initialization";
    readonly ERROR: "[EUSATE SDK] Error:";
    readonly INIT_TIMEOUT: "[EUSATE SDK] Initialization timeout";
    readonly IFRAME_LOAD: "[EUSATE SDK] Failed to load chat iframe";
    readonly NOT_INIT_YET: "[EUSATE SDK] Not initialized yet. Call init() first.";
    readonly DESTROYED_ALREADY: "[EUSATE SDK] Already destroyed";
    readonly ALREADY_INIT: "[Eusate SDK] Already initialized. Call destroy() first to reinitialize.";
};
