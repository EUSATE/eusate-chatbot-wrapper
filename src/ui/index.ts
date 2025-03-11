const CHAT_URL = 'https://eusate-chatbot-core.vercel.app/'
// const CHAT_URL = 'http://localhost:3000'

class ChatbotUI {
  private readonly container: HTMLDivElement
  private readonly fabIframe: HTMLIFrameElement
  private readonly chatIframe: HTMLIFrameElement
  private readonly fabIcon: HTMLSpanElement
  private readonly fab: HTMLButtonElement

  constructor() {
    this.container = document.createElement('div')
    this.fabIframe = document.createElement('iframe')
    this.chatIframe = document.createElement('iframe')
    this.fabIcon = document.createElement('span')
    this.fab = document.createElement('button')

    this.setupContainer()
    this.setupFabIframe()
    this.setupChatIframe()

    document.body.appendChild(this.container)

    this.loadFabButton()

    window.addEventListener(
      'message',
      (evt) => {
        console.log(evt.origin)
        if (evt.origin !== CHAT_URL) return
        if (evt.data.action !== 'closeChat') return
        this.closeChatFrame()
      },
      false,
    )
  }

  private setupContainer = () => {
    this.container.id = 'chat-widget-container'
    this.container.style.position = 'fixed'
    this.container.style.bottom = '20px'
    this.container.style.right = '20px'
    this.container.style.zIndex = '10000'
  }

  private setupFabIframe = () => {
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

  private setupChatIframe = () => {
    this.chatIframe.id = 'chat-widget'
    this.chatIframe.src = CHAT_URL
    this.chatIframe.style.position = 'absolute'
    this.chatIframe.style.bottom = '100px'
    this.chatIframe.style.right = '0px'
    this.chatIframe.style.width = '525px'
    this.chatIframe.style.height = '780px'
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
  }

  private loadFabButton = () => {
    const doc = this.fabIframe.contentDocument

    if (!doc) return

    // head
    let head = doc.documentElement.querySelector('head')
    if (!head) {
      head = doc.createElement('head')
    }

    const icomoonLink = doc.createElement('link')
    icomoonLink.href =
      'https://cdn.jsdelivr.net/gh/eusate/eusate-chatbot-core@9e5ebf8/src/assets/icomoon/style.css'
    icomoonLink.rel = 'stylesheet'
    head.appendChild(icomoonLink)

    const tailwindScript = doc.createElement('script')
    tailwindScript.src = 'https://unpkg.com/@tailwindcss/browser@4'
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

  private closeChatFrame = () => {
    this.chatIframe.style.transform = 'scale(0)'
    this.chatIframe.style.opacity = '0'

    //   change the icon to chevron down
    this.fabIcon.classList.add('icon-eusate')
    this.fabIcon.classList.remove('icon-chevron-down')
    this.fab.classList.remove('!scale-80')

    this.chatIframe.contentWindow?.postMessage({ isChatOpen: false }, '*')
  }

  private toggleChatFrame = () => {
    if (this.chatIframe.style.transform === 'scale(1)') {
      this.closeChatFrame()
    } else {
      this.chatIframe.style.transform = 'scale(1)'
      this.chatIframe.style.opacity = '1'

      this.fabIcon.classList.add('icon-chevron-down')
      this.fab.classList.add('!scale-80')
      this.fabIcon.classList.remove('icon-eusate')

      this.chatIframe.contentWindow?.postMessage({ isChatOpen: true }, '*')
    }
  }
}

export default ChatbotUI
