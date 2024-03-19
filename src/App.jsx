import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import CreateReview from "./pages/CreateReview";
import About from "./pages/About";
import Search from "./pages/Search";
import Review from "./pages/Review";
import UpdateReview from "./pages/UpdateReview";

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/review/:reviewId" element={<Review/>} />

        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/create-review" element={<CreateReview/>} />
          <Route path="/update-review/:reviewId" element={<UpdateReview/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
