import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user/usuario';
import { SignInService } from 'src/app/services/Sign-in/sign-in.service';

@Component({
  selector: 'app-page-main-admin',
  templateUrl: './page-main-admin.component.html',
  styleUrls: ['./page-main-admin.component.css']
})
export class PageMainAdminComponent implements OnInit{

  rol: string = "";
  username?: string = "";

  constructor(private role:SignInService){}

  ngOnInit(): void {
    this.rol = this.role.getUserRole();
    this.role.getCurrentUser().subscribe({
    next:(data:Usuario)=>{
      this.username= data.username;
    },error:(error)=>{
      alert("ocurrio un error");
    }

  })
 }
 

}
