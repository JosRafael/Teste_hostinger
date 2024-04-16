// InfiniteCards.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
import generateRandomCardData from './RandomDataGenerator'; 

const InfiniteCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadMoreCards();
  }, []);

  const loadMoreCards = () => {
    const newCardData = generateRandomCardData();
    setCards([...cards, newCardData]);
  };

  return (
    <div>
      {cards.length > 0 && <Card {...cards[cards.length - 1]} />}
      <button onClick={loadMoreCards}>Carregar mais</button>
    </div>
  );
};

export default InfiniteCards;
