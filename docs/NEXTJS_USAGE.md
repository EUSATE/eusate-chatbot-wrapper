# Using Eusate SDK in Next.js

## Installation

```bash
npm install @eusate/messenger-sdk
```

## Quick Start (App Router)

### Option 1: Client Component (Recommended)

```tsx
'use client'

import { useEffect } from 'react'
import Eusate from '@eusate/messenger-sdk'

export default function MyPage() {
  useEffect(() => {
    Eusate.init({
      apiKey: process.env.NEXT_PUBLIC_EUSATE_API_KEY!,
    })

    return () => {
      Eusate.destroy()
    }
  }, [])

  return <div>Your content</div>
}
```

### Option 2: With Dynamic Import (For Code Splitting)

```tsx
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
})

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
```

**components/ChatWidget.tsx:**

```tsx
'use client'

import { useEffect } from 'react'
import Eusate from '@eusate/messenger-sdk'

export default function ChatWidget() {
  useEffect(() => {
    Eusate.init({
      apiKey: process.env.NEXT_PUBLIC_EUSATE_API_KEY!,
      onReady: () => console.log('Chat ready!'),
      onError: (error) => console.error('Chat error:', error),
    })

    return () => Eusate.destroy()
  }, [])

  return null
}
```

## API Reference

### Eusate.init(config)

Initialize the chat widget.

```typescript
Eusate.init({
  apiKey: string,              // Required
  onReady?: () => void,        // Optional callback
  onError?: (error: Error) => void  // Optional error handler
})
```

### Eusate.open()

Open the chat window.

### Eusate.close()

Close the chat window.

### Eusate.destroy()

Remove the chat widget completely.

### Eusate.isInitialized()

Check if SDK is initialized.

### Eusate.isOpen()

Check if chat is currently open.

### Eusate.version

Get SDK version string.

## Environment Variables

```env
NEXT_PUBLIC_EUSATE_API_KEY=your-api-key-here
```

**Note:** The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js.

## SSR Compatibility

The SDK is fully SSR-safe and will automatically:

- Skip initialization on server-side
- Initialize only when running in the browser
- Handle all edge cases gracefully

No special configuration needed!
