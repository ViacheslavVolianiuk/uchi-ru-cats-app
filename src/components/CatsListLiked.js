import React, { useContext } from 'react';
import CatsContext from '../context/CatsContext';
import CatCard from './CatCard';
import { v4 as uuidv4 } from 'uuid';

function CatsListLiked() {
  const { likedCats } = useContext(CatsContext);
  return (
    <div className="cats-list">
      {likedCats.map((item) => (
        <CatCard key={uuidv4()} url={item} liked={true} />
      ))}
    </div>
  );
}

export default CatsListLiked;
