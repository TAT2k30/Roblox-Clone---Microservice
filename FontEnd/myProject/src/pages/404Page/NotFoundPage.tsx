import { useLocation } from "react-router-dom";

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <div className="text-center">
      <h1>404 - Page Not Found</h1>
      <p>The page <strong>{location.pathname}</strong> does not exist.</p>
      <p>Please check the URL or go back to the homepage.</p>
    </div>
  );
};

export default NotFoundPage;
