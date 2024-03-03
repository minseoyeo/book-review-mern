import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignOut/>}/>

        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
