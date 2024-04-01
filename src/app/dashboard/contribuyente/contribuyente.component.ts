import { Component, OnInit } from '@angular/core';
import { Contribuyente } from 'src/app/models/contribuyente/contribuyente';
import Swal from 'sweetalert2';
import { ContribuyenteService } from 'src/app/services/contribuyente/contribuyente.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contribuyente',
  templateUrl: './contribuyente.component.html',
  styleUrls: ['./contribuyente.component.css'],
})
export class ContribuyenteComponent implements OnInit {
  // Contribuyente variables
  listContribuyente: Contribuyente[] = [];

  public page!: number;
  contribuyenteModel: Contribuyente = new Contribuyente();
  search: string = '';
  filter: Contribuyente[] = [];
  sortColumn: string = '';
  sortDirection: string = 'asc';

  //contructor
  constructor(
    private serContribuyente: ContribuyenteService,
    private router: Router
  ) {}


  //funciones de listado
  getListContribuyente(){
    this.serContribuyente.listContribuyente().subscribe({
      next: (data) =>{
        this.listContribuyente = data;
        this.filter = data;

        this.applySorting();
      }, error(error){
        console.log(error);
      }
    })
  }

  //metodo que se ejecutaran al inicio
  ngOnInit(): void {
    this.getListContribuyente();
  }

  //metodos de orden

  searchList() {
    this.filter = this.listContribuyente.filter(
      (a) =>
          a.nom_contribuyente?.toLowerCase().includes(this.search.toLowerCase()) ||
          a.ape_contribuyente?.toLowerCase().includes(this.search.toLowerCase()) ||
          (typeof a.dni === 'number' && a.dni.toString().includes(this.search))

  
          );
  this.applySorting();
  //ordenamiento de la tabla
}

  applySorting() {
    if (this.sortColumn) {
      this.listContribuyente.sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return this.sortDirection === 'asc'
            ? aValue - bValue
            : bValue - aValue;
        }
      });
    }
  }


}
