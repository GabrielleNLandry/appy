import React, { useMemo, useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// Tiny deterministic "fortune" generator based on input text
const fortunes = [
  'The stars approve. Take the next step.',
  'A tiny risk today becomes a big win tomorrow.',
  'Your idea wants daylight—share it with one person.',
  'Momentum is on your side; start small and keep going.',
  'A helpful ally appears when you ask clearly.',
  'Refactor one thing. Future-you will cheer.',
  'A break now unlocks a better solution later.',
  'Document it—clarity will spark progress.',
  'Press the green button; magic ensues.',
  'Your curiosity is the compass. Follow it.',
];

function pickFortune(seed: string) {
  if (!seed.trim()) return 'Type something first—cosmic channels need a signal!';
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const idx = hash % fortunes.length;
  return fortunes[idx];
}

export default function App() {
  const isDark = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState<string>('');

  const hint = useMemo(() => {
   
    const len = query.trim().length;
    if (len === 0) return 'Type a wish, name, plan, or mood…';
    if (len < 4) return 'Hmm… give the cosmos a bit more to work with.';
    if (len > 30) return 'Woah! Brevity is cosmic soul. Short is sweet.';
    return 'Looks good. Ready when you are.';
  }, [query]);

  const handleCast = () => {
    const text = query.trim();
    if (!text) {
      Alert.alert('Missing input', 'Please enter something first.');
      return;
    }
    const message = pickFortune(text);
    Alert.alert('✨ Star Whisperer ✨', `You typed: "${text}"\n\n${message}`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[
        styles.container,
        { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 },
      ]}
    >
      <View style={styles.card}>
        <Text style={styles.title}>✨ Star Whisperer</Text>
        <Text style={styles.subtitle}>
          Type anything and I’ll echo it back with a tiny cosmic nudge.
        </Text>

        <Text style={styles.label}>Your message to the stars</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="e.g., “Ace my presentation”"
          placeholderTextColor="#94a3b8"
          returnKeyType="done"
          style={styles.input}
          maxLength={80}
        />

        <Text style={styles.hint}>{hint}</Text>

        <View style={styles.buttonWrap}>
          <Button title="Cast Fortune" onPress={handleCast} disabled={!query.trim()} />
        </View>


      </View>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020', // deep night
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#121a2b',
    borderRadius: 18,
    padding: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: '#1d2a44',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  title: {
    color: '#e5e7eb',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9fb3d1',
    marginBottom: 8,
  },
  label: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#0e1425',
    color: 'white',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#233154',
  },
  hint: {
    color: '#91a4c4',
    fontSize: 12,
  },
  buttonWrap: {
    marginTop: 6,
  },
  footer: {
    color: '#8aa1c2',
    fontSize: 12,
    marginTop: 10,
    lineHeight: 18,
  },
});

