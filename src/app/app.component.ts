import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment as env } from '../environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dashboard | PetaBencana.id';
  languages = env.locales.supportedLanguages;
  selectLang = env.locales.defaultLanguage;

  constructor(
    private translate: TranslateService,
    public auth: AuthService
  ) {
    auth.handleAuthentication();
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(env.locales.defaultLanguage);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(env.locales.defaultLanguage);
  }

  changeLanguage(event) {
    this.translate.use(event.value);
  }
}
