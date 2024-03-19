import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Review from '../components/Review';

export default function Search() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/review/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      };
      setReviews(data);
      setLoading(false);
    };

    fetchReview();
  }, [location.search]);

  const onShowMoreClick = async () => {
    const numberOfReviews = reviews.length;
    const startIndex = numberOfReviews;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();

    const res = await fetch(`/api/review/get?${searchQuery}`);
    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }
    setReviews([...reviews, ...data]);
  };

  return (
    <div className='flex-1'>
      <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Review results:</h1>  
      <div className="p-7 flex flex-wrap gap-4">
        {!loading && reviews.length === 0 && (
          <p className='text-xl text-slate-700'>No review found!</p>
        )}
        {loading && reviews && reviews.map((review) => 
          <Review key={review._id} review={review}/>)}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover: underline p-7 w-full text-center'
            >
              Show More
            </button>
          )}
      </div>
    </div>
  )
}
