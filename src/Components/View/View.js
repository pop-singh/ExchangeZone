import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contextStore/PostContext";
import { Firebase } from "../../firebase/config";
import { useHistory } from "react-router";
import { AuthContext } from "../../contextStore/AuthContext";
import "./View.css";
function View() {
  let { postContent } = useContext(PostContext);
  const { user } = useContext(AuthContext)

  const [userDetails, setUserDetails] = useState();
  const history = useHistory();
  useEffect(() => {
    let { userId } = postContent;
    if (userId === undefined) {
      history.push("/");
    } else {
      Firebase.firestore()
        .collection("users")
        .where("id", "==", userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
    }
  }, [history, postContent]);

  const canManage = user && user.uid === postContent.userId

  const handleDelete = async () => {
    if (!canManage) return
    if (!window.confirm('Delete this listing?')) return
    await Firebase.firestore().collection('products').doc(postContent.id).delete()
    history.push('/')
  }

  const handleMarkSold = async () => {
    if (!canManage) return
    await Firebase.firestore().collection('products').doc(postContent.id).update({ sold: true })
    alert('Marked as sold')
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postContent.url} alt="" />
      </div>{" "}
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postContent.price} </p>
          <span>{postContent.name}</span>
          <p>{postContent.category}</p>
          <span>{postContent.createdAt?.seconds ? new Date(postContent.createdAt.seconds * 1000).toDateString() : postContent.createdAt}</span>
          {postContent.sold && <p style={{ color: '#e0245e', fontWeight: 600 }}>SOLD</p>}
        </div>
        <div className="productDescription">
            <p className="p-bold">Product Description</p>
            <p>{postContent.description}</p>
            
          </div>
        {userDetails &&
          <div className="contactDetails">
            <p className="p-bold">Seller details</p>
            <p>Name : {userDetails.name}</p>
            <p>Phone : {userDetails.phone}</p>
          </div>
        }
        {canManage && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={handleMarkSold}>Mark as sold</button>
            <button onClick={handleDelete} style={{ background: '#e0245e', color: '#fff' }}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
