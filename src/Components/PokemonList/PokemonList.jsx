import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../Common/Header/LanguageSelection/LanguageContext";
import PokemonCard from "./PokemonCard/PokemonCard";
import SearchBar from "./SearchBar/SearchBar";
import "./PokemonList.css";

const FetchPokemonList = () => {
   const { language } = useContext(LanguageContext);
   const [pokemons, setPokemons] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      fetch("https://pokedex-jgabriele.vercel.app/pokemons.json")
         .then((response) => response.json())
         .then((data) => setPokemons(data || []));
   }, []);

   const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.names[language].toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div>
         <SearchBar onSearch={setSearchTerm} />
         <header className='pokemonlist'>
            {filteredPokemons.map((pokemon) => (
               <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.names[language]}
                  image={pokemon.image}
                  types={pokemon.types}
               />
            ))}
         </header>
      </div>
   );
};

export default FetchPokemonList;
