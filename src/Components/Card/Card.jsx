import {  Link, NavLink } from "react-router-dom"
import "./Card.css";

export default function Card({data}) {
   return (
      <div className="image-div">
         <div className="image">
            <Link
              to={data.imageLink}
               target="_blank"
               download=""
            >
               <img
                  src={data.imageSrc}
                  alt={data.imageAltTag}
               />
            </Link>
         </div>
         <div className="tittle">
            <p>
               <Link
                 to={data.pageUrl}
                  target="_blank"
               >
                  {data.description}
               </Link>
            </p>
            <p>
               <span className="image-by">By</span>{" "}
               <Link
                 to={data.authorUrl}
                  target="_blank"
               >
                  {data.AutherName}
               </Link>
            </p>
         </div>
      </div>
   );
}
