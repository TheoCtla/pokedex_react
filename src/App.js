import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from "./Components/Common/Header/Header";
import PokemonList from "./Components/PokemonList/PokemonList";
import PokemonDetails from './Components/PokemonDetails/PokemonDetails'; // Assurez-vous de créer ce composant
import { LanguageProvider } from "./Components/Common/Header/LanguageSelection/LanguageContext";

function App() {
   return (
      <LanguageProvider>
         <Router>
            <div className='App'>
               <Header />
               <Routes>
                  <Route path="/" element={<PokemonList />} />
                  <Route path="/pokemon/:id" element={<PokemonDetails />} />
               </Routes>
            </div>
         </Router>
      </LanguageProvider>
   );
}

export default App;
