import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewTutoresComponent } from './overview-tutores.component';

describe('OverviewTutoresComponent', () => {
  let component: OverviewTutoresComponent;
  let fixture: ComponentFixture<OverviewTutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewTutoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
