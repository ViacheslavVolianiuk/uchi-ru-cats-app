import React, { useState, useEffect, useCallback } from 'react';
import CatCard from './CatCard';
import './CatsList.css';
import { v4 as uuidv4 } from 'uuid';

function CatsList() {
  const [catsData, setCatsData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchCats = useCallback(() => {
    fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => (item.liked = false));
        setCatsData((prevCatsData) => [...prevCatsData, ...data]);
      });
  }, [page]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchCats();
  }, [page, fetchCats]);

  return (
    <div className="cats-list">
      {catsData &&
        catsData.map((item) => (
          <CatCard key={uuidv4()} url={item.url} liked={item.liked} />
        ))}
    </div>
  );
}

export default CatsList;
