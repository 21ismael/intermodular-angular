import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Empresa } from '../empresas/empresas-dashboard/empresa/empresa';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ResenaService } from './resena.service';

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
  preguntas: string[] = []
  canShowNavbar! : boolean;

  constructor(private route: ActivatedRoute, private resenaService: ResenaService, private router: Router) { 
    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        this.update()
      }
    });
  }

  form = new FormGroup({
    rating1: new FormControl(""),
    rating2: new FormControl("")
  })

  getRating(event: Event) {
    console.log((event.target as HTMLInputElement).value)
  }

  ngOnInit(): void{
    this.route.data.subscribe(({ empresas }) => {
      this.empresa = empresas;
      this.boolean = true;
      console.log(this.empresa);
    });

    this.resenaService.getAllPreguntas().subscribe( (data) => {
      this.preguntas = data.preguntas
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
}
