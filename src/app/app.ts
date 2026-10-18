import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header'; 
import { Footer } from './shared/footer/footer';
import { AboutSection } from './components/about-section/about-section';
import { Banner } from './components/banner/banner';
import { WhyChooseUs } from './components/why-choose-us/why-choose-us';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Banner, AboutSection, WhyChooseUs],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('NBTech Solution');
}
