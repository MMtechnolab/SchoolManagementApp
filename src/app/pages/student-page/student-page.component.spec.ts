import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroService} from '../../modules/heroes/shared/hero.service';
import {StudentPageComponent} from './student-page.component';
import {of} from 'rxjs';
import {Hero} from '../../modules/heroes/shared/hero.model';
import {configureTestSuite} from 'ng-bullet';
import {HeroLoadingComponent} from '../../shared/components/hero-loading/hero-loading.component';
import {HeroCardComponent} from '../../shared/components/hero-card/hero-card.component';
import {LoadingPlaceholderComponent} from '../../shared/components/loading-placeholder/loading-placeholder.component';
import {MockComponent} from 'ng-mocks';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';

describe('StudentPage', () => {
  let component: StudentPageComponent;
  let fixture: ComponentFixture<StudentPageComponent>;

  const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule
      ],
      declarations: [
        MockComponent(HeroCardComponent),
        MockComponent(HeroLoadingComponent),
        MockComponent(LoadingPlaceholderComponent),
        StudentPageComponent
      ],
      providers: [
        {provide: HeroService, useValue: heroServiceSpy}
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPageComponent);
    component = fixture.debugElement.componentInstance;
    heroServiceSpy.getHeroes.and.returnValue(of([new Hero({name: 'hero test'})]));
    fixture.detectChanges();
  });

  it('should create component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should initialice heroes', async(() => {
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.queryAll(By.css('app-hero-card')).length).toBe(1);
    });
  }));
});
