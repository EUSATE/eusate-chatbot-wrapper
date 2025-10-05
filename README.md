# Eusate Messenger SDK

> Embeddable AI-powered customer support chat widget for your website

[![npm version](https://img.shields.io/npm/v/@eusate/messenger-sdk.svg)](https://www.npmjs.com/package/@eusate/messenger-sdk)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)

Eusate Messenger SDK lets you add intelligent customer support to your website in minutes. Built with TypeScript, it works seamlessly across all modern frameworks including Next.js, React, Vue, and vanilla JavaScript.

---

## ✨ Features

- 🚀 **Easy Integration** - Add to any website with one line of code
- 🎯 **Framework Agnostic** - Works with Next.js, React, Vue, Angular, and plain HTML
- 🔒 **Secure** - API key authentication with strict origin validation
- 📱 **Responsive** - Mobile-first design that works everywhere
- ⚡ **SSR Safe** - Full Next.js App Router support out of the box
- 🔧 **TypeScript** - Complete type definitions included
- 🌐 **CDN Ready** - Use via npm or direct script tag
- ♿ **Accessible** - WCAG compliant with keyboard navigation
- 🎨 **Customizable** - Match your brand with custom styling (coming soon)

---

## 📦 Installation

### Via NPM (Recommended)

```bash
npm install @eusate/messenger-sdk
```

### Via Yarn

```bash
yarn add @eusate/messenger-sdk
```

### Via CDN

#### Auto-updating (Recommended)

```html
<!-- Automatically gets bug fixes and new features within v0.x.x -->
<script src="https://cdn.eusate.com/messenger/v0/eusate-sdk.min.js"></script>
```

#### Pinned Version (Maximum Stability)

```html
<!-- Never changes - you control when to update -->
<script src="https://cdn.eusate.com/messenger/v0.1.0/eusate-sdk.min.js"></script>
```

---

## 🚀 Quick Start

### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Website</title>
  </head>
  <body>
    <h1>Welcome to My Website</h1>

    <!-- Load SDK -->
    <script src="https://cdn.eusate.com/messenger/v1/eusate-sdk.min.js"></script>

    <!-- Initialize -->
    <script>
      Eusate.init({
        apiKey: 'your-api-key-here',
      })
    </script>
  </body>
</html>
```

### Next.js (App Router)

**Option 1: Client Component**

```tsx
// app/components/ChatWidget.tsx
'use client'

import { useEffect } from 'react'
import Eusate from '@eusate/messenger-sdk'

export default function ChatWidget() {
  useEffect(() => {
    Eusate.init({
      apiKey: process.env.NEXT_PUBLIC_EUSATE_API_KEY!,
      onReady: () => console.log('Chat is ready!'),
      onError: (error) => console.error('Chat error:', error),
    })

    return () => {
      Eusate.destroy()
    }
  }, [])

  return null
}
```

```tsx
// app/layout.tsx
import ChatWidget from './components/ChatWidget'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
```

**Option 2: Dynamic Import (Code Splitting)**

```tsx
// app/layout.tsx
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('./components/ChatWidget'), {
  ssr: false,
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
```

### React

```tsx
import { useEffect } from 'react'
import Eusate from '@eusate/messenger-sdk'

function App() {
  useEffect(() => {
    Eusate.init({
      apiKey: process.env.REACT_APP_EUSATE_API_KEY!,
    })

    return () => {
      Eusate.destroy()
    }
  }, [])

  return (
    <div className="App">
      <h1>My App</h1>
      {/* Your content */}
    </div>
  )
}

export default App
```

### Vue 3

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <h1>My App</h1>
    <!-- Your content -->
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import Eusate from '@eusate/messenger-sdk'

onMounted(() => {
  Eusate.init({
    apiKey: import.meta.env.VITE_EUSATE_API_KEY,
  })
})

onUnmounted(() => {
  Eusate.destroy()
})
</script>
```

---

## 📖 API Reference

### `Eusate.init(config)`

Initialize the chat widget.

```typescript
Eusate.init({
  apiKey: string,                    // Required: Your Eusate API key
  onReady?: () => void,              // Optional: Called when SDK is ready
  onError?: (error: Error) => void   // Optional: Called on errors
})
```

**Example:**

```javascript
Eusate.init({
  apiKey: 'esk_live_abc123...',
  onReady: () => {
    console.log('Eusate is ready!')
  },
  onError: (error) => {
    console.error('Failed to load chat:', error)
  },
})
```

---

### `Eusate.open()`

Programmatically open the chat window.

```javascript
Eusate.open()
```

**Example Use Case:**

```html
<button onclick="Eusate.open()">Need Help? Chat with us!</button>
```

---

### `Eusate.close()`

Programmatically close the chat window.

```javascript
Eusate.close()
```

---

### `Eusate.destroy()`

Remove the chat widget completely from the page. Useful for cleanup in single-page applications.

```javascript
Eusate.destroy()
```

**Important:** After calling `destroy()`, you need to call `init()` again to re-initialize.

---

### `Eusate.isInitialized()`

Check if the SDK is initialized.

```javascript
if (Eusate.isInitialized()) {
  console.log('SDK is ready to use')
}
```

**Returns:** `boolean`

---

### `Eusate.isOpen()`

Check if the chat window is currently open.

```javascript
if (Eusate.isOpen()) {
  console.log('Chat is open')
} else {
  console.log('Chat is closed')
}
```

**Returns:** `boolean`

---

### `Eusate.version`

Get the current SDK version.

```javascript
console.log('SDK Version:', Eusate.version)
// Output: "0.1.0"
```

**Returns:** `string`

---

## 🔧 Configuration

### Environment Variables

#### Next.js

```env
# .env.local
NEXT_PUBLIC_EUSATE_API_KEY=your-api-key-here
```

**Note:** The `NEXT_PUBLIC_` prefix is required for client-side access.

#### React (Create React App)

```env
# .env
REACT_APP_EUSATE_API_KEY=your-api-key-here
```

#### Vue (Vite)

```env
# .env
VITE_EUSATE_API_KEY=your-api-key-here
```

---

## 🎨 Advanced Usage

### Controlling Chat Visibility

```typescript
// Open chat after 5 seconds
setTimeout(() => {
  Eusate.open()
}, 5000)

// Close chat on route change
router.events.on('routeChangeStart', () => {
  Eusate.close()
})
```

### Custom Trigger Button

```html
<!-- Hide default button and use your own -->
<button id="custom-chat-btn">💬 Chat with Support</button>

<script>
  Eusate.init({ apiKey: 'your-key' })

  document.getElementById('custom-chat-btn').onclick = () => {
    Eusate.open()
  }
</script>
```

### Error Handling

```typescript
Eusate.init({
  apiKey: process.env.NEXT_PUBLIC_EUSATE_API_KEY!,
  onError: (error) => {
    // Log to error tracking service
    console.error('Eusate SDK Error:', error)

    // Show fallback to user
    alert('Chat is temporarily unavailable. Please email support@example.com')
  },
})
```

### Conditional Loading

```typescript
// Only load for logged-in users
if (user.isAuthenticated) {
  Eusate.init({
    apiKey: process.env.NEXT_PUBLIC_EUSATE_API_KEY!,
  })
}
```

---

## 🌍 Framework-Specific Guides

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Eusate from '@eusate/messenger-sdk'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Eusate.init({
      apiKey: process.env.NEXT_PUBLIC_EUSATE_API_KEY!,
    })

    return () => {
      Eusate.destroy()
    }
  }, [])

  return <Component {...pageProps} />
}
```

### Angular

```typescript
// app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core'
import Eusate from '@eusate/messenger-sdk'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  ngOnInit() {
    Eusate.init({
      apiKey: environment.eusateApiKey,
    })
  }

  ngOnDestroy() {
    Eusate.destroy()
  }
}
```

### Svelte

```svelte
<!-- App.svelte -->
<script>
  import { onMount, onDestroy } from 'svelte'
  import Eusate from '@eusate/messenger-sdk'

  onMount(() => {
    Eusate.init({
      apiKey: import.meta.env.VITE_EUSATE_API_KEY
    })
  })

  onDestroy(() => {
    Eusate.destroy()
  })
