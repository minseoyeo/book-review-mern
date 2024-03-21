import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewItem from '../components/ReviewItem';

export default function Search() {

  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    title: '',
    author: '',
    rating: null,
  });
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const titleFromUrl = urlParams.get('title');
    const authorFromUrl = urlParams.get('author');
    const ratingFromUrl = urlParams.get("rating");

    if (
      searchTermFromUrl ||
      titleFromUrl ||
      authorFromUrl ||
      ratingFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        title: titleFromUrl || '',
        author: authorFromUrl || '',
        rating: ratingFromUrl ||  0,
      })
    };

    const fetchReviews = async () => {
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

    fetchReviews();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'title' ||
      e.target.id === 'author' ||
      e.target.id === 'rating'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    };

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();

    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('title', sidebardata.title);
    urlParams.set('author', sidebardata.author);
    urlParams.set('rating', sidebardata.rating);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

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
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <input 
              type="text" 
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className='font-semibold'>Title</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                id='title'
                className='w-5'
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                id='author'
                className='w-5'
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2">
              <input 
                type="number" 
                id='rating'
                className='w-5'
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>

      <div className="flex-1">
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Review results:
        </h1>

        <div className="p-7 flex flex-wrap gap-4">
          {!loading && reviews.length === 0 && (
            <p className='text-xl text-slate-700'>No review found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading && reviews && reviews.map((review) => (
            <ReviewItem key={review._id} review={review}/>
          ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
