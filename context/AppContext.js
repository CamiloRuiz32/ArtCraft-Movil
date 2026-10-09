import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]); // {product, qty}
  const [favorites, setFavorites] = useState([]); // product ids
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState(['Calle 123 #123-45, Popayán']);
  const [cards, setCards] = useState(['Visa terminada en 1234']);
  const [notifications, setNotifications] = useState({ pedidos: true, promos: true, noticias: false });

  const updateProfile = (name, email) => {
    if (!name || !email) return { ok: false, error: 'Nombre y correo son obligatorios' };
    setUser((u) => ({ ...(u || {}), name, email }));
    return { ok: true };
  };

  const addAddress = (text) => text && setAddresses((prev) => [...prev, text]);
  const addCard = (text) => text && setCards((prev) => [...prev, text]);
  const toggleNotification = (key) =>
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));

  // Simulación de autenticación
  const login = (email, password) => {
    if (!email || !password) return { ok: false, error: 'Completa todos los campos' };
    setUser({ name: email.split('@')[0], email });
    return { ok: true };
  };

  const register = (name, email, password, confirm) => {
    if (!name || !email || !password) return { ok: false, error: 'Completa todos los campos' };
    if (password !== confirm) return { ok: false, error: 'Las contraseñas no coinciden' };
    setUser({ name, email });
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const checkout = () => {
    if (cart.length === 0) return null;
    const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0) + 30000;
    const order = {
      id: '#' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('es-CO'),
      items: cart,
      total,
      status: 'En camino',
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  };

  const cartTotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <AppContext.Provider
      value={{
        user, login, register, logout, updateProfile,
        cart, addToCart, changeQty, cartTotal,
        favorites, toggleFavorite,
        orders, checkout,
        addresses, addAddress, cards, addCard,
        notifications, toggleNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
