import React, { useState, useEffect, useRef } from 'react';
import CatCard from './CatCard';
import './CatsList.css';
import { v4 as uuidv4 } from 'uuid';

function CatsList() {
  const [catsData, setCatsData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const observer = useRef(null);
  const lastCatCardRef = useRef(null);

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    fetchCats();
  }, [isLoading]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          setPage((page) => page + 1);
          setIsLoading(true);
        }
      },
      { threshold: 1 }
    );
  }, []);

  useEffect(() => {
    if (lastCatCardRef.current) {
      observer.current.observe(lastCatCardRef.current);
    }
    return () => {
      observer.current.disconnect();
    };
  }, [catsData]);

  const fetchCats = () => {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => (item.liked = false));
        setCatsData((prevCatsData) => [...prevCatsData, ...data]);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const handleLike = (url) => {
    const updatedCatsData = catsData.map((cat) => {
      if (cat.url === url) {
        return { ...cat, liked: !cat.liked };
      } else {
        return cat;
      }
    });
    setCatsData(updatedCatsData);
  };

  return (
    <div className="cats-list">
      {catsData.map((cat, index) => {
        if (index === catsData.length - 1) {
          return (
            <CatCard
              key={uuidv4()}
              ref={lastCatCardRef}
              url={cat.url}
              liked={cat.liked}
              handleLike={handleLike}
            />
          );
        } else {
          return (
            <CatCard
              key={uuidv4()}
              url={cat.url}
              liked={cat.liked}
              handleLike={handleLike}
            />
          );
        }
      })}
      {isLoading && <div>Loading...</div>}
    </div>
  );
}

export default CatsList;
