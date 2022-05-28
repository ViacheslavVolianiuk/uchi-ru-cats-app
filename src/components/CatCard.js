import React, { useContext, useState } from 'react';
import './CatCard.css';
import CatsContext from '../context/CatsContext';

function CatCard({ url, liked }) {
  const { addLikedCats, deleteLikedCats } = useContext(CatsContext);
  const [isHeartFill, setHeartFill] = useState(liked);
  return (
    <div className="cat-card">
      <img
        className="cat-img"
        src={url}
        alt="Cat"
        onDoubleClick={(e) => {
          if (isHeartFill === false) {
            addLikedCats(e.target.getAttribute('src'));
            setHeartFill(true);
          }
          if (isHeartFill === true) {
            deleteLikedCats(e.target.getAttribute('src'));
            setHeartFill(false);
          }
        }}
      />

      <svg
        onClick={(e) => {
          if (isHeartFill === false) {
            addLikedCats(
              (
                e.target.previousSibling || e.target.parentNode.previousSibling
              ).getAttribute('src')
            );
            setHeartFill(true);
          }
          if (isHeartFill === true) {
            deleteLikedCats(
              (
                e.target.previousSibling || e.target.parentNode.previousSibling
              ).getAttribute('src')
            );
            setHeartFill(false);
          }
        }}
        xmlns="http://www.w3.org/2000/svg"
        className="heart-icon"
        fill={isHeartFill ? '#f03e3e' : 'transparent'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </div>
  );
}

export default CatCard;
