import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ResenaService } from '../resena/resena.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-resena',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule
  ],
  templateUrl: './add-resena.component.html',
  styleUrl: './add-resena.component.scss'
})
export class AddResenaComponent {

  url!:string;
  alumnos!:string;
  tutores!:string;

  constructor(private resenaService: ResenaService, private route: ActivatedRoute){

  }

  ngOnInit():void{
    
  }

  onClick(tipoformulario:number):void{
    const data = {
      "formulario_id":tipoformulario,
      "centroempresa_id":1
    }
    this.resenaService.postResena(data).subscribe({
      next: response => {
        console.log(response);
        this.url = "htttp://intermodular-angular/formulario/"+response.id;
      },
      error: err => {
        console.log(err);
      }
    })
    if(tipoformulario === 1){
      this.alumnos = this.url;
    } else if(tipoformulario === 2){
      this.tutores = this.url;
    }
  } 
  stopProp($event:any):void{
    $event.stopPropagation();
  }
}


