import { Component } from '@angular/core';
import { EmpresasService } from '../empresas/empresas-dashboard/empresas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Empresa } from '../empresas/empresas-dashboard/empresa/empresa';

@Component({
  selector: 'app-editar-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-empresa.component.html',
  styleUrl: './editar-empresa.component.scss'
})
export class EditarEmpresaComponent {
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private empresasService: EmpresasService, private router: Router) { }

  empresa!: any;
  subscription!: Subscription;

  ubicacion: any = [];
  provincias: string[] = [];
  localidades: string[] = [];

  isDisabled: boolean = true;

  categorias: string[] = ['Programación Web', 'Programación Multimedía', 'Administración de Sistemas'];

  imagenBase64 = '';

  empresaFormGroup = new FormGroup({
    nombre: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
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
    hora_fin: new FormControl('', Validators.required)
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
  get imagen() { return this.empresaFormGroup.get('imagen'); }

  ngOnInit() {
    this.route.data.subscribe(({ empresa }) => {
      this.empresa = empresa
      console.log(this.empresa);
    });

    /*this.empresaFormGroup.valueChanges.subscribe(value => {
      this.empresa = value;
    });*/

    this.subscription = this.empresasService.getUbicacion().subscribe({
      next: value => {
        console.log(value)
        this.ubicacion = value;
        this.ubicacion.data.forEach((prov: any) => {
          this.provincias.push(prov.nombre);
        });
        this.cambioProvincia();
      },
      error: err => console.error('Error en el observable', err),
    });

    this.empresaFormGroup = new FormGroup({
      nombre: new FormControl(this.empresa.nombre, Validators.required),
      imagen: new FormControl('', Validators.required),
      cif: new FormControl(this.empresa.cif, Validators.required),
      descripcion: new FormControl(this.empresa.descripcion, Validators.required),
      telefono: new FormControl(this.empresa.telefono, Validators.required),
      email: new FormControl(this.empresa.email, [Validators.required, Validators.email]),
      direccion: new FormControl(this.empresa.ubicacion.direccion, Validators.required),
      provincia: new FormControl(this.empresa.ubicacion.provincia, Validators.required),
      localidad: new FormControl(this.empresa.ubicacion.localidad, Validators.required),
      lat: new FormControl(this.empresa.ubicacion.coordenadas.lat, Validators.required),
      lng: new FormControl(this.empresa.ubicacion.coordenadas.lng, Validators.required),
      vacantes: new FormControl(this.empresa.vacantes, Validators.required),
      hora_inicio: new FormControl(this.empresa.horario.inicio, Validators.required),
      hora_fin: new FormControl(this.empresa.horario.fin, Validators.required)
    })
    this.empresaFormGroup.valueChanges.subscribe(() => this.isDisabled = !this.empresaFormGroup.dirty || this.empresaFormGroup.invalid);
  }

  cambioProvincia() {
    let provinciaSeleccionada = this.provincia?.value;
    if (provinciaSeleccionada == "Alicante") {
      this.localidades = this.ubicacion.data[0].poblaciones;
    } else if (provinciaSeleccionada == "Valencia") {
      this.localidades = this.ubicacion.data[2].poblaciones;
    } else if (provinciaSeleccionada == "Castellon") {
      this.localidades = this.ubicacion.data[1].poblaciones;
    } else {
      this.localidades = [];
    }
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

  onFileSelected(event: any) {
    //prevista de la imagen
    const imagenVista = document.getElementById('imagenVista') as HTMLImageElement;
    this.previewFile(event.target.files[0], imagenVista);

    //conversión de la imagen a Base64 la imagen
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      this.imagenBase64 = event.target?.result as string;
      console.log(this.imagenBase64);
    };

    reader.readAsDataURL(file);
  }

  submit(e: Event) {
    e.preventDefault();
    if (this.empresaFormGroup.valid) {
      console.log("FDf");
      const data = {
        nombre: this.empresaFormGroup.get('nombre')?.value,
        imagen: this.imagenBase64,
        nota: 0,
        cif: this.empresaFormGroup.get('cif')?.value,
        descripcion: this.empresaFormGroup.get('descripcion')?.value,
        telefono: this.empresaFormGroup.get('telefono')?.value,
        email: this.empresaFormGroup.get('email')?.value,
        direccion: this.empresaFormGroup.get('direccion')?.value,
        provincia: this.empresaFormGroup.get('provincia')?.value,
        localidad: this.empresaFormGroup.get('localidad')?.value,
        lat: this.empresaFormGroup.get('lat')?.value,
        lng: this.empresaFormGroup.get('lng')?.value,
        vacantes: this.empresaFormGroup.get('vacantes')?.value,
        hora_inicio: this.empresaFormGroup.get('hora_inicio')?.value,
        hora_fin: this.empresaFormGroup.get('hora_fin')?.value,
        //categoria: this.empresaFormGroup.get('categoria')?.value
      };

      console.log(data);

      this.empresasService.editEmpresa(this.empresa.id, data).subscribe({
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
