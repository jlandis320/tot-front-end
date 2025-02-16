import { useState } from 'react';

const RatingCard = (props) => {
  const [dets,setDets] =useState(props.rating)
  
  const [isEdit, setIsEdit] = useState(false);

  let ratingText = '';

  if (props.rating.rating === 1) {
    ratingText = 'Overrated';
  } else if (props.rating.rating === 3) {
    ratingText = 'Liked';
  } else {
    ratingText = 'Underrated';
  }

  const [form, setForm] = useState({
    rating: props.rating.rating,
    comment: props.rating.comment,
  });

  const handleButton = (val) => {
    setForm({ ...form, rating: val });
  };

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleUpdateRating(props.restaurant._id, props.rating._id, form);
    setIsEdit(false)

  };

  let isUser = props.rating.author._id === props.user.profile;

  return (
    <div style={{ padding: '5px', border: '1px solid black', margin: '2px' }}>
      {props.rating.author.name}-{ratingText}
      <br />
      {isEdit ? (
        <div>
          <button
            style={{ margin: '0 5px 0 0' }}
            onClick={() => handleButton(1)}
          >
            Overhyped
          </button>
          <button onClick={() => handleButton(3)}>Like</button>
          <button
            style={{ margin: '0 0 0 5px' }}
            onClick={() => handleButton(5)}
          >
            Underrated
          </button>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              autoComplete="off"
              type="text"
              name="comment"
              id="comment-input"
              value={form.comment}
              placeholder="Insert comments here"
              onChange={handleChange}
            />
            <button onClick={() => setIsEdit(false)}>Cancel</button>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <>{props.rating.comment}</>
      )}
      {isUser && !isEdit && (
        <button onClick={() => setIsEdit(true)}>Edit</button>
      )}
    </div>
  );
};

export default RatingCard;
