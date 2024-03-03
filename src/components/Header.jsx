import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={'/'}>
          <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap">
            <span className="text-teal-700">Book</span>
            <span className="text-teal-900">Review</span>
          </h1>
        </Link>

        <form className="flex items-center bg-slate-100 p-3 rounded-lg">
          <input type="text" placeholder="Search" className="bg-transparent focus:outline-none w-24 sm:w-64"/>
          <FaSearch className="text-slate-500"/>
        </form>

        <ul className="flex gap-4">
          <Link to={'/'}>
            <li className="hidden sm:inline text-slate-700 hover:underline text-sm sm:text-lg">Home</li>
          </Link>

          <Link to={'/sign-in'}>
            <li className="text-slate-700 hover:underline text-sm sm:text-lg">Sign In</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}
