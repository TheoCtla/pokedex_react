import React from "react";
import { Link } from 'react-router-dom';
import "./PokemonCard.css";

const PokemonCard = ({ name, id, image, types }) => {

  const linkStyle = {
    textDecoration: "none",
  }

  const addZeroToId = id => `No.${id.toString().padStart(3, "0")}`;

  return (
    <Link to={`/pokemon/${id}`} style={linkStyle} className="pokemon-card-link">
      <div className='pokemon-card'>
        <span className='id'>{addZeroToId(id)}</span>
        <div className='pokemon-info'>
          <span>{name}</span>
          <img className='pokemon-card-image' src={image} alt={name} />
          <div className='type'>
            {types.map((type) => (
              <span key={id + type} className={`pokemon-type ${type}`}>{type}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
