import { Link } from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";

export default function ReviewItem({ review }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg w-full sm:-[330px]'>
      <Link to={`/review/${review._id}`}>
        <h3 className='text-semibold text-lg text-slate-700 truncate'>{review.title}</h3>
        <h5 className='text-sm text-slate-600 truncate w-full'>{review.author}</h5>
        <p className='text-sm text-gray-600'>{review.date}</p>
      </Link>
    </div>
  )
}
