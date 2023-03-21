import React, { useState, useEffect, useRef } from 'react';
import CatCard from './CatCard';
import './CatsList.css';
import { v4 as uuidv4 } from 'uuid';

function CatsList() {
  const [catsData, setCatsData] = useState([]);
  const [isBottom, setIsBottom] = useState(false);
  const [lastCardIndex, setLastCardIndex] = useState(0);
  const lastCatCardRef = useRef(null);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=40')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => (item.liked = false));
        setCatsData(data);
        setLastCardIndex(data.length - 1);
      });
  }, []);

  useEffect(() => {
    if (!isBottom) return;

    fetch('https://api.thecatapi.com/v1/images/search?limit=40')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => (item.liked = false));
        setCatsData((prevCatsData) => [...prevCatsData, ...data]);
        setLastCardIndex(prevLastCardIndex => prevLastCardIndex + data.length);
      });

    setIsBottom(false);
  }, [isBottom]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsBottom(true);
        }
      });
    });

    if (lastCatCardRef.current) {
      observer.observe(lastCatCardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [lastCardIndex]);

  return (
    <div className="cats-list">
      {catsData.map((item, index) => {
        if (index === lastCardIndex) {
          return (
            <CatCard
              key={uuidv4()}
              ref={lastCatCardRef}
              url={item.url}
              liked={item.liked}
            />
          );
        } else {
          return <CatCard key={uuidv4()} url={item.url} liked={item.liked} />;
        }
      })}
    </div>
  );
}

export default CatsList;
