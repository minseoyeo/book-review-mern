import { useState, useEffect} from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateReview() {

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: new Date(),
    review: ''
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      const reviewId = params.reviewid;
      const res = await fetch(`/api/review/get/${reviewId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      };
      setFormData(data);
    };

    fetchReview();
  }, []);

  const handleChange = (e) => {
    if (e.target.type === 'text' || e.target.type === 'textarea') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.title.length < 1 
          || formData.author.length < 1 
          || formData.review.length < 1
        ) 
      {
        return setError('You must type at least one')
      }
      setLoading(true);
      setError(false);
      
      const res = await fetch(`/api/review/update/${params.reviewId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/review/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-10'>Create a Review</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className="flex items-center gap-4 flex-1">      
          <input
            type="text" 
            placeholder='title'
            id='title'
            required
            className='border p-3 rounded-lg'
            onChange={handleChange}
            value={formData.title}
          />
          <input
            type="text" 
            placeholder='author'
            id='author'
            required
            className='border p-3 rounded-lg'
            onChange={handleChange}
            value={formData.author}
          />
          <input
            type="date" 
            placeholder='review date'
            id='date'
            required
            className='border p-3 rounded-lg'
            onChange={handleChange}
            value={formData.date}
          />          
          <h4 className='text-2xl font-semibold my-2'>Review</h4> 
          <textarea
            name="reveiw"
            id="review" 
            cols="50" 
            rows="10"
            className='border p-3 rounded-lg'
          >
          </textarea>
        </div>

        <button
          className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Creating...' : 'Create Listing'}
        </button>

        {error && <p className='text-red-700 text-sm'>{error}</p>}
      </form>
    </main>
  )
}

export default UpdateReview