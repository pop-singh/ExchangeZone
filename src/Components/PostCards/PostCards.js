import React,{useContext, useState} from 'react'
import Heart from '../../assets/Heart'
import {useHistory} from "react-router-dom";
import {PostContext} from "../../contextStore/PostContext";
import "./postcards.css"

function PostCards({product,index}) {
    const {setPostContent} = useContext(PostContext)
    const [fav, setFav] = useState(false)
    const history=useHistory()

    const goToView = () => {
      setPostContent(product)
      history.push("/view")
    }

    return (
      <div className="card" key={index} onClick={goToView}>
        <div className="favorite" onClick={(e)=>{ e.stopPropagation(); setFav(v=>!v); }}>
          <div className={fav ? 'active' : ''}>
            <Heart></Heart>
          </div>
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
      </div>
       
    )
}

export default PostCards
