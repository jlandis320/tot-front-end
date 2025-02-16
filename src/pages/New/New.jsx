import { useState } from "react";
import { Link } from "react-router-dom";

const New = (props) => {
  
  const [form, setForm] = useState({
    url:''
  })
  
  const handleChange = ({target}) => {
    setForm({...form, [target.name]: target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleAddTTReview(form)
  }

  return ( 
    <>
      <h1>I'm the new tiktok page</h1>
      <Link to="/restaurants/new">
        <h2>Add New Restaurant</h2>
      </Link>
      <h3> Add TikTokReview </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="url-input">URL:</label>
        <input
          required
          type="text"
          name="url"
          id="url-input"
          value={form.url}
          placeholder="TikTok video url"
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default New;