import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpLoaderFactory } from './app.module';

describe('AppComponent when authenticated', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
      ]
    });
  });

  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let app;
  const authServiceStub = {
    handleAuthentication: () => {
      // void
    },

    login: () => {
      // void
    },

    logout: () => {
      // void
    },

    isAuthenticated: () => {
      return true;
    },

    canActivate: () => {
      return true;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        {provide: AuthService, useValue: authServiceStub}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    de = fixture.debugElement;
    app = de.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'PetaBencana.id | Dashboard'`, async(() => {
    expect(app.title).toEqual('PetaBencana.id | Dashboard');
  }));

  it('should render title in navigation bar', async(() => {
    fixture.detectChanges(); // Calls ngOnInit
    const textLogo = de.query(By.css('#logoBar>p')).nativeElement.textContent;
    expect(textLogo).toContain('Analytics Dashboard');
  }));

  it('should render page links and logout link when authenticated', async(() => {
    fixture.detectChanges();
    const linkHome = de.query(By.css('#homeLink')).nativeElement.textContent;
    const linkDashboard = de.query(By.css('#dashboardLink')).nativeElement.textContent;
    const linkLogout = de.query(By.css('#logoutLink')).nativeElement.textContent;
    expect(linkDashboard).toContain('Dashboard');
    expect(linkLogout).toContain('Log Out');
  }));

  it('should navigate to dashboard page when link is clicked', async(() => {

  }));
});

describe('AppComponent when not authenticated', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
      ]
    });
  });

  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let app;
  const authServiceStub = {
    handleAuthentication: () => {
      // void
    },

    login: () => {
      // void
    },

    logout: () => {
      // void
    },

    isAuthenticated: () => {
      return false;
    },

    canActivate: () => {
      return true;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        {provide: AuthService, useValue: authServiceStub}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    de = fixture.debugElement;
    app = de.componentInstance;
  }));

  it('should render log in link', async(() => {
    fixture.detectChanges();
    const linkLogin = de.query(By.css('#linksBar>a')).nativeElement.textContent;
    expect(linkLogin).toContain('Log In');
  }));
});
