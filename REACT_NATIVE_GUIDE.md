# ClassPulse — React Native (iOS + Android) Migration Guide

## Can ClassPulse be converted to React Native for iOS?

Yes. React Native supports both Android and iOS from a single codebase,
which is the right move if you want ClassPulse on the App Store.

---

## What changes vs the Flutter version

| Feature | Flutter (current) | React Native |
|---|---|---|
| Language | Dart | JavaScript / TypeScript |
| UI | Flutter widgets | React Native components |
| Local DB | Hive | AsyncStorage / MMKV / Realm |
| Notifications | flutter_local_notifications + custom Kotlin | notifee (full iOS + Android support) |
| OCR | google_mlkit_text_recognition | @react-native-ml-kit/text-recognition |
| Image pick | image_picker | react-native-image-picker |
| Google Drive | googleapis Dart | Google Drive REST API via fetch |
| Navigation | Navigator / MaterialPageRoute | React Navigation |
| Vibration | Android Vibrator API | react-native-haptic-feedback |

---

## Recommended stack

```
React Native (with TypeScript)
├── Navigation    → @react-navigation/native + @react-navigation/bottom-tabs
├── Storage       → @react-native-async-storage/async-storage  (or MMKV for speed)
├── Notifications → notifee  ← best for iOS + Android exact alarms
├── OCR           → @react-native-ml-kit/text-recognition
├── Image pick    → react-native-image-picker
├── Haptics       → react-native-haptic-feedback
├── Calendar UI   → react-native-calendars
├── Rich text     → react-native-pell-rich-editor
└── Google Auth   → @react-native-google-signin/google-signin
```

---

## Project setup

```bash
npx react-native@latest init ClassPulseRN --template react-native-template-typescript
cd ClassPulseRN
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install notifee @notifee/react-native
npm install @react-native-ml-kit/text-recognition
npm install react-native-image-picker
npm install @react-native-async-storage/async-storage
npm install react-native-haptic-feedback
npm install @react-native-google-signin/google-signin
npm install react-native-calendars
npm install uuid react-native-get-random-values
npx pod-install   # iOS only
```

---

## Key code equivalents

### Notification with vibrate-only (notifee)

```typescript
import notifee, { AndroidImportance, IOSNotificationPermissions } from '@notifee/react-native';

// Create channels (Android)
await notifee.createChannel({
  id: 'classpulse_sound',
  name: 'ClassPulse Reminders',
  importance: AndroidImportance.HIGH,
  vibration: true,
  vibrationPattern: [300, 400, 300, 400],
});

await notifee.createChannel({
  id: 'classpulse_vibrate',
  name: 'ClassPulse Silent',
  importance: AndroidImportance.HIGH,
  sound: '',          // no sound
  vibration: true,
  vibrationPattern: [400, 500, 400, 500, 400, 500],
});

// Schedule a notification
await notifee.createTriggerNotification(
  {
    title: '⏰ Class in 10 minutes',
    body: 'Mathematics • 8:00 AM – 9:30 AM',
    android: {
      channelId: vibrateOnly ? 'classpulse_vibrate' : 'classpulse_sound',
    },
    ios: {
      sound: vibrateOnly ? undefined : 'default',
      // iOS vibrates automatically with HIGH importance
    },
  },
  {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerMs,
    alarmManager: { allowWhileIdle: true },  // Android exact alarm
  }
);
```

### OCR scan

```typescript
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const result = await TextRecognition.recognize(imagePath);
const text = result.text;
// then run the same parsing logic from ocr_service.dart, ported to TypeScript
```

### Vibrate-only toggle

```typescript
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// When vibrateOnly mode fires a notification, also trigger haptic
ReactNativeHapticFeedback.trigger('notificationWarning', {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
});
```

---

## iOS-specific requirements

1. **Xcode** — required to build for iOS (Mac only, or use a CI service like Expo EAS)
2. **Apple Developer Account** — $99/year to publish on App Store
3. **Info.plist permissions** to add:
   ```xml
   <key>NSCameraUsageDescription</key>
   <string>Used to scan your class schedule</string>
   <key>NSPhotoLibraryUsageDescription</key>
   <string>Used to upload your schedule image</string>
   ```
4. **notifee** handles iOS notification permissions automatically

---

## Don't have a Mac?

Use **Expo EAS Build** — it builds iOS IPA files on Expo's cloud servers
without needing a Mac locally.

```bash
npm install -g eas-cli
eas login
eas build --platform ios
```

---

## Effort estimate

| Task | Effort |
|---|---|
| Project setup + navigation | 1 day |
| Schedule model + storage | 1 day |
| Home + Weekly screens | 2 days |
| Add/Edit screen | 1 day |
| Notifications (notifee) | 1–2 days |
| OCR scan screen | 1–2 days |
| Settings + vibrate toggle | 0.5 day |
| Notes + Calendar | 1–2 days |
| Google Drive backup | 1–2 days |
| iOS testing + polish | 2–3 days |
| **Total** | **~2–3 weeks** |
