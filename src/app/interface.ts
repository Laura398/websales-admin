export interface User {
    _id: number;
    lastName: string;
    firstName: string;
    email: string;
}

export interface Product {
    _id: number;
    name: string;
    price: number;
    description: string;
    date_fin_enchere: Date;
    date_debut_enchere: Date;
}