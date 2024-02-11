import { Authority } from "../authority/authority";
import { Rol } from "../rol/rol";

export class Usuario {

    id_usuario?: number ;
    nombre?: string;
    apellido?: string;
    username?: string;
    password?: string;
    enabled?: boolean;
    roles?: Rol[];
    authorities?: Authority[];
    accountNonExpired?: boolean;
    credentialsNonExpired?: boolean;
    accountNonLocked?: boolean;

    [key: string]: any;


}
