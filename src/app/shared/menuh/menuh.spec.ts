import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuhComponent } from './menuh';

describe('Menuh', () => {
  let component: MenuhComponent;
  let fixture: ComponentFixture<MenuhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
