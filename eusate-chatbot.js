var EusateChatbot = (function () {
    'use strict';

    // constants
    const POST_MESSAGE_TYPES = {
        INIT: 'EUSATE_INIT',
        READY: 'EUSATE_READY',
        AUTH_ERROR: 'EUSATE_AUTH_ERROR',
        CLOSE_CHAT: 'CLOSE_CHAT',
        OPEN_CHAT: 'OPEN_CHAT',
        DESTROY: 'EUSATE_DESTROY',
    };

    var _a;
    const TAILWIND_URL = 'https://unpkg.com/@tailwindcss/browser@4';
    const ICOMOON_URL = 'https://cdn.jsdelivr.net/gh/eusate/eusate-chatbot-core@latest/src/assets/icomoon/style.css';
    const CHAT_URL = 'https://eusate-chatbot-core.vercel.app';
    class ChatbotUI {
        constructor(config) {
            _a.container = document.createElement('div');
            _a.fabIframe = document.createElement('iframe');
            _a.chatIframe = document.createElement('iframe');
            _a.fabIcon = document.createElement('span');
            _a.fab = document.createElement('button');
            _a.apiKey = config.apiKey;
            _a.userId = config.userId;
            _a.onReady = config.onReady;
            _a.onInitError = config.onInitError;
            if (!config.apiKey) {
                console.error('No API Key passed');
                return;
            }
            _a.setupContainer();
            _a.setupFabIframe();
            _a.setupChatIframe();
            _a.setupMessageHandlers();
            document.body.appendChild(_a.container);
            _a.loadFabButton();
        }
    }
    _a = ChatbotUI;
    ChatbotUI.chatInitialized = false;
    ChatbotUI.isDestroyed = false;
    ChatbotUI.setupContainer = () => {
        _a.container.id = 'chat-widget-container';
        _a.container.style.position = 'fixed';
        _a.container.style.bottom = '20px';
        _a.container.style.right = '20px';
        _a.container.style.zIndex = '10000';
    };
    ChatbotUI.setupFabIframe = () => {
        _a.fabIframe.id = 'chat-widget-fab';
        _a.fabIframe.style.position = 'relative';
        _a.fabIframe.style.zIndex = '1';
        _a.fabIframe.style.height = '80px';
        _a.fabIframe.style.width = '80px';
        _a.fabIframe.style.border = 'none';
        _a.fabIframe.style.background = 'transparent';
        _a.fabIframe.style.borderRadius = '100%';
        _a.fabIframe.style.boxShadow = '0px 40px 72px -12px #10192824';
        _a.container.appendChild(_a.fabIframe);
    };
    ChatbotUI.setupChatIframe = () => {
        _a.chatIframe.id = 'chat-widget';
        _a.chatIframe.src = CHAT_URL;
        _a.chatIframe.style.position = 'absolute';
        _a.chatIframe.style.bottom = '100px';
        _a.chatIframe.style.right = '0px';
        _a.chatIframe.style.width = '390px';
        _a.chatIframe.style.height = '576px';
        _a.chatIframe.style.transform = 'scale(0)';
        _a.chatIframe.style.opacity = '0';
        _a.chatIframe.style.transitionProperty =
            'transform, translate, scale, rotate, opacity';
        _a.chatIframe.style.transitionTimingFunction =
            'cubic-bezier(0.4, 0, 0.2, 1)';
        _a.chatIframe.style.transitionDuration = '500ms';
        _a.chatIframe.style.border = 'none';
        _a.chatIframe.style.transformOrigin = 'bottom right';
        _a.chatIframe.style.boxShadow = '0px 40px 72px -12px #10192824';
        _a.container.appendChild(_a.chatIframe);
        _a.chatIframe.onload = () => {
            setTimeout(() => {
                var _b;
                const message = {
                    type: POST_MESSAGE_TYPES.INIT,
                    data: {
                        apiKey: _a.apiKey,
                        userId: _a.userId,
                    },
                    timestamp: Date.now(),
                };
                (_b = _a.chatIframe.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(message, CHAT_URL);
            }, 1000); // this is to allow the react app load up
        };
    };
    ChatbotUI.messageHandler = (evt) => {
        if (evt.origin !== CHAT_URL)
            return;
        switch (evt.data.type) {
            case POST_MESSAGE_TYPES.READY:
                _a.chatInitialized = true;
                if (_a.onReady) {
                    _a.onReady();
                }
                break;
            case POST_MESSAGE_TYPES.CLOSE_CHAT:
                _a.closeChatFrame();
                break;
        }
    };
    ChatbotUI.setupMessageHandlers = () => {
        window.addEventListener('message', _a.messageHandler, false);
    };
    ChatbotUI.loadFabButton = () => {
        const doc = _a.fabIframe.contentDocument;
        if (!doc)
            return;
        // head
        let head = doc.documentElement.querySelector('head');
        if (!head) {
            head = doc.createElement('head');
        }
        const icomoonLink = doc.createElement('link');
        icomoonLink.href = ICOMOON_URL;
        icomoonLink.rel = 'stylesheet';
        head.appendChild(icomoonLink);
        const tailwindScript = doc.createElement('script');
        tailwindScript.src = TAILWIND_URL;
        head.appendChild(tailwindScript);
        doc.documentElement.appendChild(head);
        // body
        let body = doc.documentElement.querySelector('body');
        if (!body) {
            body = doc.createElement('body');
        }
        body.className =
            'm-0 flex justify-center items-center w-full h-full outline-none border-none';
        //   button
        _a.fab.id = 'eusate-chatbot-fab-btn';
        _a.fab.className =
            'h-20 w-20 bg-[#0A0A0A] rounded-full cursor-pointer text-white flex items-center justify-center scale-95 hover:scale-100 active:scale-80 transition-transform';
        // button icon
        _a.fabIcon.id = 'button-icon';
        _a.fabIcon.className = 'icon-eusate text-4xl';
        _a.fab.appendChild(_a.fabIcon);
        body.appendChild(_a.fab);
        doc.documentElement.appendChild(body);
        _a.fab.addEventListener('click', _a.toggleChatFrame, false);
    };
    ChatbotUI.closeChatFrame = () => {
        var _b;
        _a.chatIframe.style.transform = 'scale(0)';
        _a.chatIframe.style.opacity = '0';
        //   change the icon to chevron down
        _a.fabIcon.classList.add('icon-eusate');
        _a.fabIcon.classList.remove('icon-chevron-down');
        _a.fab.classList.remove('!scale-80');
        (_b = _a.chatIframe.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage({
            type: POST_MESSAGE_TYPES.CLOSE_CHAT,
            timestamp: Date.now(),
        }, CHAT_URL);
    };
    ChatbotUI.openChatFrame = () => {
        var _b;
        _a.chatIframe.style.transform = 'scale(1)';
        _a.chatIframe.style.opacity = '1';
        _a.fabIcon.classList.add('icon-chevron-down');
        _a.fab.classList.add('!scale-80');
        _a.fabIcon.classList.remove('icon-eusate');
        (_b = _a.chatIframe.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage({
            type: POST_MESSAGE_TYPES.OPEN_CHAT,
            timestamp: Date.now(),
        }, CHAT_URL);
    };
    ChatbotUI.toggleChatFrame = () => {
        // Only allow toggling if chat is initialized
        if (!_a.chatInitialized) {
            console.error('Chat is not initialized yet');
            return;
        }
        if (_a.chatIframe.style.transform === 'scale(1)') {
            _a.closeChatFrame();
        }
        else {
            _a.openChatFrame();
        }
    };
    ChatbotUI.isInitialized = () => _a.chatInitialized;
    ChatbotUI.open = () => _a.openChatFrame();
    ChatbotUI.close = () => _a.closeChatFrame();
    ChatbotUI.destroy = () => {
        if (_a.isDestroyed) {
            console.warn('ChatbotUI instance already destroyed');
            return;
        }
        try {
            // Close chat if open
            if (_a.chatIframe.style.transform === 'scale(1)') {
                _a.closeChatFrame();
            }
            // Remove event listeners
            if (_a.messageHandler) {
                window.removeEventListener('message', _a.messageHandler, false);
            }
            if (_a.fab) {
                _a.fab.removeEventListener('click', _a.toggleChatFrame, false);
            }
            // Send destroy message to iframe
            if (_a.chatIframe.contentWindow) {
                _a.chatIframe.contentWindow.postMessage({
                    type: POST_MESSAGE_TYPES.DESTROY,
                    timestamp: Date.now(),
                }, CHAT_URL);
            }
            // Remove iframes
            if (_a.chatIframe.parentNode) {
                _a.chatIframe.parentNode.removeChild(_a.chatIframe);
            }
            if (_a.fabIframe.parentNode) {
                _a.fabIframe.parentNode.removeChild(_a.fabIframe);
            }
            // Remove container from DOM
            if (_a.container.parentNode) {
                _a.container.parentNode.removeChild(_a.container);
            }
            // Clear references
            _a.chatInitialized = false;
            _a.isDestroyed = true;
            console.log('ChatbotUI instance destroyed successfully');
        }
        catch (err) {
            console.error('Error destroying ChatbotUI:', err);
        }
    };

    return ChatbotUI;

})();
