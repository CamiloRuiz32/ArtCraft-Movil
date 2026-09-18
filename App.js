import React, { useState } from 'react';
import { View } from 'react-native';
import CustomSplash from './components/CustomSplash';
import Home from './components/Home';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <CustomSplash onFinish={() => setShowSplash(false)} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Home />
    </View>
  );
}
