import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewHeroSection } from './new-hero-section';

describe('NewHeroSection', () => {
  let component: NewHeroSection;
  let fixture: ComponentFixture<NewHeroSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHeroSection],
    }).compileComponents();

    fixture = TestBed.createComponent(NewHeroSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
