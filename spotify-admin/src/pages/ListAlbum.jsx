import React, { useEffect, useState } from "react";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      // console.log(response);
      if (response.data.success) {
        setData(response.data.albums);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const removealbum = async (id) => {

    try {
        const response = await axios.post(`${url}/api/album/remove`, {id});
        if(response.data.success){
          toast.success("Album Deleted Successfully");
          await fetchData();
        }
    } catch (error) {
      toast.error("Error Deleting Album")
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div className=" sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Album Colour</b>
        <b>Action</b>
      </div>
       {data.map((item, index) => (
        <div
          key={index}
          className=" grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
        >
          <img src={item.image} alt="" className=" w-12" />
          <p>{item.name}</p>
          <p>{item.desc}</p>
          <input type="color" value={item.bgColour} />
          <p className=" cursor-pointer" onClick={() => removealbum(item._id)}>
            <Icon icon="ic:sharp-delete" width="26" height="26"  style={{color: "#e30202"}} />
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListAlbum;
