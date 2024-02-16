import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapitalizarPipe } from '../pipes/capitalizar.pipe';
import { EmpresasService } from '../empresas/empresas-dashboard/empresas.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Empresa } from '../empresas/empresas-dashboard/empresa/empresa';

@Component({
  selector: 'app-add-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CapitalizarPipe],
  templateUrl: './add-empresa.component.html',
  styleUrl: './add-empresa.component.scss'
})
export class AddEmpresaComponent {
  constructor(private empresasService: EmpresasService, private router: Router) { }

  subscription!: Subscription;

  ubicacion: any = [];
  provincias: string[] = [];
  localidades: string[] = [];

  categorias: string[] = ['Programación Web', 'Programación Multimedía', 'Administración de Sistemas'];

  empresaFormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    cif: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    direccion: new FormControl('', Validators.required),
    provincia: new FormControl('', Validators.required),
    localidad: new FormControl('', Validators.required),
    lat: new FormControl('', Validators.required),
    lng: new FormControl('', Validators.required),
    vacantes: new FormControl('', Validators.required),
    hora_inicio: new FormControl('', Validators.required),
    hora_fin: new FormControl('', Validators.required),
  })

  get nombre() { return this.empresaFormGroup.get('nombre') }
  get cif() { return this.empresaFormGroup.get('cif') }
  get descripcion() { return this.empresaFormGroup.get('descripcion') }
  get telefono() { return this.empresaFormGroup.get('telefono') }
  get email() { return this.empresaFormGroup.get('email'); }
  get direccion() { return this.empresaFormGroup.get('direccion') }
  get provincia() { return this.empresaFormGroup.get('provincia') }
  get localidad() { return this.empresaFormGroup.get('localidad') }
  get lat() { return this.empresaFormGroup.get('latitud') }
  get lng() { return this.empresaFormGroup.get('longitud') }
  get vacantes() { return this.empresaFormGroup.get('vacantes'); }
  get inicio() { return this.empresaFormGroup.get('hora_inicio'); }
  get fin() { return this.empresaFormGroup.get('hora_fin'); }
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

  cambioProvincia() {
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

  onFileSelected(event: any) {
    const imagen = document.getElementById('imagenVista') as HTMLImageElement;
    this.previewFile(event.target.files[0], imagen);
  }

  previewFile(file: File, imagen: HTMLImageElement) {
    const reader = new FileReader();

    reader.onload = () => {
      imagen.src = reader.result as string;
      imagen.className = "text-center img-preview img-fluid";
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      imagen.className = "d-none text-center img-preview img-fluid";
    }
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.empresaFormGroup.valid) {
      let provincia = this.empresaFormGroup.get('provincia')?.value;
      if (provincia) {
        const provinciaCorrecta = provincia.charAt(0).toUpperCase() + provincia.slice(1);
        provincia = provinciaCorrecta;
      }
      const data = {
        nombre: this.empresaFormGroup.get('nombre')?.value,
        imagen: "../../assets/empresas/imagen.jpg",
        nota: 0,
        cif: this.empresaFormGroup.get('cif')?.value,
        descripcion: this.empresaFormGroup.get('descripcion')?.value,
        telefono: this.empresaFormGroup.get('telefono')?.value,
        email: this.empresaFormGroup.get('email')?.value,
        direccion: this.empresaFormGroup.get('direccion')?.value,
        provincia: provincia,
        localidad: this.empresaFormGroup.get('localidad')?.value,
        lat: this.empresaFormGroup.get('lat')?.value,
        lng: this.empresaFormGroup.get('lng')?.value,
        vacantes: this.empresaFormGroup.get('vacantes')?.value,
        hora_inicio: this.empresaFormGroup.get('hora_inicio')?.value,
        hora_fin: this.empresaFormGroup.get('hora_fin')?.value,
        //categoria: this.empresaFormGroup.get('categoria')?.value
      };

      this.empresasService.postEmpresa(data).subscribe({
        next: response => {
          console.log(response);
          this.router.navigate(['/panel/empresas']);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

}

/*
{
  "nombre": "Empresa de ejemplo",
  "imagen": "../../assets/empresas/centauro.jpg",
  "nota": 5,
  "cif": "CIF123456",
  "descripcion": "Descripción de la empresa de ejemplo",
  "telefono": "123-456-789",
  "email": "info@empresa.com",
  "direccion": "Calle Ejemplo 123",
  "provincia": "Ejemplo",
  "localidad": "Ciudad Ejemplo",
  "lat": 40.7128,
  "lng": -74.0060,
  "vacantes": 10,
  "hora_inicio": "09:00:00",
  "hora_fin": "18:00:00"
}
*/
