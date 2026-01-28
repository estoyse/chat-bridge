# Chat Bridge

A modern web application that provides a chat interface with AI integration and voice input capabilities. Built with Next.js and Google's Gemini AI.

## 📋 Project Overview

This project was developed as a job application submission with the following core requirements:

### Required Features ✅

1. **Text Input Field** - A user-friendly text input interface for sending messages
2. **AI Integration** - Connection to Google Gemini API for intelligent responses
3. **Voice Input (Advanced)** - Microphone button for voice recording with speech-to-text conversion

### Additional Features ⭐

- **Modern UI/UX** - Minimalist, responsive design with dark mode support
- **Real-time Feedback** - Loading indicators during API requests
- **Error Handling** - Comprehensive error handling at all levels
- **Auto-scroll** - Automatic scrolling to latest messages
- **Expandable Input** - Dynamic textarea that expands based on content
- **Toast Notifications** - User-friendly error and status messages
- **Syntax Highlighting** - Code block highlighting in AI responses
- **Markdown Support** - Full markdown rendering for rich text responses

## 🛠️ Technology Stack

### Frontend

- **Next.js 16.1.5** - React framework with App Router for modern web applications
- **React 19.2.3** - Latest React with improved performance and features
- **TypeScript 5** - Type safety and better developer experience
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - High-quality, accessible UI components built on Radix UI

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **Google Gemini AI** (`@google/genai`) - Advanced AI model for generating responses
  - Using `gemini-2.5-flash-lite` model for fast, efficient responses

### Key Libraries & Their Purpose

#### State Management & Data Fetching

- **@tanstack/react-query (v5.90.20)** - Powerful async state management
  - Handles caching, background updates, and error states
  - Provides `useMutation` for optimistic updates and retry logic

#### Content Rendering

- **react-markdown** - Renders AI responses with markdown formatting
- **remark-gfm** - GitHub Flavored Markdown support (tables, task lists, etc.)
- **rehype-highlight** - Syntax highlighting for code blocks
- **rehype-sanitize** - XSS protection for rendered markdown
- **highlight.js** - Code syntax highlighting engine

#### User Feedback

- **sonner** - Beautiful toast notifications for errors and status updates

## 🏗️ Project Structure

```
chat-bridge/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # API endpoint for AI chat
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Main chat page
│   └── globals.css               # Global styles
├── components/
│   ├── chat-form.tsx             # Chat input form with voice support
│   ├── chat-messages.tsx         # Message display component
│   └── ui/                       # Reusable UI components
├── hooks/
│   ├── useChatMutation.ts        # React Query mutation for chat
│   └── useSpeechRecognition.tsx  # Web Speech API integration
├── services/
│   └── chat.service.ts           # API client for chat endpoint
├── providers/
│   └── query-provider.tsx        # React Query provider setup
└── types/
    └── speech-recognition.d.ts   # TypeScript definitions for Web Speech API
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm
- Google Gemini API key

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd chat-bridge
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

To get a Gemini API key:

- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create a new API key
- Copy and paste it into your `.env.local` file

4. **Run the development server**

```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Features Implementation

### 1. Text Input & AI Chat

- Clean, minimalist interface with a centered chat form
- Messages are sent to the backend API route (`/api/chat`)
- Backend forwards requests to Google Gemini AI
- Responses are displayed with markdown formatting and syntax highlighting
- Loading state shows while waiting for AI response

### 2. Voice Input (Advanced Feature)

- **Web Speech API Integration** - Uses browser's native speech recognition
- **Visual Feedback** - Microphone button changes state when recording
- **Error Handling** - Comprehensive error messages for:
  - Browser compatibility issues
  - Microphone permission denials
  - No speech detected
  - Network errors
- **Browser Support Detection** - Automatically disables if not supported
- **Supported Browsers**: Chrome, Edge, Safari (with webkit prefix)

### 3. Error Handling

- **API Level**: Try-catch blocks with meaningful error responses
- **Frontend Level**: React Query error states with user-friendly messages
- **Voice Input**: Detailed error types with specific user guidance
- **Network Issues**: Automatic retry logic via React Query
- **Validation**: Input validation on both client and server

### 4. Loading States

- **Pending State**: Visual indicator during API requests
- **Optimistic Updates**: Messages appear immediately in the UI
- **Disabled Inputs**: Form inputs disabled during submission
- **Toast Notifications**: Status updates for voice recognition

