import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto/producto';
import { Usuario } from 'src/app/models/user/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-crud',
  templateUrl: './usuario-crud.component.html',
  styleUrls: ['./usuario-crud.component.css']
})
export class UsuarioCrudComponent implements OnInit {

  public page!: number;
  //lista de usuario
  listUsuario: Usuario[] = [];
  usuarioModel: Usuario = new Usuario();
  search: string = '';

  filter: Usuario[] = [];

  //variables para el ordenamiento de datos
  sortColumn: string = '';
  sortDirection: string = 'asc';

  constructor(private serUsuario: UsuarioService, private router: Router) { }


  searchList() {
    this.filter = this.listUsuario.filter((a) =>
      (a.nombre?.toLowerCase().includes(this.search.toLowerCase()) ||
        a.apellido?.toLowerCase().includes(this.search.toLowerCase()) ||
        a.username?.toLowerCase().includes(this.search.toLowerCase())) ||
      (a.roles?.some(role => role.nombre?.toLowerCase().includes(this.search.toLowerCase())) ||
        a.enabled?.toString().toLowerCase().includes(this.search.toLowerCase()))
    );
    this.applySorting();
    //ordenamiento de la tabla

  }

  ngOnInit(): void {
    this.getListUsuarios();
  }


  transformarRoles(usuarios: Usuario[]): Usuario[] {
    return usuarios.map(usuario => {
      const rolesNombres = usuario.roles?.map(rol => rol.nombre);
      return { ...usuario, rolesNombres };
    });
  }
  applySorting() {
    if (this.sortColumn) {
      this.listUsuario.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        } else {
          return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
      });
    }
  }

  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
    }

    this.sortColumn = column;
    this.applySorting();
  }

  getListUsuarios() {
    this.serUsuario.listUsuarios().subscribe({
      next: (data) => {
        this.listUsuario = data;
        this.filter = data;

        this.applySorting();
      }, error(error) {
        console.log(error);
      }
    })
  }
  update(user: Usuario) {
    this.serUsuario.UpdateEstado(user).subscribe({
      next: (data: any) => {
        Swal.fire('Mensaje', 'Exito al Actualizar Estado', 'success');
        this.getListUsuarios();
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
      }
    });
  }


  toggleEstado(data: Usuario) {
    this.usuarioModel.id_usuario = data.id_usuario;
    this.usuarioModel.nombre = data.nombre;
    this.usuarioModel.apellido = data.apellido;
    this.usuarioModel.username = data.username;
    this.usuarioModel.password = data.password;
    this.usuarioModel.roles = data.roles;
    this.usuarioModel.enabled = data.enabled;
    this.update(this.usuarioModel);
  }

  redirigirAFormularioDeEdicion(data: Usuario) {
    // Redirige a la ruta correspondiente al formulario de edición pasando el ID del usuario
    this.router.navigate(['/dashboard/editarUsuario/' + data.id_usuario]);
  }

  DeleteByID(id: number | undefined): void {
    if (id !== undefined) {
      this.serUsuario.DeleteByID(id).subscribe({
        next: (data: any) => {
          Swal.fire('Se borro correctamente', data, 'success');
          this.getListUsuarios();  // Recarga la lista después de eliminar
        },
        error: (error) => {
          console.error('Error al intentar eliminar:', error);
          let errorMessage = 'Hubo un problema al borrar el usuario';
          if (error && error.error && error.error.message) {
            errorMessage += `: ${error.error.message}`;
          }
          Swal.fire('Error', errorMessage, 'error');
        }
      });
    } else {
      console.error('ID de usuario es undefined');
    }
  }


}









