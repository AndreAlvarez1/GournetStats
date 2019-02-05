import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasdiariasPage } from './ventasdiarias.page';

describe('VentasdiariasPage', () => {
  let component: VentasdiariasPage;
  let fixture: ComponentFixture<VentasdiariasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasdiariasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasdiariasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
