import { Component } from '@angular/core';

export interface WhyFeature {
  id: string;
  title: string;
  description: string;
  iconBg: string;
  iconShadow: string;
}

@Component({
  selector: 'app-why-choose-us',
  imports: [],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.scss',
})
export class WhyChooseUs {
  protected readonly sectionTitle = 'Why Choose Us';
  protected readonly sectionSubtitle =
    'We combine cutting-edge technology with battle-tested architectures to deliver unparalleled reliability, simplicity, and speed for high-growth enterprises.';

  protected readonly features: WhyFeature[] = [
    {
      id: 'trusted',
      title: 'Trusted',
      description:
        'Backed by enterprise-grade security, 99.99% uptime guarantees, and certified cloud engineers trusted by global organizations.',
      iconBg: '#ff6238',
      iconShadow: 'rgba(255, 98, 56, 0.3)',
    },
    {
      id: 'easy',
      title: 'Easy to Use',
      description:
        'Designed with intuitive control planes, seamless automated integrations, and developer-first workflows that minimize friction.',
      iconBg: '#b03bf8',
      iconShadow: 'rgba(176, 59, 248, 0.3)',
    },
    {
      id: 'faster',
      title: 'Faster',
      description:
        'Accelerate time-to-market with automated CI/CD pipelines, real-time edge processing, and ultra-low latency infrastructure.',
      iconBg: '#1f96f8',
      iconShadow: 'rgba(31, 150, 248, 0.3)',
    },
  ];
}

