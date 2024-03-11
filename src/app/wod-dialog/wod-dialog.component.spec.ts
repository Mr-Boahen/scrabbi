import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WodDialogComponent } from './wod-dialog.component';

describe('WodDialogComponent', () => {
  let component: WodDialogComponent;
  let fixture: ComponentFixture<WodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WodDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
