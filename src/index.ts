import EusateMessenger from './MessengerUI'
import { ERROR_MESSAGES, EusateMessengerSDK, MessengerConfig } from './utils'

declare global {
  interface Window {
    Eusate: EusateMessengerSDK
  }
}

const Eusate: EusateMessengerSDK = {
  init: (config: string | MessengerConfig) => {
    try {
      const configuration: MessengerConfig =
        typeof config === 'string' ? { apiKey: config } : config

      EusateMessenger.getInstance(configuration)
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR, error)
      throw error
    }
  },
  open: () => {
    try {
      EusateMessenger.getInstance().open()
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR, error)
    }
  },
  close: () => {
    try {
      EusateMessenger.getInstance().close()
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR, error)
    }
  },
  destroy: () => {
    try {
      EusateMessenger.getInstance().destroy()
    } catch (error) {
      console.error(ERROR_MESSAGES.ERROR, error)
    }
  },
  isInitialized: () => {
    try {
      return EusateMessenger.getInstance().isInitialized()
    } catch {
      return false
    }
  },
  isOpen: () => {
    try {
      return EusateMessenger.getInstance().isOpen()
    } catch {
      return false
    }
  },
}

window.Eusate = Eusate

export default Eusate
