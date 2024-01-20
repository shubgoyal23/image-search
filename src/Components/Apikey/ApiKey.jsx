import "./Apikey.css";
import { useState, useEffect } from "react";
export default function ApiKey() {
   const [pexelKey, setPexelKey] = useState("");
   const [pixabay, setpixabay] = useState("");
   const [unsplashKey, setUnsplashKey] = useState("");

   function setKeys(e) {
      e.preventDefault();

      let storedKeys = localStorage.getItem("apikeys")
         ? JSON.parse(localStorage.getItem("apikeys"))
         : {};
      storedKeys.pixabay = pixabay;
      storedKeys.unsplash = unsplashKey;
      storedKeys.pexel = pexelKey;
      localStorage.setItem("apikeys", JSON.stringify(storedKeys));
   }

   useEffect(() => {
      let storedKeys = localStorage.getItem("apikeys")
         ? JSON.parse(localStorage.getItem("apikeys"))
         : {};
      setpixabay(storedKeys.pixabay);
      setUnsplashKey(storedKeys.unsplash);
      setPexelKey(storedKeys.pexel);
   }, []);

   return (
      <div className="apiKey">
         <div className="keys">
            <h1>API Keys Required</h1>
            <form action="" onSubmit={setKeys}>
               <input
                  type="text"
                  placeholder="Pixabay API Key"
                  onChange={(e) => setpixabay(e.target.value)}
                  value={pixabay}
               />
               <input
                  type="text"
                  placeholder="Unsplash API Key"
                  onChange={(e) => setUnsplashKey(e.target.value)}
                  value={unsplashKey}
               />
               <input
                  type="text"
                  placeholder="Pexels API Key"
                  onChange={(e) => setPexelKey(e.target.value)}
                  value={pexelKey}
               />
               <input type="Submit" id="btn-api" placeholder="Submit" />
            </form>
            <p>
               Please Enter Atlest One API Key to continue To use this App. You
               can Find Keys here{" "}
               <a href="https://pixabay.com/service/about/api/" target="_blank">
                  Pixabay
               </a>
               ,{" "}
               <a href="https://www.pexels.com/api/" target="_blank">
                  Pexels
               </a>
               ,{" "}
               <a href="https://unsplash.com/developers" target="_blank">
                  Unsplash
               </a>
               . Don't worry we don't keep your key with us its stored in your
               computer only.
            </p>
         </div>
      </div>
   );
}
