import {
  Component,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
  computed,
  afterNextRender,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DemoModalService } from '../../shared/demo-modal.service';

export interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCtaText: string;
  primaryCtaAction: 'demo' | 'explore';
  secondaryCtaText: string;
  secondaryCtaLink: string;
  imageUrl: string;
  imageAlt: string;
}

@Component({
  imports: [],
  selector: 'app-hero-sections',
  styleUrl: './hero-sections.scss',
  templateUrl: './hero-sections.html',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(keydown.arrowleft)': 'prevSlide()',
    '(keydown.arrowright)': 'nextSlide()',
    '(touchstart)': 'onTouchStart($event)',
    '(touchend)': 'onTouchEnd($event)',
    'tabindex': '0',
    'role': 'region',
    'aria-roledescription': 'carousel',
    'aria-label': 'Featured NBTech Solution Solutions and Technologies',
  },
})
export class HeroSections {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly demoModal = inject(DemoModalService);

  /** Active slide index */
  protected readonly currentSlide = signal(0);

  /** Whether the carousel autoplay is active or paused */
  protected readonly isPlaying = signal(true);

  /** Pause when hovered or focused */
  protected readonly isHovered = signal(false);

  /** Slide change interval in milliseconds */
  protected readonly slideDuration = 6000;

  /** Touch coordinates for mobile swipe detection */
  private touchStartX = 0;
  private touchStartY = 0;
  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;

  protected readonly slides: HeroSlide[] = [
    {
      id: 1,
      badge: 'Next-Gen Cloud Architecture',
      title: 'Powering Enterprise Intelligence with Resilient Cloud Infrastructure',
      subtitle: 'Scalable • Ultra-Fast • Global Coverage',
      description:
        'Transform core operations with hyper-scalable architectures, intelligent automation, and high-performance cloud engines engineered for mission-critical reliability.',
      primaryCtaText: 'Schedule a Demo',
      primaryCtaAction: 'demo',
      secondaryCtaText: 'Explore Platform',
      secondaryCtaLink: '#solutions',
      imageUrl:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'High performance global cloud infrastructure and networking',
    },
    {
      id: 2,
      badge: 'Autonomous AI & Machine Learning',
      title: 'Accelerate Innovation with Deep Learning Models Built for Scale',
      subtitle: 'Predictive • Intelligent • Automated',
      description:
        'Unlock hidden patterns and actionable business intelligence with real-time neural processing, predictive analytics, and enterprise generative AI workflows.',
      primaryCtaText: 'Request a Demo',
      primaryCtaAction: 'demo',
      secondaryCtaText: 'View AI Solutions',
      secondaryCtaLink: '#solutions',
      imageUrl:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'Abstract artificial intelligence neural network visualizing data flow',
       
    },
    {
      id: 3,
      badge: 'Zero-Trust Cybersecurity',
      title: 'Defense-Grade Security Designed for Dynamic Hybrid Multi-Cloud',
      subtitle: 'Continuous Threat Guard • Zero Vulnerability',
      description:
        'Protect your critical digital assets with automated real-time threat intelligence, continuous cryptographic identity verification, and rapid containment systems.',
      primaryCtaText: 'Get Protected Today',
      primaryCtaAction: 'demo',
      secondaryCtaText: 'Security Architecture',
      secondaryCtaLink: '#solutions',
      imageUrl:
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'Encrypted cyber security network with active threat monitoring',
       
    },
    {
      id: 4,
      badge: 'Developer Velocity & Modern DevOps',
      title: 'Streamlined Pipelines Engineered for Continuous Delivery and Scale',
      subtitle: 'Automated CI/CD • Microservices Ready',
      description:
        'Equip your engineering teams with unified deployment pipelines, automated Kubernetes orchestration, and instant observability dashboards out of the box.',
      primaryCtaText: 'Request Free Trial',
      primaryCtaAction: 'demo',
      secondaryCtaText: 'Browse Documentation',
      secondaryCtaLink: '#solutions',
      imageUrl:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop',
      imageAlt: 'Modern DevOps dashboard with real-time continuous deployment analytics',
      
    },
  ];

  /** Total number of slides */
  protected readonly totalSlides = computed(() => this.slides.length);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.startAutoplay();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.stopAutoplay();
    });
  }

  /** Advances to the next slide */
  protected nextSlide(): void {
    this.currentSlide.update((prev) => (prev + 1) % this.slides.length);
    this.restartAutoplay();
  }

  /** Moves to the previous slide */
  protected prevSlide(): void {
    this.currentSlide.update(
      (prev) => (prev - 1 + this.slides.length) % this.slides.length
    );
    this.restartAutoplay();
  }

  /** Jumps directly to a given slide */
  protected goToSlide(index: number): void {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlide.set(index);
      this.restartAutoplay();
    }
  }

  /** Toggles autoplay play/pause */
  protected togglePlay(): void {
    this.isPlaying.update((val) => !val);
    if (this.isPlaying()) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
  }

  /** Opens Demo Modal or handles CTA action */
  protected onPrimaryCta(slide: HeroSlide): void {
    this.demoModal.open({
      source: `Hero Slider - ${slide.badge}`,
    });
  }

  /** Smooth scroll to a section */
  protected onSecondaryCta(link: string): void {
    if (link.startsWith('#') && isPlatformBrowser(this.platformId)) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
  }

  protected onMouseEnter(): void {
    this.isHovered.set(true);
  }

  protected onMouseLeave(): void {
    this.isHovered.set(false);
  }

  protected onTouchStart(event: TouchEvent): void {
    if (event.touches && event.touches.length === 1) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  }

  protected onTouchEnd(event: TouchEvent): void {
    if (event.changedTouches && event.changedTouches.length === 1) {
      const diffX = event.changedTouches[0].clientX - this.touchStartX;
      const diffY = event.changedTouches[0].clientY - this.touchStartY;

      // Only trigger horizontal swipe if delta X is dominant
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    }
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    if (!this.isPlaying()) return;

    this.autoPlayTimer = setInterval(() => {
      // Pause advancing while mouse is hovered over slider
      if (!this.isHovered()) {
        this.nextSlide();
      }
    }, this.slideDuration);
  }

  private stopAutoplay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  private restartAutoplay(): void {
    if (this.isPlaying()) {
      this.startAutoplay();
    }
  }
}
