import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../App";
import { Icon } from "@iconify/react";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchsongs = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      // console.log(response.data)
      if (response.data.success) {
        setData(response.data.songs);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const removesong = async (id) => {
    try {
      const response = await axios.post(`${url}/api/song/remove`, {
        id
      });

      if (response.data.success) {
        toast.success("Song deleted successfully");
        await fetchsongs();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchsongs();
  }, []);

  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div className=" sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Album</b>
        <b>Duration</b>
        <b>Action</b>
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className=" grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
        >
          <img src={item.image} alt="" className=" w-12" />
          <p>{item.name}</p>
          <p>{item.album}</p>
          <p>{item.duration}</p>
          <p className=" cursor-pointer" onClick={() => removesong(item._id)}>
            <Icon icon="ic:sharp-delete" width="26" height="26"  style={{color: "#e30202"}} />
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListSong;
