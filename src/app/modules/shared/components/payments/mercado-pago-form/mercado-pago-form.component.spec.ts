import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoPagoFormComponent } from './mercado-pago-form.component';

describe('MercadoPagoFormComponent', () => {
  let component: MercadoPagoFormComponent;
  let fixture: ComponentFixture<MercadoPagoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MercadoPagoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MercadoPagoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
