const SideBar = () => {
  return (
    <div className="w-72 sticky top-0 h-screen hidden md:block p-4 text-white text-center">
      <h2 className="text-lg font-semibold">Mastodon</h2>
      <p className="text-sm text-gray-400">
        The best way to keep up with what's happening.
      </p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
        Create Account
      </button>
      <button className="border border-gray-400 text-white py-2 px-4 rounded-lg mt-2 w-full">
        Login
      </button>
    </div>
  );
};

export default SideBar;
