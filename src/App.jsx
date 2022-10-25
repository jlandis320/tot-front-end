// npm modules
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

// page components
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import Profiles from "./pages/Profiles/Profiles";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import New from "./pages/New/New";
import Wishlist from "./pages/Wishlist/Wishlist";
import NewRestaurant from "./pages/NewRestaurant/NewRestaurant";
import Profile from "./pages/Profile/Profile";
import Followers from "./pages/Followers/Followers";
import Following from "./pages/Following/Following";
import Shared from "./pages/Shared/Shared";
import Visited from "./pages/Visited/Visited";

// components
import Nav from "./components/Nav/Nav";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// services
import * as authService from "./services/authService";
import * as restaurantService from "./services/restaurantService";
import * as ttreviewService from "./services/ttreviewService";

// styles
import "./App.css";

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [ttreviews, setTTReviews] = useState([]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  const handleSignupOrLogin = () => {
    setUser(authService.getUser());
  };

  const handleAddRestaurant = async (restaurantData) => {
    const newRestaurant = await restaurantService.create(restaurantData);
    setRestaurants([newRestaurant, ...restaurants]);
    navigate("/restaurants");
  };

  const handleAddTTReview = async (ttreviewData) => {
    const newTTReview = await ttreviewService.create(ttreviewData);
    setTTReviews([newTTReview, ...ttreviews]);
    navigate("/reviews");
  };

  const handleDeleteTTReview = async (id) =>{
    const deletedTTReview = await ttreviewService.delete(id)
    setTTReviews(ttreviews.filter(r => r._id !== deletedTTReview._id))
    return deletedTTReview
  }

  useEffect(() => {
    const fetchAllRestaurants = async () => {
      const data = await restaurantService.index();
      setRestaurants(data);
    };
    const fetchAllTTReviews = async () => {

      const data = await ttreviewService.index();
      setTTReviews(data);
    };
    fetchAllRestaurants();
    fetchAllTTReviews();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Landing
              user={user}
              restaurants={restaurants}
              ttreviews={ttreviews}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/new"
          element={
            <ProtectedRoute user={user}>
              <New user={user} handleAddTTReview={handleAddTTReview} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute user={user}>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shared"
          element={
            <ProtectedRoute user={user}>
              <Shared 
                user={user}
                ttreviews={ttreviews}
                setTTReviews={setTTReviews}
                handleDeleteTTReview={handleDeleteTTReview}
              />
            </ProtectedRoute>}
        />
        <Route
          path="/followers"
          element={
            <ProtectedRoute user={user}>
              <Followers user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/following"
          element={
            <ProtectedRoute user={user}>
              <Following user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/visited"
          element={
            <ProtectedRoute user={user}>
              <Visited user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants/new"
          element={
            <ProtectedRoute user={user}>
              <NewRestaurant
                user={user}
                handleAddRestaurant={handleAddRestaurant}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile 
                user={user}
                handleLogout={handleLogout} 
              />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Nav user={user} handleLogout={handleLogout} />
    </>
  );
};

export default App;
