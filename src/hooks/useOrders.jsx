import { useState, useEffect } from 'react'

export const useOrders = () => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('elvara-orders')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('elvara-orders', JSON.stringify(orders))
  }, [orders])

  const createOrder = (cartData, shippingData) => {
    const orderNumber = 'ELV-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    const newOrder = {
      id: orderNumber,
      date: new Date().toISOString(),
      items: cartData,
      total: cartData.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Processing',
      shipping: shippingData
    }
    setOrders(prev => [newOrder, ...prev])
    return orderNumber
  }

  return { orders, createOrder }
}
