import React from 'react';

function Search({ search, setSearch, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className="flex w-full mb-6">
      <input
        type="text"
        placeholder="Search city"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-grow bg-black/20 text-white placeholder-gray-400 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        aria-label="Search city"
      />
      <button 
        type="submit" 
        className="bg-blue-600 hover:bg-blue-700 rounded-r-lg px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </form>
  );
}

export default Search;
