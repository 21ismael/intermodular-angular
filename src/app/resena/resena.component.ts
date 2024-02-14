import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resena',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './resena.component.html',
  styleUrl: './resena.component.css'
})
export class ResenaComponent {

  constructor() { }

  form = new FormGroup({
    rating1: new FormControl(""),
    rating2: new FormControl("")
  })

  getRating(event: Event) {
    console.log((event.target as HTMLInputElement).value)
  }

}
