import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCategoriasComponent } from './overview-categorias.component';

describe('OverviewCategoriasComponent', () => {
  let component: OverviewCategoriasComponent;
  let fixture: ComponentFixture<OverviewCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewCategoriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
