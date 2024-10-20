function Register() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-green-300 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="mt-1 p-2 w-full border rounded"
              required
            ></input>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 p-2 w-full border rounded"
              required
            ></input>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="mt-1 p-2 w-full border rounded"
              required
            ></input>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="password"
              placeholder="Confirm your password"
              className="mt-1 p-2 w-full border rounded"
              required
            ></input>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
export default Register;
