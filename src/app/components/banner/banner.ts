import { Component } from '@angular/core';
import { HeroWelcomeComponent } from './welcome-text/hero-welcome.component';

@Component({
  imports: [HeroWelcomeComponent],
  selector: 'app-banner',
  styleUrl: './banner.scss',
  templateUrl: './banner.html',
})
export class Banner {}
