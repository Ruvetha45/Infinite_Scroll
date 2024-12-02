import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // Intersection Observer to trigger load more when the loader is in view
  useEffect(() => {
    const loadMoreItems = () => {
      setLoading(true);
      setTimeout(() => {
        const newItems = Array.from({ length: 10 }, (_, index) => `Item ${items.length + index + 1}`);
        setItems((prevItems) => [...prevItems, ...newItems]);
        setLoading(false);
      }, 1000);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    // Store loaderRef.current in a variable
    const currentLoaderRef = loaderRef.current;

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    // Cleanup function using the stored reference
    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [items, loading]);  // Dependencies: 'items' and 'loading'

  // Initial load of items
  useEffect(() => {
    const initialLoad = () => {
      setLoading(true);
      setTimeout(() => {
        const newItems = Array.from({ length: 10 }, (_, index) => `Item ${index + 1}`);
        setItems(newItems);
        setLoading(false);
      }, 1000);
    };
    initialLoad();
  }, []);

  return (
    <div className="app">
      <h1>INFINITE SCROLL</h1>
      <div className="item-list">
        {items.map((item, index) => (
          <div key={index} className="item">
            {item}
          </div>
        ))}
      </div>

      {loading && <div className="loading">Loading...</div>}

      <div ref={loaderRef} className="loader">
        {!loading && <span>Scroll down to load more...</span>}
      </div>
    </div>
  );
};

export default App;
