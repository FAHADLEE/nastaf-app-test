import React, { useEffect, useState } from "react";
import "./Cards.css";
import { cardsData } from "./Cards-Data.js";
import Card from "./Card/Card";

const Cards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cardsData();
        setData(result);
      } catch {
      }
    };
    fetchData();
  }, []);

  return (
    <div className="Cards">
      {data.map((card, index) => (
        <div className="parentContainer" key={index}>
          <Card
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={card.value}
            png={card.png}
            series={card.series}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;