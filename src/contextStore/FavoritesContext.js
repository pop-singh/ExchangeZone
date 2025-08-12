import React, { createContext, useCallback, useEffect, useMemo, useState, useContext } from 'react'
import { Firebase } from '../firebase/config'
import { AuthContext } from './AuthContext'

export const FavoritesContext = createContext({
  favoriteIds: new Set(),
  isFavorite: () => false,
  refreshFavorites: async () => {},
})

function FavoritesProvider({ children }) {
  const { user } = useContext(AuthContext)
  const [favoriteIds, setFavoriteIds] = useState(new Set())

  const refreshFavorites = useCallback(async () => {
    if (!user) {
      setFavoriteIds(new Set())
      return
    }
    const snapshot = await Firebase.firestore()
      .collection('favorites')
      .where('userId', '==', user.uid)
      .get()

    const ids = new Set()
    snapshot.forEach((doc) => {
      const data = doc.data()
      if (data && data.productId) ids.add(data.productId)
    })
    setFavoriteIds(ids)
  }, [user])

  useEffect(() => {
    refreshFavorites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const isFavorite = useCallback(
    (productId) => {
      return favoriteIds.has(productId)
    },
    [favoriteIds]
  )

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, refreshFavorites }),
    [favoriteIds, isFavorite, refreshFavorites]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export default FavoritesProvider