import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DemoModalService } from '../demo-modal.service';

export interface SocialLink {
  name: string;
  url: string;
  icon: 'linkedin' | 'facebook' | 'youtube' | 'instagram';
}

export interface LegalLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly demoModal = inject(DemoModalService);

  protected readonly currentYear = new Date().getFullYear();

  protected readonly socialLinks: SocialLink[] = [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
  ];

  protected readonly legalLinks: LegalLink[] = [
    { label: 'Terms & Conditions', url: '#' },
    { label: 'Privacy Policy', url: '#' }
  ];

  protected openContact(): void {
    this.demoModal.open({
      title: 'Contact Us',
      subtitle: 'Get in touch with the NBTech Solution team. We will respond promptly.',
      submitLabel: 'Send Inquiry',
      source: 'Footer - Contact Us',
    });
  }
}
