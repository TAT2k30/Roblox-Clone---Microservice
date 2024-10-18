
function Footer() {

    return (
        <footer className="bg-commonBlack text-gray-300 py-10 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cột 1: Thông tin về công ty */}
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
                        <p className="text-gray-400">
                            We are a company dedicated to delivering the best products and
                            services to our customers worldwide. Learn more about our mission
                            and values.
                        </p>
                    </div>

                    {/* Cột 2: Liên kết nhanh */}
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Kết nối với chúng tôi */}
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-4">Connect With Us</h2>
                        <div className="flex space-x-4">
                            {/* Thêm các icon tương ứng cho social media */}
                            <a href="#" className="hover:text-white">
                                <svg
                                    className="w-6 h-6 text-gray-400 hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M22.46 6c-.77.35-1.61.58-2.48.69a4.22 4.22 0 001.88-2.31 8.34 8.34 0 01-2.67 1.02 4.14 4.14 0 00-7.08 3.77A11.75 11.75 0 011.64 4.15a4.13 4.13 0 001.28 5.52 4.07 4.07 0 01-1.87-.52v.05a4.13 4.13 0 003.32 4.05 4.18 4.18 0 01-1.86.07 4.14 4.14 0 003.86 2.87A8.31 8.31 0 010 19.5a11.72 11.72 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.36 8.36 0 0024 5.54a8.4 8.4 0 01-2.54.7z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-white">
                                <svg
                                    className="w-6 h-6 text-gray-400 hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19.7 0H4.3A4.32 4.32 0 000 4.3v15.4A4.32 4.32 0 004.3 24h15.4a4.32 4.32 0 004.3-4.3V4.3A4.32 4.32 0 0019.7 0zM8.6 19.7H4.8V9.1h3.8v10.6zm-1.9-12A2.2 2.2 0 014.5 5.5a2.21 2.21 0 012.2-2.2 2.21 2.21 0 012.2 2.2 2.21 2.21 0 01-2.2 2.2zm13.5 12H15v-5.3c0-1.3-.03-3-1.82-3-1.83 0-2.12 1.43-2.12 2.9v5.4h-3.8V9.1h3.6v1.5h.05a3.94 3.94 0 013.55-2c3.8 0 4.5 2.5 4.5 5.7v5.4z" />
                                </svg>
                            </a>
                            {/* Thêm icon khác */}
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-400">
                    © 2024 Your Company. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
