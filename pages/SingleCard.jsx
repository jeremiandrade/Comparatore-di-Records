

import { NavLink } from "react-router-dom";
import { memo } from "react";

//  Niente function solo const + memo
const SingleCard = memo(({ product, isSelected, isFavorite, Comparatore, onToggleFavorite }) => {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <h2 className="card-title">{product.title}</h2>
            <p className="card-text"><strong>{product.category}</strong></p>
            <NavLink to={`/products/${product.id}`}>Vedi Dettagli</NavLink>

            {/* Pulsante comparatore */}
            <button className="btn-blu" onClick={() => Comparatore(product)}>
                {isSelected ? "Rimuovi" : "Confronta"}
            </button>

            {/* Pulsante preferiti */}
            <button className="btn-cuore" onClick={() => onToggleFavorite(product)}>
                {isFavorite ? "❤️" : "🤍"}
            </button>
        </div>
    );
});

//  Esporto la costante in fondo al file
export default SingleCard;