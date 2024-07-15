import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

const addSong = async (req, res) => {
  // Add song to the playlist
  try {
    // validate request body
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    // console.log(name, desc, album, imageUpload, audioUpload);
    const duration = `${Math.floor(audioUpload.duration / 60)}: ${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = songModel(songData);
    await song.save();

    res.json({ success: true, message: "Song Added " });
  } catch (error) {
    res.json({ success: false });
  }
};

const listSong = async (req, res) => {
  // List all songs in the playlist

  try {
    
    const allsongs = await songModel.find({});
    res.json({ success: true, songs: allsongs });

  } catch (error) {
    res.json({ success: false });
  }

};

const removeSong = async (req, res) => {
  // Remove song from the playlist
  try {
    // const { id } = req.body;
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song removed" });
  } catch (error) {
    res.json({ success: false });
  }
}

export { addSong, listSong, removeSong };
