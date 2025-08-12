import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FavoritesContext } from '../../contextStore/FavoritesContext'
import { Firebase } from '../../firebase/config'
import PostCards from '../PostCards/PostCards'

function Favorites() {
  const { favoriteIds } = useContext(FavoritesContext)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const ids = useMemo(() => Array.from(favoriteIds || []), [favoriteIds])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        if (ids.length === 0) {
          setProducts([])
          return
        }
        // Firestore supports 'in' queries up to 10 values; batch if needed
        const chunks = []
        for (let i = 0; i < ids.length; i += 10) {
          chunks.push(ids.slice(i, i + 10))
        }
        const all = []
        for (const group of chunks) {
          const snap = await Firebase.firestore()
            .collection('products')
            .where('__name__', 'in', group)
            .get()
          snap.forEach((doc) => all.push({ id: doc.id, ...doc.data() }))
        }
        setProducts(all)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [ids])

  if (loading) return <div style={{ padding: 16 }}>Loading favorites...</div>

  return (
    <div style={{ padding: 16 }}>
      <h2>My Favorites</h2>
      {products.length === 0 ? (
        <p>No favorites yet.</p>) : (
        <div className="cards">
          {products.map((product, index) => (
            <div className="quick-menu-cards" key={product.id}>
              <PostCards product={product} index={index} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites