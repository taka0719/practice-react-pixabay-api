import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import ImageList from "./components/ImageList";
import logo from './pixabay_logo.png'

const App = () => {
  const [images, setImages] = useState([]);
  const onSearchSubmit = async (term) => {
    try {
      const API_KEY = process.env.REACT_APP_PIXABAY_API_KEY;
      const params = {
        key: API_KEY,
        q: term,
      };
      const response = await axios.get("https://pixabay.com/api/", { params });
      setImages(response.data.hits)
      if(response.data.total===0){
        window.alert("お探しの画像はありませんでした")
      }
    } catch {
      window.alert('写真の取得に失敗しました。')
    }
  };
  return (
    <div className="ui container" style={{ marginTop: "20px" }}>
      <img src={logo} alt='pixabay-logo' className='pixabay-logo' />
      <SearchBar onSubmit={onSearchSubmit} />
      <ImageList images={images}/>
    </div>
  );
};

export default App;
