import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements AfterViewInit {
  currentSection: string = '';

  ngAfterViewInit() {
    const sections = document.querySelectorAll('section');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.currentSection = entry.target.id;
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  isActive(section: string): boolean {
    return this.currentSection === section;
  }
}
