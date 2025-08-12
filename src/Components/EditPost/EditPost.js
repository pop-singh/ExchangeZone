import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Firebase } from '../../firebase/config'
import Header from '../Header/Header'
import './EditPost.css'

function EditPost() {
  const { id } = useParams()
  const history = useHistory()
  const [initialPost, setInitialPost] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const unsubscribe = Firebase.firestore().collection('products').doc(id).onSnapshot(doc => {
      if (!doc.exists) {
        history.replace('/')
        return
      }
      const data = { id: doc.id, ...doc.data() }
      setInitialPost(data)
      setName(data.name || '')
      setCategory(data.category || '')
      setPrice(data.price || '')
      setDescription(data.description || '')
      setLoading(false)
    })
    return () => unsubscribe()
  }, [id, history])

  const handleSubmit = async () => {
    if (!name || !category || !price) {
      alert('Please fill all required fields')
      return
    }
    try {
      setSubmitting(true)
      let url = initialPost.url
      if (imageFile) {
        // delete old image
        if (url) {
          try {
            const ref = Firebase.storage().refFromURL(url)
            await ref.delete()
          } catch (e) {
            // ignore
          }
        }
        const uploadRef = Firebase.storage().ref(`/image/${imageFile.name}`)
        await uploadRef.put(imageFile)
        url = await uploadRef.getDownloadURL()
      }

      await Firebase.firestore().collection('products').doc(id).update({
        name,
        category,
        price,
        description,
        url,
      })
      alert('Post updated')
      history.push('/view')
    } catch (e) {
      alert(e.message || 'Failed to update post')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="centerDiv">Loading...</div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="centerDiv">
        <label>Name</label>
        <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} />

        <label>Category</label>
        <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Cars">Cars</option>
          <option value="Cameras & Lenses">Cameras & Lenses</option>
          <option value="Computers & Laptops">Computers & Laptops</option>
          <option value="Mobile Phones">Mobile Phones</option>
          <option value="Motorcycles">Motorcycles</option>
          <option value="Tablets">Tablets</option>
        </select>

        <label>Price</label>
        <input className="input" type="number" value={price} onChange={e => setPrice(e.target.value)} />

        <label>Description</label>
        <input className="input" type="text" value={description} onChange={e => setDescription(e.target.value)} />

        <img alt="Preview" width="200" height="200" src={imageFile ? URL.createObjectURL(imageFile) : initialPost.url} />
        <input type="file" onChange={e => setImageFile(e.target.files[0])} />

        <button className="uploadBtn" disabled={submitting} onClick={handleSubmit}>
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </>
  )
}

export default EditPost