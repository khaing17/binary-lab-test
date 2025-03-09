const LeftBar: React.FC = () => {
  return (
    <div className="w-72 sticky top-0 h-screen lg:block hidden p-4 text-white overflow-hidden">
      <h2 className="text-lg font-semibold">mastodon.social</h2>
      <p className="text-sm text-gray-400">
        One of many independent Mastodon servers.
      </p>
      <p className="text-xs text-gray-500 mt-2">Administered by:</p>
      <p className="text-sm">@Mastodon</p>
      <p className="text-xs text-gray-500 mt-2">
        Active Users: <span className="font-bold">379K</span>
      </p>
    </div>
  );
};

export default LeftBar;