</script>

<main>
  <h1>My App</h1>
</main>
```

---

## 🔒 Security

### API Key Management

**✅ Do:**

- Store API keys in environment variables
- Use different API keys for development and production
- Rotate API keys periodically

**❌ Don't:**

- Commit API keys to version control
- Expose API keys in client-side code comments
- Share API keys publicly

### Content Security Policy (CSP)

If your site uses CSP, add these directives:

```
Content-Security-Policy:
  frame-src https://chat.eusate.com;
  script-src https://cdn.eusate.com;
  connect-src https://api.eusate.com;
```

---

## 🐛 Troubleshooting

### Chat Widget Not Appearing

**Check:**

1. API key is correct and active
2. No console errors in browser DevTools
3. JavaScript is enabled in browser
4. No ad blockers interfering

```javascript
// Debug initialization
Eusate.init({
  apiKey: 'your-key',
  onReady: () => console.log('✅ SDK Ready'),
  onError: (error) => console.error('❌ SDK Error:', error),
})

// Check status
console.log('Initialized?', Eusate.isInitialized())
console.log('SDK Version:', Eusate.version)
```

### Next.js: "window is not defined"

**Solution:** Make sure you're using `'use client'` directive:

```tsx
'use client' // ← Add this at the top

import Eusate from '@eusate/messenger-sdk'
```

Or use dynamic import with `ssr: false`.

### TypeScript Errors

**Solution:** Install types (they're included automatically):

```bash
npm install @eusate/messenger-sdk
```

If types aren't working, add to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### Chat Appears Multiple Times

**Solution:** Make sure you're not calling `init()` multiple times. Use the singleton pattern:

```typescript
// ✅ Good
useEffect(() => {
  Eusate.init({ apiKey: 'key' })
  return () => Eusate.destroy()
}, []) // Empty dependency array

// ❌ Bad
useEffect(() => {
  Eusate.init({ apiKey: 'key' })
}, [someValue]) // Reinitializes on every change
```

---

<!-- ## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Note:** Internet Explorer is not supported. -->

---

## 📄 License

ISC License - see [LICENSE](LICENSE) file for details.

---

## 📚 Documentation

- [API Reference](docs/API.md)
- [Version Management](docs/VERSIONING.md)
- [Release Process](docs/RELEASING.md)

---

## 💬 Support

- **Documentation:** [https://docs.eusate.com](https://docs.eusate.com)
- **Email:** dev@eusate.com

---

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@eusate/messenger-sdk)
- [GitHub Repository](https://github.com/EUSATE/eusate-messenger-sdk)
- [Changelog](CHANGELOG.md)

---

## ⚡ Quick Reference

| Task       | Command                               |
| ---------- | ------------------------------------- |
| Install    | `npm install @eusate/messenger-sdk`   |
| Initialize | `Eusate.init({ apiKey: 'your-key' })` |
| Open Chat  | `Eusate.open()`                       |
| Close Chat | `Eusate.close()`                      |
| Cleanup    | `Eusate.destroy()`                    |

---

Made with ❤️ by [Eusate](https://eusate.com)
