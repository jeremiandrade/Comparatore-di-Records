export type Product = {
    id: number | string; //Obbligatorio
    title: string; //Obbligatorio
    category: string; //Obbligatorio
    price?: number;
    brand?: string;
    screenSize?: string;
    ram?: string;
    storage?: string;
    battery?: string;
    imageUrl?: string;
    description?: string;
};