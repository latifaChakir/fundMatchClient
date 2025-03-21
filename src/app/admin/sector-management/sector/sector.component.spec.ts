import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectorComponent } from './sector.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SectorActions } from "../../../core/stores/sector/sector.actions";
import { selectFilteredSectors, selectSectors } from "../../../core/stores/sector/sector.reducer";
import { SidebarComponent } from "../../../layouts/sidebar/sidebar.component";
import { NavbarComponent } from "../../../layouts/navbar/navbar.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from '@angular/platform-browser';
import { DialogModule } from "@angular/cdk/dialog";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable, of } from "rxjs";
import { TranslateService, TranslateStore, TranslateModule, TranslateLoader, TranslatePipe } from "@ngx-translate/core";

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

describe('SectorComponent', () => {
  let component: SectorComponent;
  let fixture: ComponentFixture<SectorComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const mockSectors = [
    { id: 1, name: 'Finance' },
    { id: 2, name: 'Technology' },
    { id: 3, name: 'Healthcare' }
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
        DialogModule
      ],
      declarations: [
        SectorComponent
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectFilteredSectors, value: mockSectors },
            { selector: selectSectors, value: mockSectors }
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
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SectorComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadSectors on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(SectorActions.loadSectors());
  });

  it('should display sectors', () => {
    fixture.detectChanges();
    const sectorElements = fixture.debugElement.queryAll(By.css('.title'));
    expect(sectorElements.length).toBe(mockSectors.length);
    expect(sectorElements[0].nativeElement.textContent).toContain('Finance');
  });

  it('should open popup when Add Sector button is clicked', () => {
    const button = fixture.debugElement.query(By.css('.btn-primary'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.showModal).toBeTrue();
  });

  it('should edit a sector', () => {
    component.editSector(1);
    fixture.detectChanges();
    expect(component.selectedSector?.id).toBe(1);
    expect(component.showModal).toBeTrue();
  });

  it('should confirm deletion of a sector', () => {
    component.showDeleteConfirmation(2);
    expect(component.sectorIdToDelete).toBe(2);
    expect(component.visible).toBeTrue();
  });

  it('should dispatch deleteSector when confirmDeleteSector is called', () => {
    component.sectorIdToDelete = 1;
    component.confirmDeleteSector();
    expect(dispatchSpy).toHaveBeenCalledWith(SectorActions.deleteSector({ id: 1 }));
    expect(component.visible).toBeFalse();
  });
});
