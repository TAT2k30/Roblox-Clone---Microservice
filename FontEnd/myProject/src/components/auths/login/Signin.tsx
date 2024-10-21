function Signin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Login
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value=""
            placeholder="Enter your username"
            className="mt-1 p-2 w-full border rounded border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* password */}
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value=""
            placeholder="Enter your password"
            className="mt-1 p-2 w-full border rounded border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* remember me*/}
        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-indigo-600"
            />
            <span className="ml-2 text-gray-700">Remember me</span>
          </label>
        </div>

        {/* Forget password */}
        <div className="mb-6">
          <a href="#" className="text-gray-700 hover:text-blue-500">
            Forgot your password?
          </a>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded w-full hover:bg-indigo-700"
        >
          Login
        </button>

        {/* làm thêm đăng nhập bằng kiểu khác */}
        {/* <h1 className="text-center text-gray-700 ">OR</h1> */}
      </form>
    </div>
  );
}
export default Signin;
