import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewEmpresasComponent } from './overview-empresas.component';

describe('OverviewEmpresasComponent', () => {
  let component: OverviewEmpresasComponent;
  let fixture: ComponentFixture<OverviewEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewEmpresasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
