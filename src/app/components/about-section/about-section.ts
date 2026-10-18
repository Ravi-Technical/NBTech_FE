import { Component, inject, signal } from '@angular/core';
import { DemoModalService } from '../../shared/demo-modal.service';

export interface ItPillar {
  id: string;
  title: string;
  shortLabel: string;
  tagline: string;
  description: string;
  technologies: string[];
  deliverables: string[];
  icon: 'cloud' | 'shield' | 'ai' | 'devops';
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-about-section',
  imports: [],
  templateUrl: './about-section.html',
  styleUrl: './about-section.scss',
})
export class AboutSection {
  private readonly demoModal = inject(DemoModalService);

  /** Active IT service pillar tab index */
  protected readonly activeTab = signal<number>(0);

  /** Key professional IT impact metrics */
  protected readonly metrics: MetricItem[] = [
    {
      value: '15+',
      label: 'Years of IT Excellence',
      description: 'Engineering tier-1 mission-critical enterprise systems globally.',
    },
    {
      value: '250+',
      label: 'Certified Architects',
      description: 'Senior multi-cloud, security, and machine learning practitioners.',
    },
    {
      value: '99.98%',
      label: 'SLA Delivery Rate',
      description: 'Continuous uptime and guaranteed recovery across hybrid stacks.',
    },
    {
      value: '50M+',
      label: 'Daily Secured Calls',
      description: 'High-throughput workloads protected by zero-trust policies.',
    },
  ];

  /** IT Professional Service Pillars */
  protected readonly pillars: ItPillar[] = [
    {
      id: 'cloud',
      title: 'Cloud Transformation & Hybrid Infrastructure',
      shortLabel: 'Cloud Systems',
      tagline: 'Modernize, Migrate, and Scale Effortlessly',
      description:
        'We architect fault-tolerant, elastic multi-cloud environments across AWS, Azure, and GCP. Our engineers deliver zero-downtime database migrations, microservice modernization, and automated cost optimization.',
      technologies: ['AWS / Azure / GCP', 'Kubernetes', 'Terraform', 'Microservices', 'FinOps'],
      deliverables: [
        'Cloud-native architecture blueprints & automated migration',
        'FinOps continuous cost governance & license reduction',
        'Multi-region high availability and automated disaster recovery',
      ],
      icon: 'cloud',
    },
    {
      id: 'security',
      title: 'Enterprise Cybersecurity & Zero-Trust Architecture',
      shortLabel: 'Cybersecurity',
      tagline: 'Defense-in-Depth for Mission-Critical Data',
      description:
        'Protect your organization against sophisticated cyber threats. We implement zero-trust access, continuous vulnerability scanning, cryptographic data protection, and automated incident response.',
      technologies: ['SOC 2 Type II', 'ISO 27001', 'SIEM / SOAR', 'Zero Trust IAM', 'WAF / DDoS'],
      deliverables: [
        '24/7/365 Security Operations Center (SOC) telemetry',
        'Penetration testing & regulatory compliance auditing',
        'Zero-trust network architecture and endpoint quarantine',
      ],
      icon: 'shield',
    },
    {
      id: 'devops',
      title: 'DevOps Velocity & Site Reliability Engineering (SRE)',
      shortLabel: 'DevOps & SRE',
      tagline: 'Ship High-Quality Code with Absolute Confidence',
      description:
        'Accelerate delivery cycles while eliminating production outages. We build self-healing deployment pipelines, container orchestration, and comprehensive telemetry systems out of the box.',
      technologies: ['Docker / K8s', 'GitOps / ArgoCD', 'Prometheus & Grafana', 'OpenTelemetry'],
      deliverables: [
        'Zero-downtime automated deployment pipelines (CI/CD)',
        'End-to-end distributed observability and trace dashboards',
        'Infrastructure-as-Code (IaC) drift detection and self-healing',
      ],
      icon: 'devops',
    },
  ];

  /** Industry certifications & partner badges */
  protected readonly certifications = [
    'AWS Advanced Tier Partner',
    'Microsoft Cloud Partner',
    'Google Cloud Certified',
    'SOC 2 Type II Verified',
    'ISO/IEC 27001 Certified',
    'Kubernetes Certified (CKA)',
  ];

  protected selectTab(index: number): void {
    this.activeTab.set(index);
  }

  protected consultSpecialist(): void {
    const current = this.pillars[this.activeTab()];
    this.demoModal.open({
      source: `IT Professional Section - ${current?.title ?? 'Consultation'}`,
    });
  }
}


