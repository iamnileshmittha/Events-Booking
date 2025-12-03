// import React from "react";

// function DestinationCard({ img, name }) {
//   return (
//     <div className="card">
//      <a href=''>
//      <img src={img} alt={name} />
//      <p>{name}</p>
//      </a>
//     </div>
//   );
// }

// export default DestinationCard;

import React from "react";
import { Link } from "react-router-dom";

function DestinationCard({ img, name, id }) {
  return (
    <div className="card">
      <Link to={`/destination/${id}`}>
        <img src={img} alt={name} />
        <p>{name}</p>
      </Link>
    </div>
  );
}

export default DestinationCard;
