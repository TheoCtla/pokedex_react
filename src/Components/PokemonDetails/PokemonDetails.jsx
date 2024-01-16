import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const Modal = ({ moves, onClose, open }) => {
   return (
      <Dialog onClose={onClose} open={open} className='modal'>
         <DialogTitle>Mouvements</DialogTitle>
         <DialogContent dividers>
            <List>
               {moves &&
                  moves.map((move, index) => (
                     <ListItem key={index}>{move}</ListItem>
                  ))}
            </List>
         </DialogContent>
      </Dialog>
   );
};

const PokemonDetails = () => {
   const [pokemonDetails, setPokemonDetails] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const { id } = useParams();

   useEffect(() => {
      fetch("https://pokedex-jgabriele.vercel.app/pokemons.json")
         .then((response) => response.json())
         .then((data) => {
            const pokemon = data.find((p) => p.id === parseInt(id));
            setPokemonDetails(pokemon);
         });
   }, [id]);

   if (!pokemonDetails) {
      return (
         <div
            style={{
               backgroundColor: "#252525",
               minHeight: "100vh",
               width: "100vw",
            }}
         >
            Chargement des détails...
         </div>
      );
   }

   return (
      <Box
         style={{
            backgroundColor: "#252525",
            minHeight: "100vh",
            width: "100vw",
         }}
      >
         <Box display='flex' justifyContent='center' m={2}>
            <Card sx={{ maxWidth: 345 }}>
               <CardMedia
                  component='img'
                  height='140'
                  image={pokemonDetails.image}
                  alt={pokemonDetails.names["fr"]}
               />
               <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                     {pokemonDetails.names["fr"]}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                     Taille : {pokemonDetails.height} - Poids :{" "}
                     {pokemonDetails.weight}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                     Types : {pokemonDetails.types.join(", ")}
                  </Typography>
               </CardContent>
               <Button size='small' onClick={() => setShowModal(true)}>
                  Voir les mouvements
               </Button>
            </Card>

            <Modal
               moves={pokemonDetails.moves}
               open={showModal}
               onClose={() => setShowModal(false)}
            />
         </Box>
      </Box>
   );
};

export default PokemonDetails;
