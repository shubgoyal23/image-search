import { useState, useCallback, useEffect } from "react";
import { Card } from "/src/Components/index";
import "./Home.css";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
   const [search, setSearch] = useState("nature");
   const [checked, setChecked] = useState({
      pixabay: true,
      pexels: true,
      unsplash: true,
   });

   const [prevSearch, setPrevSearch] = useState("nature");
   const [page, setPAge] = useState(1);
   const [imagesFinalData, setImagesFinalData] = useState([]);

   const searchImages = useCallback(() => {
      let ApiKeys = JSON.parse(localStorage.getItem("apikeys"));

      if (checked.pixabay && ApiKeys.pixabay) {
         let url = `https://pixabay.com/api/?key=${ApiKeys.pixabay}&q=${search}&page=${page}&per_page=30`;
         fetch(url)
            .then((Response) => Response.json())
            .then((items) => dataHandler(items, "pixabay"))
            .catch((error) => errorHandler(error, "pixabay"));
      }
      if (checked.pexels && ApiKeys.pexel) {
         let url = `https://api.pexels.com/v1/search?query=${search}&page=${page}&per_page=15`;
         fetch(url, { headers: { Authorization: ApiKeys.pexel } })
            .then((r) => r.json())
            .then((items) => dataHandler(items, "pexel"))
            .catch((error) => errorHandler(error, "pexels"));
      }
      if (checked.unsplash && ApiKeys.unsplash) {
         let url = `https://api.unsplash.com/search/photos?client_id=${ApiKeys.unsplash}&page=${page}&query=${search}&per_page=15`;
         fetch(url)
            .then((r) => r.json())
            .then((items) => dataHandler(items, "unsplash"))
            .catch((error) => errorHandler(error, "unsplash"));
      }
   }, [prevSearch, page]);

   useEffect(() => {
      searchImages();
   }, [prevSearch, page]);

   function dataHandler(data, name) {
      if (name === "pixabay") {
         let finalData = data.hits.map((photo) => {
            let imageData = {};
            imageData.id = photo.id;

            imageData.imageLink = photo.largeImageURL;
            imageData.imageSrc = photo.webformatURL;
            imageData.imageAltTag = photo.tags;

            imageData.pageUrl = photo.pageURL;
            imageData.description = photo.tags;

            imageData.authorUrl = `https://pixabay.com/users/${photo.user}-${photo.user_id}`;
            imageData.AutherName = photo.user;

            return imageData;
         });
         setImagesFinalData((predata) => [...predata, ...finalData]);
      }
      if (name === "pexel") {
         let finalData = data.photos.map((photo) => {
            let imageData = {};
            imageData.id = photo.id;

            imageData.imageLink = photo.src.large;
            imageData.imageSrc = photo.src.large;
            imageData.imageAltTag = photo.alt;

            imageData.pageUrl = photo.url;
            imageData.description = photo.alt;

            imageData.authorUrl = photo.photographer_url;
            imageData.AutherName = photo.photographer;

            return imageData;
         });
         setImagesFinalData((predata) => [...predata, ...finalData]);
      }
      if (name === "unsplash") {
         let finalData = data.results.map((photo) => {
            let imageData = {};
            imageData.id = photo.id;

            imageData.imageLink = photo.urls.full;
            imageData.imageSrc = photo.urls.regular;
            imageData.imageAltTag = photo.alt_description;

            imageData.pageUrl = photo.links.html;
            imageData.description = photo.description;

            imageData.authorUrl = `https://unsplash.com/@${photo.user.username}`;
            imageData.AutherName = photo.user.name;

            return imageData;
         });
         setImagesFinalData((predata) => [...predata, ...finalData]);
      }
   }

   function errorHandler(error, name) {
      console.error(name, error);
   }

   function FormHaldler(e) {
      e.preventDefault();
      if (prevSearch != search) {
         setPrevSearch(search);
         setPAge(1);
         setImagesFinalData([]);
      } else {
         setPAge(page + 1);
      }
   }

   function searchHandler(e) {
      setSearch(e.target.value);
   }
   return (
      <div className="main-div-image">
         <h1>All In One Stock Image Search</h1>
         <div className="search">
            <form action="" onSubmit={FormHaldler}>
               <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => searchHandler(e)}
               />
               <button>Search</button>
            </form>
            <div className="check-input">
               <div className="input-box">
                  <input
                     type="checkbox"
                     id="pixabay"
                     checked={checked.pixabay}
                     onChange={() => {
                        let c = checked.pixabay;
                        setChecked({ ...checked, pixabay: !c });
                     }}
                  />
                  <label htmlFor="pixabay">pixabay</label>
               </div>
               <div className="input-box">
                  <input
                     type="checkbox"
                     id="pexels"
                     checked={checked.pexels}
                     onChange={() => {
                        let c = checked.pexels;
                        setChecked({ ...checked, pexels: !c });
                     }}
                  />
                  <label htmlFor="pexels">pexels</label>
               </div>
               <div className="input-box">
                  <input
                     type="checkbox"
                     id="unsplash"
                     checked={checked.unsplash}
                     onChange={() => {
                        let c = checked.unsplash;
                        setChecked({ ...checked, unsplash: !c });
                     }}
                  />
                  <label htmlFor="unsplash">unsplash</label>
               </div>
            </div>
         </div>
         <div className="images-container">
            {imagesFinalData.map((photo) => (
               <Card key={uuidv4()} data={photo} />
            ))}
         </div>
         <div className="searh-more">
            <button
               onClick={() => setPAge(page + 1)}
            >
               <i className="fa-solid fa-chevron-down"></i>
            </button>
         </div>
      </div>
   );
}
