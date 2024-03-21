import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

export default function Review() {

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/review/get/${params.reviewId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setReview(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchReview();
  }, [params.reviewId]);

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {review && !loading && !error && (
        <div className="">
          <h3 className='text-semibold text-lg text-slate-700 truncate'>{review.title}</h3>
          <h5 className='text-sm text-slate-600 truncate w-full'>{review.author}</h5>
          <p className='text-sm text-gray-600'>{review.rating}</p>
          <p className='text-sm text-slate-800'>{review.review}</p>
        </div>
      )}
    </main>
  )
}
