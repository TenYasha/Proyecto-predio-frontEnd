import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Rol } from 'src/app/models/rol/rol';
import { Usuario } from 'src/app/models/user/usuario';
import { SignUpService } from 'src/app/services/Sign-up/sign-up.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})


export class UsuarioEditComponent implements OnInit {

  roles: Rol[] = [];
  formUser: FormGroup;
  usuario: Usuario = new Usuario()

  constructor(private formb: FormBuilder, private signUp: SignUpService,
    private serUsuario: UsuarioService, route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.id_usuario = params['idUser']
    });

    this.formUser = this.formb.group({
      'id_usuario': [0],
      'nombre': ["", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
      'apellido': ["", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
      'username': ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      'password': ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      'roles': ["", []]
    });
  }


  ngOnInit(): void {
    this.BuscarUsuario();
    this.getListUsuarios();
    this.signUp.obtenerCargos().subscribe(roles => { this.roles = roles })

  }
  listUsuario: Usuario[] = [];

  getListUsuarios() {
    this.serUsuario.listUsuarios().subscribe({
      next: (data) => {
        this.listUsuario = data;
      }, error(error) {
        console.log(error);
      }
    })
  }

  updateUsuario() {
    this.assignFormValuesToUsuario();
    this.serUsuario.Update(this.usuario).subscribe({
      next: (data) => {
        Swal.fire('Mensaje', 'Exito al Actualizar usuario', 'success');
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Error', 'Hubo un problema al actualizar el usuario', 'error');
      }
    });
  }



  id_usuario: number = 0;

  BuscarUsuario() {
    this.serUsuario.FindByIDUsuario(this.id_usuario).subscribe((data) => {
      this.usuario = data;
      this.assignUsuarioValuesToForm();
    });
  }

  assignUsuarioValuesToForm() {
    this.formUser.get('id_usuario')?.setValue(this.usuario.id_usuario || null);
    this.formUser.get('nombre')?.setValue(this.usuario.nombre || null);
    this.formUser.get('apellido')?.setValue(this.usuario.apellido || null);
    this.formUser.get('username')?.setValue(this.usuario.username || null);
    this.formUser.get('password')?.setValue(this.usuario.password || null);
    this.formUser.get('roles')?.setValue(this.usuario.roles || null);

  }

  assignFormValuesToUsuario() {

    const formulario = this.formUser;
    this.usuario.id_usuario = formulario.get('id_usuario')?.value || undefined;
    this.usuario.nombre = formulario.get('nombre')?.value || undefined;
    this.usuario.apellido = formulario.get('apellido')?.value || undefined;
    this.usuario.username = formulario.get('username')?.value || undefined;
    this.usuario.password = formulario.get('password')?.value || undefined;
    this.usuario.roles = formulario.get('roles')?.value || undefined;
  }
}   
