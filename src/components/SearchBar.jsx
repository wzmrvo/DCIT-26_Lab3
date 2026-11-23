const CATEGORIES = ["All", "Electronics", "Books", "School Supplies", "Accessories"];

// Fully controlled: every value comes from props (state in App),
// and every change calls a handler that updates that state.
function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClear,
}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        aria-label="Search products"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        aria-label="Filter by category"
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        aria-label="Sort by price"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>

      <button type="button" className="clear-btn" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  );
}

export default SearchBar;
