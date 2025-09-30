export const PROD_CONFIG = {
  TAILWIND_URL: 'https://unpkg.com/@tailwindcss/browser@4',
  ICOMOON_URL:
    'https://cdn.jsdelivr.net/gh/eusate/eusate-chatbot-core@latest/src/assets/icomoon/style.css',
  CHAT_URL: 'https://eusate-chatbot-core.vercel.app',
  // CHAT_URL : 'http://localhost:3000'
} as const

export const POST_MESSAGE_TYPES = {
  INIT: 'EUSATE_INIT',
  READY: 'EUSATE_READY',
  AUTH_ERROR: 'EUSATE_AUTH_ERROR',
  CLOSE_CHAT: 'CLOSE_CHAT',
  OPEN_CHAT: 'OPEN_CHAT',
  DESTROY: 'EUSATE_DESTROY',
} as const

export const ERROR_MESSAGES = {
  NO_API_KEY: '[EUSATE SDK] API Key is required for initialization',
  ERROR: '[EUSATE SDK] Error:',
  INIT_TIMEOUT: '[EUSATE SDK] Initialization timeout',
  IFRAME_LOAD: '[EUSATE SDK] Failed to load chat iframe',
  NOT_INIT_YET: '[EUSATE SDK] Not initialized yet. Call init() first.',
  DESTROYED_ALREADY: '[EUSATE SDK] Already destroyed',
  ALREADY_INIT:
    '[Eusate SDK] Already initialized. Call destroy() first to reinitialize.',
} as const
