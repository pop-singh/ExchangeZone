import React,{useContext} from 'react'
import Heart from '../../assets/Heart'
import {useHistory} from "react-router-dom";
import {PostContext} from "../../contextStore/PostContext";
import { FavoritesContext } from "../../contextStore/FavoritesContext";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import firebase from 'firebase/compat/app'
import "./postcards.css"

function PostCards({product,index}) {
    let {setPostContent} = useContext(PostContext)
    const { user } = useContext(AuthContext)
    const { isFavorite, refreshFavorites } = useContext(FavoritesContext)
 
    const history=useHistory()

    const toggleFavorite = async (e) => {
      e.stopPropagation()
      if (!user) {
        alert('Please login to save favorites')
        return
      }
      const favRef = Firebase.firestore()
        .collection('favorites')
        .where('userId', '==', user.uid)
        .where('productId', '==', product.id)

      const snapshot = await favRef.get()
      if (snapshot.empty) {
        await Firebase.firestore().collection('favorites').add({
          userId: user.uid,
          productId: product.id,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
      } else {
        // remove all matching favorites (should normally be 1)
        const batch = Firebase.firestore().batch()
        snapshot.forEach((doc) => batch.delete(doc.ref))
        await batch.commit()
      }
      refreshFavorites()
    }

    return (
      <div className="card" key={index} onClick={()=>{
        setPostContent(product)
        history.push("/view")
      }}>
        <div className="favorite" onClick={toggleFavorite} title={isFavorite(product.id) ? 'Remove from favorites' : 'Save to favorites'}>
          <Heart filled={isFavorite(product.id)} />
        </div>
        <div className="image">
          <img src={product.url} alt="" />
        </div>
        {product.sold && (
          <div style={{ position: 'absolute', top: 8, left: 8, background: '#e0245e', color: '#fff', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>SOLD</div>
        )}
        <div className="content">
          <p className="rate">&#x20B9; {product.price}</p>
          <span className="category"> {product.category} </span>
          <p className="name"> {product.name}</p>
        </div>
        <div className="date">
          <span>{product.createdAt?.seconds ? new Date(product.createdAt.seconds * 1000).toDateString() : product.createdAt}</span>
        </div>
      </div>
       
    )
}

export default PostCards
