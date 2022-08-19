import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuroraSocialMediaComponent } from './aurora-social-media.component';

describe('AuroraSocialMediaComponent', () => {
  let component: AuroraSocialMediaComponent;
  let fixture: ComponentFixture<AuroraSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuroraSocialMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuroraSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
