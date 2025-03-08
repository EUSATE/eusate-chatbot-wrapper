class ChatbotUI {
  private readonly container: HTMLDivElement
  private readonly fabIframe: HTMLIFrameElement
  private readonly chatIframe: HTMLIFrameElement

  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'chat-widget-container'
    this.container.style.position = 'fixed'
    this.container.style.bottom = '20px'
    this.container.style.right = '20px'
    this.container.style.zIndex = '10000'
    // this.container.style.maxWidth = '100%'
    // this.container.style.maxHeight = '100%'

    document.body.appendChild(this.container)

    this.fabIframe = document.createElement('iframe')
    this.fabIframe.id = 'chat-widget-fab'
    this.fabIframe.style.position = 'relative'
    this.fabIframe.style.height = '80px'
    this.fabIframe.style.width = '80px'
    this.fabIframe.style.border = 'none'
    this.fabIframe.style.background = 'transparent'

    this.container.appendChild(this.fabIframe)

    this.chatIframe = document.createElement('iframe')
    this.chatIframe.id = 'chat-widget'
    this.chatIframe.style.position = 'absolute'
    this.chatIframe.style.bottom = '100px'
    this.chatIframe.style.right = '0px'
    this.chatIframe.style.width = '360px'
    this.chatIframe.style.height = '535px'
    this.chatIframe.style.display = 'none'
    // should remove
    this.chatIframe.style.border = 'none'
    this.chatIframe.style.background = '#0A0A0A'

    this.container.appendChild(this.chatIframe)

    this.loadFabButton()
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
    const button = doc.createElement('button')
    button.id = 'eusate-chatbot-fab-btn'
    button.className =
      'h-20 w-20 bg-[#0A0A0A] rounded-full cursor-pointer text-white flex items-center justify-center scale-95 hover:scale-100 active:scale-80 transition-transform'

    // button icon
    const icon = doc.createElement('span')
    icon.id = 'button-icon'
    icon.className =
      'icon-eusate text-4xl shadow-[0px_40px_72px_-12px_#10192824]'

    button.appendChild(icon)
    body.appendChild(button)
    doc.documentElement.appendChild(body)

    button.addEventListener('click', () => {
      console.log('open chat view')
      //   change the icon to chevron down
      icon.classList.add('icon-chevron-down')
      icon.classList.remove('icon-eusate')
      //   change the visibility of the chat screen to visible
      this.chatIframe.style.display = 'block'
    })
  }
}

export default ChatbotUI
