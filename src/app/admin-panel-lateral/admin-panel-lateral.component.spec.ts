import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelLateralComponent } from './admin-panel-lateral.component';

describe('AdminPanelLateralComponent', () => {
  let component: AdminPanelLateralComponent;
  let fixture: ComponentFixture<AdminPanelLateralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPanelLateralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPanelLateralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
