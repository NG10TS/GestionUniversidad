import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPostgradoComponent } from './login-postgrado.component';

describe('LoginPostgradoComponent', () => {
  let component: LoginPostgradoComponent;
  let fixture: ComponentFixture<LoginPostgradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPostgradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPostgradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
