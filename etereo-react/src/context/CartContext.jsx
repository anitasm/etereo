import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, 10) }
            : item,
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => setItems([])

  const totals = useMemo(() => {
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = items.reduce((acc, item) => acc + item.quantity * item.price, 0)
    return { totalItems, totalPrice }
  }, [items])

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      ...totals,
    }),
    [items, totals],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}