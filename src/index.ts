import { MessageObjectType, POST_MESSAGE_TYPES } from './utils'

const TAILWIND_URL = 'https://unpkg.com/@tailwindcss/browser@4'
const ICOMOON_URL =
  'https://cdn.jsdelivr.net/gh/eusate/eusate-chatbot-core@latest/src/assets/icomoon/style.css'
// const CHAT_URL = 'https://eusate-chatbot-core.vercel.app'
const CHAT_URL = 'http://localhost:3000'
class ChatbotUI {
  private static container: HTMLDivElement
  private static fabIframe: HTMLIFrameElement
  private static chatIframe: HTMLIFrameElement
  private static fabIcon: HTMLSpanElement
  private static fab: HTMLButtonElement
  private static apiKey: string
  private static onReady?: () => void
  private static onInitError?: () => void
  private static chatInitialized: boolean = false
  private static isDestroyed: boolean = false

  constructor(config: {
    apiKey: string
    onReady: () => void
    onInitError: () => void
  }) {
    ChatbotUI.container = document.createElement('div')
    ChatbotUI.fabIframe = document.createElement('iframe')
    ChatbotUI.chatIframe = document.createElement('iframe')
    ChatbotUI.fabIcon = document.createElement('span')
    ChatbotUI.fab = document.createElement('button')
    ChatbotUI.apiKey = config.apiKey
    ChatbotUI.onReady = config.onReady
    ChatbotUI.onInitError = config.onInitError

    if (!config.apiKey) {
      console.error('No API Key passed')
      return
    }

    ChatbotUI.setupContainer()
    ChatbotUI.setupFabIframe()
    ChatbotUI.setupChatIframe()
    ChatbotUI.setupMessageHandlers()

    document.body.appendChild(ChatbotUI.container)

    ChatbotUI.loadFabButton()
  }

  private static setupContainer = () => {
    this.container.id = 'chat-widget-container'
    this.container.style.position = 'fixed'
    this.container.style.bottom = '20px'
    this.container.style.right = '20px'
    this.container.style.zIndex = '10000'
  }

  private static setupFabIframe = () => {
    this.fabIframe.id = 'chat-widget-fab'
    this.fabIframe.style.position = 'relative'
    this.fabIframe.style.zIndex = '1'
    this.fabIframe.style.height = '80px'
    this.fabIframe.style.width = '80px'
    this.fabIframe.style.border = 'none'
    this.fabIframe.style.background = 'transparent'
    this.fabIframe.style.borderRadius = '100%'
    this.fabIframe.style.boxShadow = '0px 40px 72px -12px #10192824'

    this.container.appendChild(this.fabIframe)
  }

  private static setupChatIframe = () => {
    this.chatIframe.id = 'chat-widget'
    this.chatIframe.src = CHAT_URL
    this.chatIframe.style.position = 'absolute'
    this.chatIframe.style.bottom = '100px'
    this.chatIframe.style.right = '0px'
    this.chatIframe.style.width = '390px'
    this.chatIframe.style.height = '576px'
    this.chatIframe.style.transform = 'scale(0)'
    this.chatIframe.style.opacity = '0'
    this.chatIframe.style.transitionProperty =
      'transform, translate, scale, rotate, opacity'
    this.chatIframe.style.transitionTimingFunction =
      'cubic-bezier(0.4, 0, 0.2, 1)'
    this.chatIframe.style.transitionDuration = '500ms'
    this.chatIframe.style.border = 'none'
    this.chatIframe.style.transformOrigin = 'bottom right'
    this.chatIframe.style.boxShadow = '0px 40px 72px -12px #10192824'

    this.container.appendChild(this.chatIframe)

    this.chatIframe.onload = () => {
      setTimeout(() => {
        const message: MessageObjectType = {
          type: POST_MESSAGE_TYPES.INIT,
          data: {
            apiKey: this.apiKey,
          },
          timestamp: Date.now(),
        }

        this.chatIframe.contentWindow?.postMessage(message, CHAT_URL)
      }, 1000) // this is to allow the react app load up
    }
  }

  private static messageHandler = (evt: MessageEvent) => {
    if (evt.origin !== CHAT_URL) return

    switch (evt.data.type) {
      case POST_MESSAGE_TYPES.READY:
        this.chatInitialized = true
        if (this.onReady) {
          this.onReady()
        }
        break
      case POST_MESSAGE_TYPES.CLOSE_CHAT:
        this.closeChatFrame()
        break
    }
  }

