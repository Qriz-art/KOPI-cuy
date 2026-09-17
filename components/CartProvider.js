"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useToast } from "@/components/ToastProvider";
import { buildCartLine, cartCount, cartTotal } from "@/lib/cart";

const CartContext = createContext(null);
const STORAGE_KEY = "kopicuy.cart.v1";

export function CartProvider({ children }) {
  const { push } = useToast();
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Ambil keranjang dari localStorage setelah mount (aman untuk SSR).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* localStorage tidak tersedia - keranjang jalan tanpa simpan */
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore quota / private mode */
    }
  }, [items, ready]);

  const addItem = useCallback(
    (item, selected = {}, qty = 1, note = "") => {
      const line = buildCartLine(item, selected, qty, note);
      setItems((current) => {
        const index = current.findIndex((entry) => entry.lineId === line.lineId);
        if (index === -1) return [...current, line];
        const next = [...current];
        next[index] = { ...next[index], qty: next[index].qty + qty };
        return next;
      });
      push({
        title: "Ditambahkan ke pesanan",
        description: `${qty} x ${item.name}`,
        icon: "cart",
      });
    },
    [push]
  );

  const updateQty = useCallback((lineId, qty) => {
    setItems((current) =>
      current
        .map((entry) => (entry.lineId === lineId ? { ...entry, qty: Math.max(0, qty) } : entry))
        .filter((entry) => entry.qty > 0)
    );
  }, []);

  const removeItem = useCallback((lineId) => {
    setItems((current) => current.filter((entry) => entry.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      items,
      ready,
      count: cartCount(items),
      subtotal: cartTotal(items),
      addItem,
      updateQty,
      removeItem,
      clearCart,
      isOpen,
      openCart,
      closeCart,
    }),
    [items, ready, addItem, updateQty, removeItem, clearCart, isOpen, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus dipakai di dalam CartProvider");
  }
  return context;
}
