import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empresa } from '../empresas/empresas-dashboard/empresa/empresa';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ResenaService } from './resena.service';
import { Pregunta } from './preguntas';

@Component({
  selector: 'app-resena',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './resena.component.html',
  styleUrl: './resena.component.css'
})
export class ResenaComponent {
  empresa!: Empresa;
  boolean: boolean = false;
  preguntas: Pregunta[] = []
  canShowNavbar! : boolean;

  constructor(private route: ActivatedRoute, private resenaService: ResenaService, private router: Router,private formBuilder: FormBuilder) { 
    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        this.update()
      }
    });
  }

  form!:FormGroup;

  getRating(event: Event) {
    console.log((event.target as HTMLInputElement).value)
  }

  ngOnInit(): void{
    this.route.data.subscribe(({ resena }) => {
      
      console.log(resena);
      this.preguntas = resena.preguntas;
      this.empresa = resena.empresa;
      this.canShowNavbar = false;
      console.log(this.empresa);
    });
    this.form = this.formBuilder.group({});
    this.preguntas.forEach((pregunta) => {
      this.form.addControl(pregunta.id.toString(),this.formBuilder.control('', Validators.required));
    });
  }
  

  update() : void {
    console.log(this.boolean)
    if(this.boolean == true) {
      this.router.url == '/formulario/'+this.empresa.id  ? console.log('si') : console.log('no');
      console.log(this.router.url)
    }
    console.log(this.router.url)
  }

  submit(){
    if(this.form.valid){
      const data = {
        preguntas: this.form.value,
        id: this.router.url.slice(12)
      }

      this.resenaService.postRepuestas(data).subscribe({
        next: response => {
          console.log(response);
        },
        error: err => {
          console.log(err);
        }
      })
      this.resenaService.putResena(this.router.url.slice(12)).subscribe({
        next: response => {
          this.router.navigate(['/main']);
        },
        error: err => {
          console.log(err);
        }
      })
    console.log(data);
    } else {
      console.log('no');
      console.log(this.router.url.slice(12));
    }
    
  }
}
