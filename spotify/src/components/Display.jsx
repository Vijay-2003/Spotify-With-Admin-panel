import React, { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import Displayalbum from "./Displayalbum";
// import { albumsData } from '../assets/frontend-assets/assets'
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);

  const displayref = useRef();
  const location = useLocation();
  // console.log(location);
  const isalbum = location.pathname.includes("album");
  // console.log(isalbum);
  // const albumId = isalbum ? location.pathname.slice(-1) : "";
  const albumId = isalbum ? location.pathname.split("/").pop() : "";
  // console.log(albumId);
  // const bgColor = albumsData[Number(albumId)].bgColor;
  const bgColor =
    isalbum && albumsData.length > 0
      ? albumsData.find((x) => x._id == albumId).bgColour
      : "#121212";
  // console.log(bgColor);

  useEffect(() => {
    if (isalbum) {
      displayref.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else {
      displayref.current.style.background = "#121212";
    }
  });

  return (
    <div
      ref={displayref}
      className=" w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <Displayalbum album={albumsData.find((x) => x._id == albumId)} />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
};

export default Display;
