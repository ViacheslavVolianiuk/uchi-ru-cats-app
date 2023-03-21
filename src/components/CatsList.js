import React, { useState, useEffect, useRef, useCallback } from 'react';
import CatCard from './CatCard';
import './CatsList.css';

function CatsList() {
  const [catsData, setCatsData] = useState([]);
  const [isBottom, setIsBottom] = useState(() => false);

  // Use a ref to keep track of the last cat card element
  const lastCatCardRef = useRef(null);

  const fetchCats = useCallback(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=40')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => (item.liked = false));
        setCatsData((prevCatsData) => [...prevCatsData, ...data]);
        setIsBottom(false);
      });
  }, []);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  useEffect(() => {
    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the element is visible, fetch more cats
        if (entry.isIntersecting) {
          setIsBottom(() => true);
        }
      });
    });

    // Observe the last cat card element
    if (lastCatCardRef.current) {
      observer.observe(lastCatCardRef.current);
    }

    // Cleanup function to disconnect observer
    return () => {
      observer.disconnect();
    };
  }, [lastCatCardRef]);

  useEffect(() => {
    if (isBottom) {
      fetchCats();
    }
  }, [isBottom, fetchCats]);

  return (
    <div className="cats-list">
      {catsData &&
        catsData.map((item, index) => (
          <CatCard
            key={item.id}
            ref={index === catsData.length - 1 ? lastCatCardRef : null}
            url={item.url}
            liked={item.liked}
          />
        ))}
    </div>
  );
}

export default CatsList;
