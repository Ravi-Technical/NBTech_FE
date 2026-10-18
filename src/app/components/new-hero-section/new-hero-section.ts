import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; 
import { DemoModalService } from '../../shared/demo-modal.service';

interface Service {
  icon: string;
  title: string;
  description: string;
  route: string;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  imports: [RouterLink, MatIconModule],
  selector: 'app-new-hero-section',
  styleUrl: './new-hero-section.scss',
  templateUrl: './new-hero-section.html',
})
export class NewHeroSection {
  private readonly demoModal = inject(DemoModalService);

  protected readonly categories = ['IT Services', 'Software Development', 'Digital Solutions'];

  protected readonly services: Service[] = [
    {
      icon: 'cloud',
      title: 'Cloud & Infrastructure',
      description: 'Migration, hosting and optimisation',
      route: '/services/cloud',
    },
    {
      icon: 'verified_user',
      title: 'Cybersecurity',
      description: 'Monitoring, protection and compliance',
      route: '/services/security',
    },
    {
      icon: 'code',
      title: 'Software Development',
      description: 'Web, mobile and enterprise applications',
      route: '/services/software',
    },
    {
      icon: 'headset_mic',
      title: 'Managed IT Support',
      description: '24/7 service desk and proactive monitoring',
      route: '/services/support',
    },
  ];

  protected readonly stats: Stat[] = [
    { value: '24/7', label: 'Support desk coverage' },
    { value: '100+', label: 'Projects delivered' },
    { value: '50+', label: 'Clients served' },
    { value: '20+', label: 'Years of experience' },
  ];

  /** Placeholder slots, replace with real <img> logos later */
  protected readonly clientSlots = [1, 2, 3, 4, 5];

  protected openDemo(): void {
    this.demoModal.open({ source: 'hero' }).subscribe();
  }

}