  private static setupMessageHandlers = () => {
    window.addEventListener('message', this.messageHandler, false)
  }

  private static loadFabButton = () => {
    const doc = this.fabIframe.contentDocument

    if (!doc) return

    // head
    let head = doc.documentElement.querySelector('head')
    if (!head) {
      head = doc.createElement('head')
    }

    const icomoonLink = doc.createElement('link')
    icomoonLink.href = ICOMOON_URL
    icomoonLink.rel = 'stylesheet'
    head.appendChild(icomoonLink)

    const tailwindScript = doc.createElement('script')
    tailwindScript.src = TAILWIND_URL
    head.appendChild(tailwindScript)

    doc.documentElement.appendChild(head)

    // body
    let body = doc.documentElement.querySelector('body')
    if (!body) {
      body = doc.createElement('body')
    }
    body.className =
      'm-0 flex justify-center items-center w-full h-full outline-none border-none'

    //   button
    this.fab.id = 'eusate-chatbot-fab-btn'
    this.fab.className =
      'h-20 w-20 bg-[#0A0A0A] rounded-full cursor-pointer text-white flex items-center justify-center scale-95 hover:scale-100 active:scale-80 transition-transform'

    // button icon
    this.fabIcon.id = 'button-icon'
    this.fabIcon.className = 'icon-eusate text-4xl'

    this.fab.appendChild(this.fabIcon)
    body.appendChild(this.fab)
    doc.documentElement.appendChild(body)

    this.fab.addEventListener('click', this.toggleChatFrame, false)
  }

  private static closeChatFrame = () => {
    this.chatIframe.style.transform = 'scale(0)'
    this.chatIframe.style.opacity = '0'

    //   change the icon to chevron down
    this.fabIcon.classList.add('icon-eusate')
    this.fabIcon.classList.remove('icon-chevron-down')
    this.fab.classList.remove('!scale-80')

    this.chatIframe.contentWindow?.postMessage(
      {
        type: POST_MESSAGE_TYPES.CLOSE_CHAT,
        timestamp: Date.now(),
      } as MessageObjectType,
      CHAT_URL,
    )
  }

  private static openChatFrame = () => {
    this.chatIframe.style.transform = 'scale(1)'
    this.chatIframe.style.opacity = '1'

    this.fabIcon.classList.add('icon-chevron-down')
    this.fab.classList.add('!scale-80')
    this.fabIcon.classList.remove('icon-eusate')

    this.chatIframe.contentWindow?.postMessage(
      {
        type: POST_MESSAGE_TYPES.OPEN_CHAT,
        timestamp: Date.now(),
      } as MessageObjectType,
      CHAT_URL,
    )
  }

  private static toggleChatFrame = () => {
    // Only allow toggling if chat is initialized
    if (!this.chatInitialized) {
      console.error('Chat is not initialized yet')
      return
    }

    if (this.chatIframe.style.transform === 'scale(1)') {
      this.closeChatFrame()
    } else {
      this.openChatFrame()
    }
  }

  static isInitialized = () => this.chatInitialized

  static open = () => this.openChatFrame()

  static close = () => this.closeChatFrame()

  static destroy = () => {
    if (this.isDestroyed) {
      console.warn('ChatbotUI instance already destroyed')
      return
    }

    try {
      // Close chat if open
      if (this.chatIframe.style.transform === 'scale(1)') {
        this.closeChatFrame()
      }

      // Remove event listeners
      if (this.messageHandler) {
        window.removeEventListener('message', this.messageHandler, false)
      }

      if (this.fab) {
        this.fab.removeEventListener('click', this.toggleChatFrame, false)
      }

      // Send destroy message to iframe
      if (this.chatIframe.contentWindow) {
        this.chatIframe.contentWindow.postMessage(
          {
            type: POST_MESSAGE_TYPES.DESTROY,
            timestamp: Date.now(),
          } as MessageObjectType,
          CHAT_URL,
        )
      }

      // Remove iframes
      if (this.chatIframe.parentNode) {
        this.chatIframe.parentNode.removeChild(this.chatIframe)
      }
      if (this.fabIframe.parentNode) {
        this.fabIframe.parentNode.removeChild(this.fabIframe)
      }

      // Remove container from DOM
      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container)
      }

      // Clear references
      this.chatInitialized = false
      this.isDestroyed = true

      console.log('ChatbotUI instance destroyed successfully')
    } catch (err) {
      console.error('Error destroying ChatbotUI:', err)
    }
  }
}

export default ChatbotUI
