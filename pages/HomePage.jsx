
import React, { useState, useEffect, useMemo, useCallback } from "react"
import { NavLink } from "react-router-dom"
import SingleCard from "./SingleCard"

export default function HomePage({ favorites, onToggleFavorite, favoritesCount }) {

    // Stato per memorizzare l'elenco dei prodotti recuperati dal backend fornito
    const [products, setProducts] = useState([])
    // Memorizzo prodotti della ricerca input
    const [change, setChange] = useState('')
    //Memorizzio i prodotti filtrati della Categoria
    const [category, setCategory] = useState('')
    //Memorizzo lo stato dei prodotti in ordine cresc e decres
    const [sortOrder, setSortOrder] = useState("")

    // Uso useEffect per eseguire la chiamata API al caricamento iniziale del componente
    useEffect(() => {
        const api = fetch('http://localhost:3001/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error))
    }, []) // Array vuoto: l'effetto si attiva SOLO una volta all'avvio
    console.log(products);


    // Comparatore di prodotti
    const [compare, setCompare] = useState([])

    const Comparatore = useCallback((product) => {

        //Controllo se il prodotto e già presente(restituisce almeno un prodotto valido)
        const elementoPresente = compare.some((item) => item.id === product.id)

        //Se ce il prodotto lo rimuovo
        if (elementoPresente) {
            setCompare(compare.filter((item) => item.id !== product.id))
        } else if (compare.length < 2) {

            fetch(`http://localhost:3001/products/${product.id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success && data.product) {
                        setCompare((prev) => [...prev, data.product]);// Copia la lista + aggiunge il nuovo
                    }
                })
                .catch((error) => console.error("Errore fetch prodotto:", error));
        } else {
            alert('Confronto max 2 prodotti.');

        }
    }, [compare])



    //uso useMemo per evitare il render del calcolo pesante .filter, category .sort products

    // 1. QUI controlliamo se il singolo prodotto 'p' è dentro 'compare'
    const filterCategorySortProduct = useMemo(() => {
        return products
            //filtro per barra di ricerca
            .filter((p) => p.title.toLowerCase().includes(change.toLowerCase()))
            // filtro per categoria
            .filter((p) => {
                if (category === "") {
                    return true //Mostra tutti i prodotti 
                }
                return p.category === category // Mostra i prodotti filtrati per categoria
                // categoria scelta dall'utente e uguale a categoria selezionata nel menu a tendina
            })
            //ordinamento ordine cre e descre tramite .sort
            .sort((productA, productB) => {
                if (sortOrder === 'Title-cre') {
                    return productA.title.localeCompare(productB.title)
                }
                if (sortOrder === 'Title-decre') {
                    return productB.title.localeCompare(productA.title)
                }
                if (sortOrder === 'category-cre') {
                    return productA.category.localeCompare(productB.category)
                }
                if (sortOrder === 'category-decre') {
                    return productB.category.localeCompare(productA.category)
                }
                return 0 //nessun ordinamento
            })
    }, [products, category, sortOrder, change])






    return (
        <>

            <h1>PROGETTO PRATICO</h1>
            <h3><strong>Comparatore di Records</strong></h3>


            {/* Barra di Ricerca (input) */}

            <input
                type="text"
                placeholder="Cosa stai cercando?"
                value={change}
                onChange={(e) => setChange(e.target.value)}
            />

            {/* Menu a tendina */}
            <div>
                <label><strong>Categoria: </strong></label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Tutte</option>
                    <option value="Smartphone">Smartphone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Smartwatch">Smartwatch</option>
                </select>

            </div>


            {/* Ordina per: */}
            <div>
                <label ><strong>Ordina per: </strong></label>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="">Predefinito</option>
                    <option value="Title-cre">Titolo: A-Z</option>
                    <option value="Title-decre">Titolo: Z-A</option>
                    <option value="category-cre">Categoria: A-Z</option>
                    <option value="category-decre">Categoria:Z-A</option>
                </select>

            </div>

            {/* Card Prodotti */}
            <div className="card-body ">
                {filterCategorySortProduct.map((p) => (
                    <SingleCard
                        key={p.id}
                        product={p}
                        // 1. QUI controlliamo se il singolo prodotto 'p' è dentro 'compare'
                        isSelected={compare.some((item) => item.id === p.id)}
                        // 2. Controlliamo se 'p' è nei preferiti
                        isFavorite={favorites?.some((item) => item.id === p.id)}
                        Comparatore={Comparatore}
                        onToggleFavorite={onToggleFavorite}
                    />
                ))}
            </div>

            {/* TABELLA CON MAP */}
            {compare.length >= 1 && (
                <div>
                    <hr />
                    <h2>Tabella di Confronto</h2>

                    <button className="btn-svuota" onClick={() => setCompare([])}>
                        Svuota Confronto
                    </button>

                    <table>
                        <thead>
                            <tr>
                                <th>Caratteristica</th>
                                <th>{compare[0].title}</th>
                                <th>{compare[1] ? compare[1].title : "Seleziona un 2° prodotto"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {["category", "price", "brand", "screenSize", "ram", "storage", "battery", "description"].map((chiave) => (
                                <tr key={chiave}>
                                    {/* 1. Nome della caratteristica */}
                                    <td><strong>{chiave}</strong></td>

                                    {/* 2. Valore Primo Prodotto */}
                                    <td>{compare[0][chiave] || " "}</td>

                                    {/* 3. Valore Secondo Prodotto */}
                                    <td>{compare[1] ? (compare[1][chiave] || " ") : " "}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}