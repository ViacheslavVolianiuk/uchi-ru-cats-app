import React from 'react';
import { useEffect, useState } from 'react';
import CatCard from './CatCard';
import './CatsList.css';
import { v4 as uuidv4 } from 'uuid';

function CatsList() {
  const [catsData, setCatsData] = useState([]);
  const [isBottom, setIsBottom] = useState(false);
  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=40')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => (item.liked = false));
        if (catsData.length === 0) setCatsData(data);
        else if (catsData.length > 0) setCatsData([...catsData, ...data]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);

  window.onscroll = function () {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      if (isBottom === false) {
        setIsBottom(true);
      }
      if (isBottom === true) {
        setIsBottom(false);
      }
    }
  };

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
