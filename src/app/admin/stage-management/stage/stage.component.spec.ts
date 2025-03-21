import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageComponent } from './stage.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SidebarComponent } from "../../../layouts/sidebar/sidebar.component";
import { NavbarComponent } from "../../../layouts/navbar/navbar.component";
import { DialogModule } from "@angular/cdk/dialog";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { selectFilteredStages, selectStages } from "../../../core/stores/stage/stage.reducer";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { StageActions } from "../../../core/stores/stage/stage.actions";
import { NgxPaginationModule } from "ngx-pagination";
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from "@ngx-translate/core";

class MockTranslateService {
  private translationObject = {};

  get onLangChange(): Observable<any> { return of({ lang: 'en' }); }
  get onTranslationChange(): Observable<any> { return of({}); }
  get onDefaultLangChange(): Observable<any> { return of({}); }

  setTranslation(lang: string, translations: any, shouldMerge = false) {
    this.translationObject = translations;
    return this;
  }

  setDefaultLang(lang: string) {}
  use(lang: string): Observable<any> { return of({}); }

  get(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return of(typeof key === 'string' ? key : key.join(' '));
  }

  stream(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.get(key, interpolateParams);
  }

  instant(key: string | Array<string>, interpolateParams?: Object): string | any {
    return typeof key === 'string' ? key : key.join(' ');
  }

  getBrowserLang(): string { return 'en'; }
  getBrowserCultureLang(): string { return 'en-US'; }

  get currentLang(): string { return 'en'; }
}

class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

describe('StageComponent', () => {
  let component: StageComponent;
  let fixture: ComponentFixture<StageComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  const mockStages = [
    { id: 1, name: 'stage1' },
    { id: 2, name: 'stage2' },
    { id: 3, name: 'stage3' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: MockTranslateLoader }
        }),
        SidebarComponent,
        NavbarComponent,
        DialogModule,
        NgxPaginationModule
      ],
      declarations: [StageComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectFilteredStages, value: mockStages },
            { selector: selectStages, value: mockStages }
          ]
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            snapshot: { params: {} }
          }
        },
        {
          provide: TranslateService,
          useClass: MockTranslateService
        },
        TranslateStore
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(StageComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadStages on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(StageActions.loadStages());
  });

  it('should display stages', () => {
    fixture.detectChanges();
    const stageElements = fixture.debugElement.queryAll(By.css('.title'));
    expect(stageElements.length).toBe(mockStages.length);
    expect(stageElements[0].nativeElement.textContent).toContain('stage1');
  });

  it('should open popup when Add stage button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.btn-primary'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.showModal).toBeTrue();
  });

  it('should edit a stage', () => {
    component.editStage(1);
    fixture.detectChanges();
    expect(component.selectedStage?.id).toBe(1);
    expect(component.showModal).toBeTrue();
  });

  it('should confirm deletion of a stage', () => {
    component.showDeleteConfirmation(2);
    expect(component.stageIdToDelete).toBe(2);
    expect(component.visible).toBeTrue();
  });

  it('should dispatch deleteStage when confirmDeleteStage is called', () => {
    component.stageIdToDelete = 1;
    component.confirmDeleteStage();
    expect(dispatchSpy).toHaveBeenCalledWith(StageActions.deleteStage({ id: 1 }));
    expect(component.visible).toBeFalse();
  });
});
