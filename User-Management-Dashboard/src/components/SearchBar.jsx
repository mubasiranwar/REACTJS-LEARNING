function SearchBar({ search, onSearch }) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search users by name or email..."
      value={search}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;