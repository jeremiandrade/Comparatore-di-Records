

import React from "react"
import { Link } from "react-router-dom"

export default function Favorites({ favorites, onToggleFavorite }) {

    // se non ci sono prodotti preferiti
    if (favorites.length === 0) {
        return (
            <div className="container text-center py-5">
                <h3>Nessun preferito salvato</h3>
                <Link to="/">Torna alla Home</Link>
            </div>
        )
    }

    // altrimenti
    return (
        <div>
            <h2>I tuoi Preferiti:  {favorites.length}</h2>

            <div>
                {favorites.map((product) => (
                    <div key={product.id}>
                        <div className="card">
                            <img src={product.imageUrl} alt={product.title} />
                            <h5>{product.title}</h5>
                            <p><strong>Categoria:</strong> {product.category}</p>
                            <p><strong>Prezzo:</strong> {product?.price} €</p>

                            {/* Altre caratteristiche aggiunte semplicemente con <p> */}
                            <p><strong>Marca:</strong> {product?.brand}</p>
                            <p><strong>Schermo:</strong> {product?.screenSize}</p>
                            <p><strong>RAM:</strong> {product?.ram}</p>
                            <p><strong>Memoria:</strong> {product?.storage}</p>
                            <p><strong>Batteria:</strong> {product?.battery}</p>
                            <p><strong>Descrizione:</strong> {product?.description}</p>

                            {/* Pulsante per rimuovere il prodotto */}
                            <button onClick={() => onToggleFavorite(product)}>
                                🗑️ Rimuovi
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}