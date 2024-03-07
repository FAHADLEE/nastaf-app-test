import React from "react";
import "./MainDash.css";
import RightSide from "./RightSide/RightSide";
import Cards from "./Cards/Cards";
import Table from "./Table/Table";
const MainDash = () => {
  return (
    <>
      <div className="MainDash">
        <Cards />
        <Table />
      </div>
      <RightSide />
    </>
  );
};

export default MainDash;
