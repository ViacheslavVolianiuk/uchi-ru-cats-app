import React, { useState, useEffect, useCallback, useRef } from 'react';
import CatCard from './CatCard';
import './CatsList.css';
import { v4 as uuidv4 } from 'uuid';

function CatsList() {
  const [catsData, setCatsData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const observer = useRef();
  const lastCatCardRef = useCallback(
    node => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching]
  );

  const fetchCats = useCallback(() => {
    setIsFetching(true);
    fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => (item.liked = false));
        setCatsData((prevCatsData) => [...prevCatsData, ...data]);
        setIsFetching(false);
      });
  }, [page]);

  useEffect(() => {
    fetchCats();
  }, [fetchCats]);

  return (
    <div className="cats-list">
      {catsData.map((item, index) => {
        if (catsData.length === index + 1) {
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
      {isFetching && <div>Loading...</div>}
    </div>
  );
}

export default CatsList;
