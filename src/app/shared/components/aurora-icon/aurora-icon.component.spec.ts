import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuroraIconComponent } from './aurora-icon.component';

describe('AuroraIconComponent', () => {
  let component: AuroraIconComponent;
  let fixture: ComponentFixture<AuroraIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuroraIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuroraIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
