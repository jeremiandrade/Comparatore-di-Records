import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

export default function CardList({ favorites, onToggleFavorite }) {
    // Recupera l'ID dall'URL
    const { id } = useParams()
    const url_id = `http://localhost:3001/products/${id}`

    const [element, setElement] = useState({})

    useEffect(() => {
        fetch(url_id)
            .then(res => res.json())
            .then(data =>
                setElement(data.product || data))



            .catch(err => console.log(err))
    }, [id]) // [id]: riesegue la chiamata se cambia il prodotto nell'URL
    //  IL MOTIVO DI DATA.PRODUCT || DATA:
    // Il nostro backend locale impacchetta il prodotto dentro l'oggetto "product" ({ success: true, product: {...} }).
    // Quindi prendiamo "data.product" per salvare nello stato direttamente i dati del prodotto (titolo, prezzo, ecc.).
    // Se un giorno cambi API (es. FakeStore) che manda direttamente i dati senza il contenitore "product", 
    // l'operatore "|| data" farà da paracadute usando semplicemente "data".

    // data.product: Estraggo il prodotto vero e proprio dalla scatola contenitore del mio server.

    // || data: Se l'API non ha quella scatola ma mi dà subito il prodotto (come FakeStore), prendo data direttamente.





    // Usiamo .some() per vedere se questo specifico prodotto è nell'array favorites

    const isFav = favorites.some((item) => item?.id === element.id)
    return (



        <div style={{ padding: "20px" }}>

            <Link to="/">Torna indietro</Link>

            <div className="card" style={{ maxWidth: "400px", marginTop: "15px", padding: "15px" }}>
                {/* L'uso di ?. evita errori se i dati stanno ancora caricando */}

                <img
                    src={element?.imageUrl ||
                        element?.image ||
                        element?.img}
                    alt={element?.title}
                />
                <div className="card-body">
                    <h5 className="card-title">{element?.title}</h5>
                    <p className="card-text"><strong>Categoria:</strong> {element?.category}</p>
                    <p><strong>Prezzo:</strong> €{element?.price}</p>
                    <p><strong>Marca:</strong> {element?.brand}</p>
                    <p><strong>Schermo:</strong> {element?.screenSize}</p>
                    <p><strong>RAM:</strong> {element?.ram}</p>
                    <p><strong>Memoria:</strong> {element?.storage}</p>
                    <p><strong>Batteria:</strong> {element?.battery}</p>
                    <p><strong>Descrizione:</strong> {element?.description}</p>

                    {/* 2. PULSANTE CON TOGGLE E ICONA DINAMICA */}
                    <button
                        onClick={() => onToggleFavorite(element)}
                    >
                        {isFav ? "❤️ Rimuovi dai Preferiti" : "🤍 Aggiungi ai Preferiti"}
                    </button>

                </div>
            </div>
        </div>
    )
}

