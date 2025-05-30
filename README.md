# 🏃 Motus App — MVP Setup Guide

Welcome to the Motus mobile app codebase.

This is an MVP. The goal is to move fast, keep it simple, and avoid wasting time reinventing the wheel. Do not overengineer. Use what's here. Ship.

---

## 🧱 Tech Stack

* **React Native with Expo Router** — cross-platform app framework
* **Supabase** — handles auth, database, file storage, and backend functions
* **Tamagui** — styled UI components with cross-platform theming
* **TypeScript** — don't disable it
* **react-hook-form + zod** — for form handling and validation
* **Zustand** — lightweight global state management

---

## 🚀 Project Philosophy

* This app exists to test whether there is a market.
* This is a **quick-and-dirty MVP**, not a polished product.
* Use the **Supabase client** — *do not* write custom REST endpoints unless absolutely necessary.
* Stick to the provided components and patterns (e.g., Tamagui, Expo Router).
* Don’t "senior dev" your way into complexity. Just ship features.

---

## 🧪 Local Development Setup

### 1. 🔧 Prerequisites

* [Node.js](https://nodejs.org) (v18+)
* [Yarn](https://yarnpkg.com/getting-started/install)
* [Expo CLI](https://docs.expo.dev/get-started/installation/)
* [Supabase CLI](https://supabase.com/docs/guides/cli)
* Docker (for local Supabase)

Install the global tools:

```bash
npm install -g yarn expo-cli supabase
```

---

### 2. 📆 Install Dependencies

```bash
yarn install
```

---

### 3. 🧬 Run Supabase Locally

```bash
supabase start
```

This spins up:

* PostgreSQL database
* Supabase API
* Auth server
* Edge functions

If you get errors, make sure Docker is running.

---

### 4. 🔑 Set Up Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Update with local Supabase values. You can find your keys via `supabase status`.

```
SUPABASE_URL=http://localhost:64421
SUPABASE_ANON_KEY=your_anon_key_here
```

---

### 5. 📱 Run the App

#### Option A: Expo Go (fastest for testing)

```bash
yarn dev
```

* Scan the QR code with the [Expo Go app](https://expo.dev/client) on your phone.
* Hot reload supported.

#### Option B: Dev build with native modules

If you need native modules (e.g., for push notifications):

```bash
yarn ios
# or
yarn android
```

> Requires Xcode or Android Studio to be installed and configured.

---

## 🧹 Project Structure

```
app/                ← All routes via Expo Router
components/         ← Shared UI components (Tamagui-based)
utils/              ← Supabase client, helpers, etc.
utils/                ← External integrations
```

---

## 🎨 Working with Tamagui

Tamagui gives you styled cross-platform components like:

```tsx
import { Button, Input, YStack, Text } from 'tamagui';

<Button theme="active" size="$4">
  Press me
</Button>
```

If you're not seeing styles, check:

* `tamagui.config.ts` is being imported properly
* `defaultProps` and `variants` are defined for components like `Button`

>  Use Tamagui styles. Do not add tailwind

---

## 🧠 Dev Guidelines

* Use `supabase.auth`, `supabase.from`, etc. — do not wrap Supabase in custom REST layers.
* Reuse `Input`, `Button`, etc. from the shared components folder if wrappers exist.
* Use Zustand for global or shared state. Keep it simple.
* Don’t add external state management libraries unless discussed.
* If something is unclear, **ask instead of guessing**.

---

## ✅ MVP Expectations

Done is better than perfect. Focus on:

* Clean auth flow (signup, login, forgot password)
* Simple navigation
* Clear UI using Tamagui components
* Supabase as your backend — nothing else

---

## 🚨 Need Help?

If you're blocked, write down:

1. What you're trying to do
2. What you tried
3. What failed

Then share it with the Motus team.
