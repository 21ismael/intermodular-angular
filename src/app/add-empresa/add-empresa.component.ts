import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapitalizarPipe } from '../pipes/capitalizar.pipe';
import { EmpresasService } from '../empresas/empresas-dashboard/empresas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CapitalizarPipe],
  templateUrl: './add-empresa.component.html',
  styleUrl: './add-empresa.component.scss'
})
export class AddEmpresaComponent {
  constructor(private empresasService: EmpresasService){}

  subscription!: Subscription;

  ubicacion: any = [];
  provincias: string[] = [];
  localidades: string[] = [];

  categorias: string[] = ['Programación Web', 'Programación Multimedía', 'Administración de Sistemas'];

  empresaFormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cif: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
    localidad: new FormControl('', Validators.required),
    horario: new FormGroup({
      inicio: new FormControl('', Validators.required),
      fin: new FormControl('', Validators.required)
    }),
    email: new FormControl('', [Validators.required, Validators.email]),
    vacantes: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
  })

  get nombre() { return this.empresaFormGroup.get('nombre') }
  get cif() { return this.empresaFormGroup.get('cif') }
  get provincia() { return this.empresaFormGroup.get('provincia') }
  get localidad() { return this.empresaFormGroup.get('localidad') }
  get inicio() { return this.empresaFormGroup.get('horario.inicio'); }
  get fin() { return this.empresaFormGroup.get('horario.fin'); }
  get email() { return this.empresaFormGroup.get('email'); }
  get vacantes() { return this.empresaFormGroup.get('vacantes'); }
  get categoria() { return this.empresaFormGroup.get('categoria'); }

  empresa: any = {}

  ngOnInit() {
    this.empresaFormGroup.valueChanges.subscribe(value => {
      this.empresa = value;
    });

    this.subscription = this.empresasService.getUbicacion().subscribe({
      next: value => {
        this.ubicacion = value;
        this.provincias = Object.keys(this.ubicacion);
      },
      error: err => console.error('Error en el observable', err),
    });
  }

  cambioProvincia(){
    let provinciaSeleccionada = this.provincia?.value;
    if (provinciaSeleccionada == "alicante") {
      this.localidades = this.ubicacion.alicante;
    } else if (provinciaSeleccionada == "valencia") {
      this.localidades = this.ubicacion.valencia;
    } else if (provinciaSeleccionada == "castellón") {
      this.localidades = this.ubicacion.castellón;
    } else {
      this.localidades = [];
    }
  }
}
