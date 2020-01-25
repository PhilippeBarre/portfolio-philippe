import { Component, OnInit, NgModule, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  navbarRgb = {
    r: '',
    g: '',
    b: ''
  }

  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {
    let navbar = document.getElementById('navbar');
    console.log(navbar.classList)
    navbar.classList.remove('sticky');

    let navbarBackgroundColor = window.getComputedStyle(navbar).backgroundColor;
    const regexRgba = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    const match = navbarBackgroundColor.match(regexRgba);
    this.navbarRgb.r = match[1];
    this.navbarRgb.g = match[2];
    this.navbarRgb.b = match[3];
  }

  ngOnDestroy() {
    let navbar = document.getElementById('navbar');
    navbar.removeAttribute('style')
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let homeCover = document.getElementById('home-cover');
    let navbar = document.getElementById('navbar');
    let distanceFromHeader = homeCover.getBoundingClientRect().bottom - navbar.offsetHeight;
    let pageY = window.pageYOffset;
    let percent = pageY * 100 / (homeCover.offsetHeight - navbar.offsetHeight);
    
    navbar.style.backgroundColor = `rgba(${this.navbarRgb.r}, ${this.navbarRgb.g}, ${this.navbarRgb.b}, ${percent / 100})`;

    if (distanceFromHeader <= 0) {
      navbar.classList.add('sticky');
      navbar.classList.remove('header-on-bottom');
    } else {
      navbar.classList.remove('sticky');
      navbar.classList.add('header-on-bottom');
    }
  }

}
