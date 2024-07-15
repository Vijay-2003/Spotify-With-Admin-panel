import React from "react";
import Navbar from "./Navbar";
// import { albumsData } from "../assets/frontend-assets/assets";
import Albumitem from "./Albumitem";
// import { songsData } from "../assets/frontend-assets/assets";
import Songitem from "./Songitem";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {

  const {songsData, albumsData} = useContext(PlayerContext);

  return (
    <>
      <Navbar />
      <div className=" mb-4">
        <h1 className=" my-5 font-bold text-2xl">Featured Charts</h1>
        <div className=" flex overflow-auto">
          {albumsData.map((item, index) => (
            <Albumitem
              key={index}
              image={item.image}
              desc={item.desc}
              id={item._id}
              name={item.name}
            />
          ))}
        </div>
      </div>
      
      <div className=" mb-4">
        <h1 className=" my-5 font-bold text-2xl">Today's Biggest Hits</h1>
        <div className=" flex overflow-auto">
          {songsData.map((item, index) => (
            <Songitem
              key={index}
              image={item.image}
              desc={item.desc}
              id={item._id}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
