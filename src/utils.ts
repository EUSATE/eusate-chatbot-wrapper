// constants
export const POST_MESSAGE_TYPES = {
  INIT: 'EUSATE_INIT',
  READY: 'EUSATE_READY',
  AUTH_ERROR: 'EUSATE_AUTH_ERROR',
  CLOSE_CHAT: 'CLOSE_CHAT',
  OPEN_CHAT: 'OPEN_CHAT',
  DESTROY: 'EUSATE_DESTROY',
} as const

// types
export type ValueOf<K> = K[keyof K]

export type MessageObjectType<T = unknown> = {
  type: ValueOf<typeof POST_MESSAGE_TYPES>
  data?: T
  timestamp: number
}
