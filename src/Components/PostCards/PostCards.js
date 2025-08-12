import React,{useContext} from 'react'
import Heart from '../../assets/Heart'
import {useHistory} from "react-router-dom";
import {PostContext} from "../../contextStore/PostContext";
import { AuthContext } from "../../contextStore/AuthContext";
import { Firebase } from "../../firebase/config";
import "./postcards.css"

function PostCards({product,index}) {
    let {setPostContent} = useContext(PostContext)//at the time of onClick on post ,the specified post item assigned to postContent by setPostContent function and it will be stored in a global context PostContext
    const { user } = useContext(AuthContext)
    const history=useHistory()//at the time of onClick on post , we want redirect to the view post page

    const handleCardClick = () => {
      setPostContent(product)
      history.push("/view")
    }

    const handleEdit = (event) => {
      event.stopPropagation()
      setPostContent(product)
      history.push(`/edit/${product.id}`)
    }

    const handleDelete = async (event) => {
      event.stopPropagation()
      const confirmDelete = window.confirm("Delete this post? This cannot be undone.")
      if (!confirmDelete) return
      try {
        // Delete image from storage if possible
        if (product.url) {
          try {
            const storageRef = Firebase.storage().refFromURL(product.url)
            await storageRef.delete()
          } catch (err) {
            // ignore storage delete errors; proceed to delete doc
          }
        }
        await Firebase.firestore().collection('products').doc(product.id).delete()
        alert('Post deleted')
      } catch (err) {
        alert(err.message || 'Failed to delete post')
      }
    }

    const isOwner = user && product && product.userId === user.uid

    return (
      <div className="card" key={index} onClick={handleCardClick}>
        <div className="favorite">
          <Heart></Heart>
        </div>
        <div className="image">
          <img src={product.url} alt="" />
        </div>
        <div className="content">
          <p className="rate">&#x20B9; {product.price}</p>
          <span className="category"> {product.category} </span>
          <p className="name"> {product.name}</p>
        </div>
        <div className="date">
          <span>{product.createdAt}</span>
        </div>
        {isOwner && (
          <div className="owner-actions">
            <button className="owner-btn edit" onClick={handleEdit}>Edit</button>
            <button className="owner-btn delete" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
       
    )
}

export default PostCards
