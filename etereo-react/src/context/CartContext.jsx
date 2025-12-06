import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = useCallback((product, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.min(Number(quantity) || 0, 10))

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + safeQuantity, 10),
              }
            : item,
        )
      }

      return [...prev, { ...product, quantity: safeQuantity }]
    })
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    const nextQuantity = Math.max(0, Math.min(Number(quantity) || 0, 10))

    setItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: nextQuantity } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = useMemo(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items],
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [addItem, clearCart, items, removeItem, totalItems, totalPrice, updateQuantity],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }

  return context
}