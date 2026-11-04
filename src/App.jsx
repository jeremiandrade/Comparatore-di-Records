
import React, { useState, useEffect, } from "react"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import HomePage from "../pages/HomePage"
import CardList from "../pages/CardList"
import Favorites from "../pages/Favorites"

export default function App() {

  // Parte inizialmente come un array vuoto []
  const [favorites, setFavorites] = useState(() => {
    const salvati = localStorage.getItem("preferiti") //-> getItem legge il dato.
    return salvati ? JSON.parse(salvati) : []
    //Se la chiave esiste, usa JSON.parse per convertire il testo da Stringa in Array 

  })


  // Viene eseguito UNA SOLA VOLTA quando apri la pagina 
  // useEffect(() => {
  //   // Legge la stringa salvata nella chiave "preferiti"
  //   const salvati = localStorage.getItem("preferiti") //-> getItem legge il dato.

  //   // Se la chiave esiste, usa JSON.parse per convertire il testo da Stringa in Array 
  //   if (salvati) {
  //     setFavorites(JSON.parse(salvati))
  //   }
  // }, []) // <- [] = Esegui solo all'avvio della pagina


  // Si attiva OGNI VOLTA che 'favorites' cambia
  useEffect(() => {
    // Trasforma l'array in stringa di testo e lo salva nel localStorage
    localStorage.setItem("preferiti", JSON.stringify(favorites)) //-> setItem salva il dato.
  }, [favorites]) // <- [favorites] = Esegui ogni volta che 'favorites' viene modificato


  // Aggiungi / Rimuovi Preferito
  const toggleFavorite = (product) => {
    // Controlla con .some se il prodotto ha già il "like"
    const esiste = favorites.some((item) => Number(item.id) === Number(product.id))

    if (esiste) {
      // Se c'è già, lo rimuove dall'array
      setFavorites(favorites.filter((item) => Number(item.id) !== Number(product.id)))
    } else {
      // Se il prodotto non ha tutte le info (manca la foto o il prezzo), 
      // facciamo una fetch per scaricare il prodotto completo prima di salvarlo
      if (!product.imageUrl) {
        fetch(`http://localhost:3001/products/${product.id}`)
          .then((res) => res.json())
          .then((data) => {
            // Prendiamo i dati completi e li aggiungiamo ai preferiti
            const prodottoCompleto = data.product || data
            setFavorites([...favorites, prodottoCompleto])
          })
          .catch((err) => console.log(err))
      } else {
        // Se il prodotto ha già tutte le informazioni, lo aggiunge subito
        setFavorites([...favorites, product])
      }
    }
  }

  return (
    <BrowserRouter>
      {/* BARRA DI NAVIGAZIONE */}
      <nav>

        <div>
          <NavLink to="/">
            🏠 Home
          </NavLink>

          <NavLink to="/favorites">
            ❤️ Preferiti ({favorites.length})
          </NavLink>
        </div>
      </nav>
      <Routes>

        <Route
          path="/"
          element={<HomePage favorites={favorites} onToggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/products/:id"
          element={<CardList favorites={favorites} onToggleFavorite={toggleFavorite} />}
        />
        <Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />} />
      </Routes>
    </BrowserRouter>
  )
}