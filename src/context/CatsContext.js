import { createContext, useState } from 'react';

const CatsContext = createContext();

export const CatsProvider = ({ children }) => {
  const catsStorage =
    JSON.parse(window.localStorage.getItem('likedCats')) || [];
  const [likedCats, setLikedCats] = useState(catsStorage);
  const addLikedCats = (el) => {
    setLikedCats([el, ...likedCats]);
    window.localStorage.setItem('likedCats', JSON.stringify(likedCats));
  };
  const deleteLikedCats = (el) => {
    setLikedCats(likedCats.filter((item) => item !== el));
    window.localStorage.setItem('likedCats', JSON.stringify(likedCats));
  };

  return (
    <CatsContext.Provider value={{ addLikedCats, likedCats, deleteLikedCats }}>
      {children}
    </CatsContext.Provider>
  );
};
export default CatsContext;