## 🎨 UI/UX Features

### Responsive Design

- Mobile-first approach
- Adaptive layout for different screen sizes
- Touch-friendly controls

### Accessibility

- Keyboard navigation support (Enter to send, Shift+Enter for new line)
- ARIA labels for screen readers
- Focus management
- High contrast support

### User Experience

- Auto-expanding textarea
- Smooth animations and transitions
- Dark mode support
- Visual feedback for all interactions
- Auto-scroll to latest messages

## 🔒 Security

- **API Key Protection**: Environment variables for sensitive data
- **Input Validation**: Server-side validation of all inputs
- **XSS Protection**: Sanitized markdown rendering
- **CORS**: Proper API route configuration
- **Error Messages**: Generic error messages to prevent information leakage

## 📊 Requirements Fulfillment

### ✅ Core Requirements

| Requirement             | Status      | Implementation                              |
| ----------------------- | ----------- | ------------------------------------------- |
| Text input field        | ✅ Complete | Dynamic textarea with auto-expand           |
| ChatGPT API integration | ✅ Complete | Using Google Gemini AI (free tier)          |
| Display AI responses    | ✅ Complete | Markdown rendering with syntax highlighting |
| Voice recording button  | ✅ Complete | Microphone icon with visual states          |
| Speech-to-text          | ✅ Complete | Web Speech API integration                  |
| Text insertion to input | ✅ Complete | Automatic transcript insertion              |

### ✅ Additional Requirements

| Requirement          | Status      | Implementation                                     |
| -------------------- | ----------- | -------------------------------------------------- |
| Error handling       | ✅ Complete | Multi-level error handling with user feedback      |
| Loading indicator    | ✅ Complete | Visual pending states and disabled inputs          |
| Clean code structure | ✅ Complete | Separation of concerns, TypeScript, modular design |
| Intuitive interface  | ✅ Complete | Minimalist design with clear visual hierarchy      |

### ⭐ Bonus Features

- Dark mode support
- Markdown and code highlighting
- Toast notifications
- Auto-scroll functionality
- Expandable input field
- Browser compatibility detection
- Comprehensive TypeScript types

## 🧪 Testing

### Manual Testing Checklist

- [ ] Send text message and receive AI response
- [ ] Click microphone button and speak
- [ ] Verify speech is converted to text
- [ ] Test error handling (deny microphone permission)
- [ ] Test on different browsers
- [ ] Test dark/light mode switching
- [ ] Test keyboard shortcuts (Enter, Shift+Enter)
- [ ] Test mobile responsiveness

## 🌐 Browser Compatibility

### Fully Supported

- Chrome 80+
- Edge 80+
- Safari 14.1+

### Limited Support (No Voice Input)

- Firefox (Web Speech API not supported)
- Opera
- Other Chromium-based browsers

## 📝 API Documentation

### POST /api/chat

**Request Body:**

```json
{
  "message": "Your message here"
}
```

**Success Response (200):**

```json
{
  "message": "AI response here"
}
```

**Error Response (400):**

```json
{
  "error": "Message is required"
}
```

**Error Response (500):**

```json
{
  "error": "Something went wrong"
}
```

## 🔧 Configuration

### Gemini AI Model

The application uses `gemini-2.5-flash-lite` model, which provides:

- Fast response times
- Cost-effective usage
- Good quality responses
- Free tier availability

To change the model, edit `/app/api/chat/route.ts`:

```typescript
model: "gemini-2.5-flash-lite"; // Change to your preferred model
```

### Speech Recognition Language

Default language is English (US). To change, edit `/hooks/useSpeechRecognition.tsx`:

```typescript
recognition.lang = "en-US"; // Change to your preferred language code
```

## 📄 License

This project is created for job application purposes.

## 👨‍💻 Author

Created as a technical assessment submission demonstrating:

- Modern React/Next.js development
- API integration
- Advanced browser APIs (Web Speech)
- TypeScript proficiency
- UI/UX design skills
- Error handling best practices

---

**Note**: This project uses Google Gemini AI instead of OpenAI's ChatGPT API to take advantage of the free tier while maintaining high-quality AI responses. The implementation can be easily adapted to use OpenAI or any other AI provider.
