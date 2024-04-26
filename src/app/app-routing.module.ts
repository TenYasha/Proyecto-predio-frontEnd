import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './dashboard/auth/auth.component';
import { RegisterUserComponent } from './dashboard/register-user/register-user.component';
import { MainPageComponent } from './dashboard/main-page/main-page.component';
import { PageMainAdminComponent } from './dashboard/page-main-admin/page-main-admin.component';
import { EmpleadoCrudComponent } from './dashboard/empleado-crud/empleado-crud.component';
import { UsuarioCrudComponent } from './dashboard/usuario-crud/usuario-crud.component';
import { RoleAdminGuard } from './guard/role-admin.guard';
import { IsLoggedGuard } from './guard/is-logged.guard';
import { ProductoCrudComponent } from './dashboard/producto-crud/producto-crud.component';
import { ProductoAddComponent } from './dashboard/producto-crud/producto-add/producto-add.component';
import { ProductoUpdateComponent } from './dashboard/producto-crud/producto-update/producto-update.component';
import { UsuarioEditComponent } from './dashboard/usuario-crud/usuario-edit/usuario-edit.component';
import { ContribuyenteComponent } from './dashboard/contribuyente/contribuyente.component';
import { FichaCatastralIndividualComponent } from './dashboard/ficha-catastral-individual/ficha-catastral-individual.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: MainPageComponent,
    canActivate: [],
    children: [
      { path: '', component: PageMainAdminComponent },
      {
        path: 'contribuyente',
        component: ContribuyenteComponent,
        canActivate: [RoleAdminGuard],
      },
      {
        path: 'usuario',
        component: UsuarioCrudComponent,
        canActivate: [],
      },

      {
        path: 'producto-list',
        component: ProductoCrudComponent,
        canActivate: [RoleAdminGuard],
      },
      {
        path: 'producto-add',
        component: ProductoAddComponent,
        canActivate: [RoleAdminGuard],
      },

      { path: 'registro', component: RegisterUserComponent, canActivate: [] },

      {
        path: 'producto-update/:idProd',
        component: ProductoUpdateComponent,
        canActivate: [RoleAdminGuard],
      },

      {
        path: 'editarUsuario/:idUser',
        component: UsuarioEditComponent,
        canActivate: [RoleAdminGuard],
      },
      { path: 'ficha-1', component: FichaCatastralIndividualComponent },
    ],
  },
  { path: 'login', component: AuthComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
