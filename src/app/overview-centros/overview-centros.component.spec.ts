import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCentrosComponent } from './overview-centros.component';

describe('OverviewCentrosComponent', () => {
  let component: OverviewCentrosComponent;
  let fixture: ComponentFixture<OverviewCentrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewCentrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewCentrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
