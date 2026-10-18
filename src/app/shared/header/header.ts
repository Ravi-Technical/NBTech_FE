import { Component, DOCUMENT, effect, ElementRef, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DemoModalService } from '../demo-modal.service';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../core/theme.service';

export interface NavLink {
  label: string;
  description: string;
  route: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface NavItem {
  id: string;
  label: string;
  /** Plain link when no groups are provided */
  route?: string;
  groups?: NavGroup[];
}

@Component({
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
  host: {
    '[class.is-scrolled]': 'scrolled()',
    '(window:scroll)': 'onScroll()',
    '(window:resize)': 'onResize()',
    '(document:keydown.escape)': 'closeAll()',
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class Header {
  protected readonly themeService = inject(ThemeService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);

  /** id of the open desktop panel, or null */
  protected readonly openMenu = signal<string | null>(null);
  protected readonly mobileOpen = signal(false);
  protected readonly mobileExpanded = signal<string | null>(null);
  protected readonly scrolled = signal(false);
  // inside the class
  private readonly demoModal = inject(DemoModalService);
  protected readonly brand = 'NBTech Solution';

  protected readonly nav: NavItem[] = [
    {
      id: 'products',
      label: 'What we do',
      groups: [
        {
          title: 'Platform',
          links: [
            {
              label: 'Cloud Infrastructure',
              description: 'Managed compute, storage and networking.',
              route: '/products/cloud',
            },
            {
              label: 'DevOps Pipelines',
              description: 'Build, test and ship with automated CI/CD.',
              route: '/products/devops',
            },
            {
              label: 'Observability',
              description: 'Logs, metrics and traces in one place.',
              route: '/products/observability',
            },
          ],
        },
        {
          title: 'Security & data',
          links: [
            {
              label: 'Identity & Access',
              description: 'Single sign-on, MFA and role-based access.',
              route: '/products/identity',
            },
            {
              label: 'Threat Detection',
              description: 'Find and respond to risks in real time.',
              route: '/products/security',
            },
            {
              label: 'Data Platform',
              description: 'Pipelines, warehousing and analytics.',
              route: '/products/data',
            },
          ],
        },
      ],
    },
    {
      id: 'solutions',
      label: 'Solutions',
      groups: [
        {
          title: 'By team',
          links: [
            {
              label: 'Engineering',
              description: 'Faster releases with fewer incidents.',
              route: '/solutions/engineering',
            },
            {
              label: 'IT Operations',
              description: 'Monitor, automate and support at scale.',
              route: '/solutions/it-operations',
            },
            {
              label: 'Security',
              description: 'Meet compliance and reduce exposure.',
              route: '/solutions/security',
            },
          ],
        },
        {
          title: 'By goal',
          links: [
            {
              label: 'Cloud Migration',
              description: 'Move workloads with a tested plan.',
              route: '/solutions/migration',
            },
            {
              label: 'Digital Transformation',
              description: 'Modernize legacy systems step by step.',
              route: '/solutions/transformation',
            },
          ],
        },
      ],
    },
    {
      id: 'resources',
      label: 'Resources',
      groups: [
        {
          title: 'Learn',
          links: [
            {
              label: 'Documentation',
              description: 'Guides, API reference and quickstarts.',
              route: '/docs',
            },
            {
              label: 'Blog',
              description: 'Engineering notes and product updates.',
              route: '/blog',
            },
            {
              label: 'Case studies',
              description: 'How teams use NBTech Solution in production.',
              route: '/case-studies',
            },
          ],
        },
        {
          title: 'Support',
          links: [
            {
              label: 'Help center',
              description: 'Answers to common questions.',
              route: '/help',
            },
            {
              label: 'System status',
              description: 'Live uptime and incident history.',
              route: '/status',
            },
          ],
        },
      ],
    },
    { id: 'pricing', label: 'Privacy & Policy', route: '/pricing' },
    { id: 'company', label: 'Contact Us', route: '/company' },
  ];

  constructor() {
    // Lock page scroll while the mobile drawer is open.
    effect((onCleanup) => {
      if (this.mobileOpen()) {
        const body = this.document.body;
        const previous = body.style.overflow;
        body.style.overflow = 'hidden';
        onCleanup(() => (body.style.overflow = previous));
      }
    });
  }
  protected openDemo(): void {
    this.closeAll();
    this.demoModal.open({ source: 'header' }).subscribe();
  }
  protected onScroll(): void {
    const next = (this.document.defaultView?.scrollY ?? 0) > 8;
    if (next !== this.scrolled()) this.scrolled.set(next);
  }

  protected onResize(): void {
    // Close the drawer if the viewport grows to desktop size.
    if ((this.document.defaultView?.innerWidth ?? 0) >= 960 && this.mobileOpen()) {
      this.closeAll();
    }
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.openMenu.set(null);
    }
  }

  protected toggleMenu(id: string): void {
    this.openMenu.update((current) => (current === id ? null : id));
  }

  protected openPanel(id: string): void {
    this.openMenu.set(id);
  }

  protected closePanel(id: string): void {
    this.openMenu.update((current) => (current === id ? null : current));
  }

  protected onFocusOut(event: FocusEvent, id: string): void {
    const next = event.relatedTarget as Node | null;
    const item = event.currentTarget as HTMLElement;
    if (!next || !item.contains(next)) this.closePanel(id);
  }

  protected toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
    this.mobileExpanded.set(null);
    this.openMenu.set(null);
  }

  protected toggleMobileSection(id: string): void {
    this.mobileExpanded.update((current) => (current === id ? null : id));
  }

  protected closeAll(): void {
    this.openMenu.set(null);
    this.mobileOpen.set(false);
    this.mobileExpanded.set(null);
  }


}
