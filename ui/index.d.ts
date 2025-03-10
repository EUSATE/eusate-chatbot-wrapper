declare class ChatbotUI {
    private readonly container;
    private readonly fabIframe;
    private readonly chatIframe;
    private readonly fabIcon;
    private readonly fab;
    constructor();
    private setupContainer;
    private setupFabIframe;
    private setupChatIframe;
    private loadFabButton;
    private closeChatFrame;
    private toggleChatFrame;
}
export default ChatbotUI;
