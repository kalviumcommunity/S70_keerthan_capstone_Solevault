import React from "react";
import SneakerCard from "./SneakerCard";

// Mock data for the collection grid
const collectionData = [
  {
    id: "1",
    name: "Air Jordan 1 High OG",
    brand: "Nike",
    model: "Chicago",
    releaseDate: "Oct 2022",
    retailPrice: 180,
    marketValue: 450,
    changePercentage: 4.2,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Yeezy Boost 350 V2",
    brand: "Adidas",
    model: "Zebra",
    releaseDate: "Apr 2020",
    retailPrice: 220,
    marketValue: 320,
    changePercentage: -2.3,
    image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    name: "Dunk Low",
    brand: "Nike",
    model: "Panda",
    releaseDate: "Jan 2021",
    retailPrice: 110,
    marketValue: 155,
    changePercentage: 1.8,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    name: "Air Max 90",
    brand: "Nike",
    model: "Infrared",
    releaseDate: "Mar 2020",
    retailPrice: 140,
    marketValue: 170,
    changePercentage: 0.5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    name: "Foam Runner",
    brand: "Yeezy",
    model: "Onyx",
    releaseDate: "Jun 2022",
    retailPrice: 90,
    marketValue: 140,
    changePercentage: 3.7,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    name: "New Balance 550",
    brand: "New Balance",
    model: "White Green",
    releaseDate: "Sep 2021",
    retailPrice: 120,
    marketValue: 180,
    changePercentage: 2.9,
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80",
  },
];

const CollectionGrid = ({ className }) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collectionData.map((sneaker) => (
          <SneakerCard
            key={sneaker.id}
            name={sneaker.name}
            brand={sneaker.brand}
            model={sneaker.model}
            releaseDate={sneaker.releaseDate}
            retailPrice={sneaker.retailPrice}
            marketValue={sneaker.marketValue}
            changePercentage={sneaker.changePercentage}
            image={sneaker.image}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionGrid;

