import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol/rol';
import { Usuario } from 'src/app/models/user/usuario';
import { SignInService } from 'src/app/services/Sign-in/sign-in.service';
import { SignUpService } from 'src/app/services/Sign-up/sign-up.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  rol:string = "";
  username?:string="";

  constructor(private signOut:SignInService,private role:SignInService,private router: Router){
  }

  ngOnInit(): void {
    this.rol = this.signOut.getUserRole();
    this.role.getCurrentUser().subscribe({
    next:(data:Usuario)=>{
      this.username = data.username;
    },error:(error)=>{
      alert("ocurrio un error " + error);
    }

  })
 }

  logout(){
    this.signOut.logout()
    this.router.navigate(['/login']);
  }

  agrega(){
    this.router.navigate(['dashboard/registro']);
  }
}
