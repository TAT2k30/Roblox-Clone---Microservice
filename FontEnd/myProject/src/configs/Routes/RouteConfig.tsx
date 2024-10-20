// routes.tsx

import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "../../pages/userPages/publicPages/HomePage";
import NotFoundPage from "../../pages/404Page/NotFoundPage";

const AppRoutes = () => {
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
};

export default AppRoutes;
