import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../Interfaces/categoria';
import { Servicio } from '../Interfaces/servicio';
import { CategoriasService } from '../Services/categorias.service';
import { ServiciosService } from '../Services/servicios.service';

type ControlCategoria = FormGroup<{
  nombre: FormControl<string | null>,
  servicios: FormArray<FormControl<string | null>>
  descripcion: FormControl<string | null>
}>

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit {

  categoriasForm!: FormGroup; 
  categoria!: Categoria;
  category!: ControlCategoria;
  servicios: Servicio[] = [];
  serviciosFiltrados: Servicio[] = [];
  modificado: boolean = false;

  constructor(private route: ActivatedRoute, private categoriasService: CategoriasService, private router: Router, private serviciosService: ServiciosService) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ categoria }) => {
      this.categoria = categoria.data;
      this.category = this.crearCategoria(this.categoria.nombre, this.categoria.servicios, this.categoria.descripcion);
    });
    this.serviciosService.getServicios().subscribe({
      next: x => {
        this.servicios = x;
        this.serviciosFiltrados = x.filter(serv => !this.categoria.servicios.some(cat => cat.id == serv.id));
        console.log(this.servicios)
      }
    })
  }

  crearCategoria(nombre: string, servicios: Servicio[] = [], descripcion: string) : ControlCategoria {
    return new FormGroup({
      nombre: new FormControl(nombre),
      servicios: new FormArray<FormControl<string | null>>(servicios.map(servicio => new FormControl(servicio.nombre))),
      descripcion: new FormControl(descripcion)
    });
  }

  getServicios() {
    return this.category.controls.servicios as FormArray<FormControl<string | null>>
  }

  getServicio(index: number) {
    return this.getServicios().at(index);
  }

  remove(index: number) {
    const servicioNombre = this.getServicios().at(index).value;
    if (servicioNombre) {
      const servicio = this.categoria.servicios.find(x => x.nombre === servicioNombre);
      if (servicio) {
        this.serviciosFiltrados.push(servicio);
      }
    }
    this.getServicios().removeAt(index);
    this.modificado = true;
  }

  addService(e: any) {
    if (e.target.value) {
      const servicio = this.serviciosFiltrados.find(servicio => servicio.id == e.target.value);
      if (servicio) {
        this.getServicios().push(new FormControl(servicio.nombre));
        this.serviciosFiltrados = this.serviciosFiltrados.filter(x => x.id != e.target.value);
        this.modificado = true;
      }
    }
  }

  submit(event: Event) {
    if (this.category.valid) {
      const indices: number[] = [];
      this.category.get('servicios')?.value.forEach(serv => {
        const nombreServicio = serv;
        const servicio = this.servicios.find(servicio => servicio.nombre === nombreServicio);
        console.log(servicio);
        if (servicio) {
          indices.push(servicio.id);
        }
      });
      const data: Partial<Categoria> = {
        nombre: this.category.get('nombre')?.value ?? '',
        descripcion: this.category.get('descripcion')?.value ?? '',
        serviciosIds: indices
      }
      this.categoriasService.editCategoria(this.categoria.id, data).subscribe({
        next: x => {
          console.log(x);
          this.router.navigate(['/panel/categorias']);
        },
        error: err => {
          console.log(err);
        }
      });
    }

    //this.categoriasService.editCategoria(this.categoria.id, data);
  }
}
