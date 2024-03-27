import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBoardPageComponent } from './leader-board-page.component';

describe('LeaderBoardPageComponent', () => {
  let component: LeaderBoardPageComponent;
  let fixture: ComponentFixture<LeaderBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderBoardPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeaderBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
