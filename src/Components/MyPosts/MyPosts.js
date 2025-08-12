import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import PostCards from '../PostCards/PostCards'
import { AuthContext } from '../../contextStore/AuthContext'
import { Firebase } from '../../firebase/config'
import './MyPosts.css'

function MyPosts() {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }
    const unsubscribe = Firebase.firestore()
      .collection('products')
      .where('userId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
        setPosts(list)
        setLoading(false)
      })
    return () => unsubscribe()
  }, [user])

  return (
    <>
      <Header />
      <div className="myposts-container">
        <h2>My Posts</h2>
        {loading ? (
          <div>Loading...</div>
        ) : posts.length === 0 ? (
          <div>No posts yet.</div>
        ) : (
          <div className="myposts-grid">
            {posts.map((product, index) => (
              <div className="all-post-card" key={product.id}>
                <PostCards product={product} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default MyPosts