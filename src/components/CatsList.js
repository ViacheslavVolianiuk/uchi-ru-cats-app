import React, { useState, useEffect, useRef } from 'react';
import CatCard from './CatCard';
import './CatsList.css';
import { v4 as uuidv4 } from 'uuid';

function CatsList() {
  const [catsData, setCatsData] = useState([]);
  const [isBottom, setIsBottom] = useState(false);

  // Use a ref to keep track of the last cat card element
  const lastCatCardRef = useRef(null);

  const fetchCats = () => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=40')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => (item.liked = false));
        setCatsData((prevCatsData) => [...prevCatsData, ...data]);
      });
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    if (!isBottom) return;

    fetchCats();
    setIsBottom(false);
  }, [isBottom, fetchCats]);

  useEffect(() => {
    // Create a new IntersectionObserver instance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // If the element is visible, fetch more cats
        if (entry.isIntersecting) {
          setIsBottom(true);
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

  return (
    <div className="cats-list">
      {catsData &&
        catsData.map((item, index) => {
          if (index === catsData.length - 1) {
            return (
              <CatCard
                key={uuidv4()}
                ref={lastCatCardRef}
                url={item.url}
                liked={item.liked}
              />
            );
          } else {
            return (
              <CatCard key={uuidv4()} url={item.url} liked={item.liked} />
            );
          }
        })}
    </div>
  );
}

export default CatsList;
