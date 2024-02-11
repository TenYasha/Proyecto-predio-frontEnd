import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Rol } from 'src/app/models/rol/rol';
import { Usuario } from 'src/app/models/user/usuario';
import { SignUpService } from 'src/app/services/Sign-up/sign-up.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  roles?: Rol[];
  usuario: Usuario = new Usuario()

  constructor(private formb: FormBuilder, private signUp: SignUpService) { }

  ngOnInit(): void {
    this.signUp.obtenerCargos().subscribe(roles => { this.roles = roles })
  }

  formUser = this.formb.group({
    'nombre': ["", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
    'apellido': ["", [Validators.required, Validators.pattern('[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\\s]{5,30}')]],
    'username': ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    'password': ["", [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    'roles': ["", [Validators.required]],
  });
  addUser() {
    console.log(this.usuario)
    this.signUp.addUser(this.formUser.value).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente:', response);

        // Reset the form
        this.formUser.reset();

        // Show success message using SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado',
          text: 'El usuario ha sido registrado exitosamente.',
          confirmButtonText: 'Aceptar'
        });
      },
      (error) => {
        console.error('Error al registrar usuario:', error);

        // Imprimir detalles específicos del error en la consola
        if (error.error instanceof ErrorEvent) {
          console.error('Error del lado del cliente:', error.error.message);
        } else {
          console.error(`Código de error ${error.status}:`, error.error);
        }
      }
    );
  }
}
