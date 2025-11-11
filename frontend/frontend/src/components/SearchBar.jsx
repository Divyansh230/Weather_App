import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl p-3 w-full max-w-lg shadow-lg"
    >
      <input
        type="text"
        placeholder="Ask: What's the weather in Delhi and Mumbai?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow bg-transparent outline-none text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-medium hover:scale-105 transition-transform"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
