export const categories = [
  { id: '1', name: 'Cerámica', emoji: '🏺' },
  { id: '2', name: 'Bisutería', emoji: '💎' },
  { id: '3', name: 'Mochilas', emoji: '👜' },
  { id: '4', name: 'Máscaras', emoji: '🎭' },
];

export const products = [
  { id: '1', name: 'Mochilas', price: 100000, emoji: '👜', category: 'Mochilas', rating: 4, description: 'Mochila tejida a mano por artesanos wayuu.' },
  { id: '2', name: 'Bisutería', price: 10000, emoji: '💎', category: 'Bisutería', rating: 4, description: 'Collar de mostacilla hecho a mano.' },
  { id: '3', name: 'Adorno', price: 100000, emoji: '🏺', category: 'Cerámica', rating: 5, description: 'Jarrón de cerámica pintado a mano.' },
  { id: '4', name: 'Bisutería', price: 100000, emoji: '💍', category: 'Bisutería', rating: 3, description: 'Aretes en filigrana de plata.' },
  { id: '5', name: 'Adorno', price: 95000, emoji: '🏺', category: 'Cerámica', rating: 4, description: 'Vasija artesanal negra.' },
  { id: '6', name: 'Máscara', price: 80000, emoji: '🎭', category: 'Máscaras', rating: 4, description: 'Máscara ceremonial tallada en madera.' },
];

export const formatCOP = (value) =>
  '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' COP';
