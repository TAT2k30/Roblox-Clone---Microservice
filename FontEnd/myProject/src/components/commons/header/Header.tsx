function Header() {
  return (
    <header className="sticky top-0 bg-commonBlack text-white shadow-md z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between s">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold">LOGO</div>
          <nav className="space-x-8">
            <a href="#" className="text-sm font-medium hover:text-gray-400">
              Charts
            </a>
            <a href="#" className="text-sm font-medium hover:text-gray-400">
              Marketplace
            </a>
            <a href="#" className="text-sm font-medium hover:text-gray-400">
              Create
            </a>
            <a href="#" className="text-sm font-medium hover:text-gray-400">
              Robux
            </a>
          </nav>
        </div>

        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-inputBlack text-white pl-10 pr-4 py-2 rounded-full focus:outline-none"
          />
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.584 4.584a1 1 0 01-1.414 1.414l-4.584-4.584zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
