import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUrl = '';

  objectKeys = Object.keys;
  languages: Object

  constructor(private router: Router, private translate: TranslateService) {

    this.translate.stream('global.languages').subscribe((val) => {
      this.languages = val;
    });

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  changeLanguage(languageKey: string) {
    this.translate.use(languageKey);
  }

}
