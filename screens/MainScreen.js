import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import CatalogScreen from './CatalogScreen';
import FavoritesScreen from './FavoritesScreen';
import ProfileScreen from './ProfileScreen';

const tabs = [
  { key: 'Inicio', icon: 'home', component: HomeScreen },
  { key: 'Catálogo', icon: 'grid', component: CatalogScreen },
  { key: 'Favoritos', icon: 'heart', component: FavoritesScreen },
  { key: 'Perfil', icon: 'person', component: ProfileScreen },
];

export default function MainScreen({ navigation }) {
  const [tab, setTab] = useState('Inicio');
  const Active = tabs.find((t) => t.key === tab).component;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Active navigation={navigation} setTab={setTab} />
      </View>

      <View style={styles.tabBar}>
        {tabs.map((t) => (
          <TouchableOpacity key={t.key} style={styles.tabItem} onPress={() => setTab(t.key)}>
            <Ionicons name={t.icon} size={22} color={tab === t.key ? '#FBE9D0' : '#d4a574'} />
            <Text style={tab === t.key ? styles.labelActive : styles.label}>{t.key}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#6b1a1a',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#8c1d0d',
  },
  tabItem: { flex: 1, alignItems: 'center' },
  label: { color: '#d4a574', fontSize: 11 },
  labelActive: { color: '#FBE9D0', fontSize: 11, fontWeight: 'bold' },
});
