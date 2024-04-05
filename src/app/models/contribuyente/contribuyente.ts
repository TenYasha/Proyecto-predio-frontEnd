import { TipoContribuyente } from "../tipo-contribuyente/tipo-contribuyente";

export class Contribuyente {

    id_contribuyente?: number;
    dni?: number;
    nom_contribuyente?: string;
    ape_contribuyente?: string;
    tipo_contribuyente?: TipoContribuyente;

    [key: string]: any;
}
