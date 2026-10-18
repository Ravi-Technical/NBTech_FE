import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router'; 
import { DemoModalService } from '../../../shared/demo-modal.service';

@Component({
  selector: 'app-hero-welcome',
  imports: [RouterLink],
  templateUrl: './hero-welcome.component.html',
  styleUrl: './hero-welcome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroWelcomeComponent {
  private readonly demoModal = inject(DemoModalService);

  protected readonly services = [
    'Cloud & DevOps',
    'Cybersecurity',
    'Custom software',
    '24/7 IT support',
  ];

  protected openDemo(): void {
    this.demoModal.open({ source: 'hero' }).subscribe();
  }
}