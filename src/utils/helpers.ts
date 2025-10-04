import { PROD_CONFIG } from './constants'

export const debug = (...args: unknown[]) => {
  if (PROD_CONFIG.DEBUG) {
    console.log('[Eusate SDK Debug]', ...args)
  }
}

export const getSDKInfo = () => ({
  version: PROD_CONFIG.VERSION,
  environment: PROD_CONFIG.ENV,
  chatUrl: PROD_CONFIG.CHAT_URL,
})
