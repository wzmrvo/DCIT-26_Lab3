import { useState, useEffect } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import "./App.css";

function App() {
  // Cart state (from Lab 3)
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Lab 4 state
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const handleAddToCart = (title) => {
    setCartCount((count) => count + 1);
    setLastAdded(title);
  };

  // Debounce: only the final pause in typing updates debouncedSearch.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);
    return () => clearTimeout(timer); // cleanup cancels the previous timer
  }, [searchText]);

  // Derived list: calculated during render, not stored in state.
  const keyword = debouncedSearch.trim().toLowerCase();
  let filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(keyword) &&
      (category === "All" || p.category === category)
  );

  if (sortOrder === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  // Tab title follows the number of results.
  useEffect(() => {
    document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
  }, [filteredProducts.length]);

  const handleClear = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

  const badges = { 1: "New", 8: "Sale" };

  return (
    <div className="app">
      <header className="header">
        <h1>CvSU Mini Store</h1>
        <p>Browse school and tech essentials</p>
      </header>

      <p className="cart-message" key={cartCount}>
        {cartCount === 0
          ? "Your cart is empty."
          : `Items added to cart: ${cartCount} (Last added: ${lastAdded})`}
      </p>

      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
        onClear={handleClear}
      />

      <p className="result-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {filteredProducts.length === 0 ? (
        <p className="empty-state">
          No products found. Try a different keyword or category.
        </p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              title={p.title}
              price={p.price}
              category={p.category}
              inStock={p.inStock}
              onAddToCart={handleAddToCart}
            >
              {badges[p.id] && <span>{badges[p.id]}</span>}
            </ProductCard>
          ))}
        </div>
      )}

      <footer className="footer">CvSU Mini Store · DCIT26</footer>
    </div>
  );
}

export default App;