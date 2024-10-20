// routes.tsx

import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "../../pages/userPages/publicPages/HomePage";
import NotFoundPage from "../../pages/404Page/NotFoundPage";
import Login from "../../components/auths/login/Login";
import Register from "../../components/auths/register/Signup";

const AppRoutes = () => {
<<<<<<< HEAD
  return (
    <div className="min-h-screen">
      <Routes>
        {/* Public Routes - Các route ra vào thoải mải không ràng buộc*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element />
        {/* Private Routes - Các route bắt buộc phải Login hoặc với Role gì đấy mới được vào*/}
        {/* <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} /> */}

        {/* 404 Page - Route hiện page lỗi*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
=======
    return (
        <div className="min-h-screen">
            <Routes>
                {/* Public Routes - Các route ra vào thoải mải không ràng buộc*/}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private Routes - Các route bắt buộc phải Login hoặc với Role gì đấy mới được vào*/}
                {/* <Route path="/profile" element={<PrivateRoute component={ProfilePage} />} /> */}

                {/* 404 Page - Route hiện page lỗi*/}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
>>>>>>> ab02e8d4dbdebd22a885affee0883f259fc393d3
};

export default AppRoutes;
