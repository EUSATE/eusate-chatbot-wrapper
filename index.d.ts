declare class ChatbotUI {
    private static container;
    private static fabIframe;
    private static chatIframe;
    private static fabIcon;
    private static fab;
    private static apiKey;
    private static onReady?;
    private static onInitError?;
    private static chatInitialized;
    private static isDestroyed;
    constructor(config: {
        apiKey: string;
        onReady: () => void;
        onInitError: () => void;
    });
    private static setupContainer;
    private static setupFabIframe;
    private static setupChatIframe;
    private static messageHandler;
    private static setupMessageHandlers;
    private static loadFabButton;
    private static closeChatFrame;
    private static openChatFrame;
    private static toggleChatFrame;
    static isInitialized: () => boolean;
    static open: () => void;
    static close: () => void;
    static destroy: () => void;
}
export default ChatbotUI;
