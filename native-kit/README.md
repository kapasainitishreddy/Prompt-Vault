# Prompt-Vault Native Kit

Runnable Expo/React Native source with 32 interactive UI patterns connected by 20 guided app journeys. Original components, local sample data, no paid services.

## Run

From the native-kit directory:

    npm install
    npx expo install --fix
    npx expo start

Target: Expo SDK 54, React 19.1, React Native 0.81. The Safe Area provider uses react-native-safe-area-context ~5.6.0 for Android 16 edge-to-edge and notched devices. Node 20.19+ required. See https://docs.expo.dev/versions/v54.0.0/. Check with npx expo-doctor before a native release.

## Copy into your project

Reusable components are in src/components.tsx; colors in src/tokens.ts. Copy individual components/patterns into compatible React Native projects, not the entire demo. catalog.json maps the existing source app flow list and 20 guided journeys.

The demo provides native buttons, inputs, toggles, cards, chips, progress, accessibility labels, light/dark themes, and interactive state. It is not a production component SDK nor a hosted live native preview.

## Honest boundaries

No authentication provider, real account sign-in, cloud sync, permissions, upload, charges, store purchases, notification scheduling, AI inference or account deletion. Those flows are visibly labeled simulations. State is in memory, not durable or encrypted; no remote user data is collected. Do not market demo screens as complete integrations.

Before publishing: run TypeScript checking, Android/iOS device and TalkBack/VoiceOver QA, persistence/recovery tests, native locale/RTL tests, reduced-motion tests, store compliance audits and real-service end-to-end tests. No GitHub Actions are required.
