import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

interface StepCard {
  num: string;
  icon: string;
  title: string;
  copy: string;
  output: string;
}

interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  featured?: boolean;
  features: string[];
  bestFor: string;
}

interface FormAsset {
  label: string;
  title: string;
  copy: string;
  file: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [CommonModule, IonContent],
})
export class HomePage implements AfterViewInit, OnDestroy {
  scrollProgress = 0;
  morphProgress = 0;
  private observer?: IntersectionObserver;

  leadBars = [38, 54, 46, 66, 58, 72, 62, 81, 75, 92];

  steps: StepCard[] = [
    { num: '01', icon: '◎', title: 'The Persona Formula', copy: 'Define the dream client, their pain, desired outcome and the exact BANT criteria that separates qualified from bad-fit leads.', output: 'Dream Client Dashboard' },
    { num: '02', icon: '⌁', title: 'The Platform', copy: 'Choose Google, YouTube, Meta or LinkedIn from the persona’s awareness level, intent and where they spend time online.', output: 'Channel & Targeting Plan' },
    { num: '03', icon: '◇', title: 'The Offer', copy: 'Build a value ladder from a zero-friction entry offer to the core, premium and high-ticket engagement.', output: 'Irresistible Offer Ladder' },
    { num: '04', icon: '↳', title: 'The Sales Funnel', copy: 'Create one focused path: Sales Landing Page → Qualifier Pop-up → Thank You Page → CRM.', output: '3-Step Conversion Funnel' },
    { num: '05', icon: '◫', title: 'The Sales Process', copy: 'Connect qualified leads to a CRM, UTM attribution and automated WhatsApp, email and SMS follow-up.', output: 'Live Sales Pipeline' },
    { num: '06', icon: '↗', title: 'Optimisation', copy: 'Run continuous 90-day sprints with a Traffic Light Machine that flags the biggest growth bottleneck.', output: 'ROI Dashboard & Sprint Plan' },
  ];

  problems = [
    { label: 'No persona clarity', copy: 'Chasing the wrong prospects wastes ad spend and sales hours.' },
    { label: 'Weak offer architecture', copy: 'Going straight for the sale creates friction before trust exists.' },
    { label: 'No qualification system', copy: 'Sales teams spend time on leads that will never close.' },
    { label: 'Spreadsheet CRM', copy: 'Follow-up, attribution and revenue visibility disappear between tabs.' },
    { label: 'A website instead of a funnel', copy: 'General pages distract; one offer and one CTA focus conversion.' },
    { label: 'No optimisation loop', copy: 'Without live data, the same expensive mistakes repeat indefinitely.' },
  ];

  results = [
    { label: 'Ad CTR', before: '0.7%', after: '1.5%', width: 72 },
    { label: 'Landing page conversion', before: '7.15%', after: '12%+', width: 82 },
    { label: 'Leads generated', before: '25', after: '50+', width: 88 },
    { label: 'Sales closed', before: '0', after: '8+', width: 94 },
  ];

  pricing: PricingTier[] = [
    {
      name: 'Starter', tagline: 'Entry-level growth system', price: 'R20,000',
      features: ['Full 6-step system build', '1–2 Google Search campaigns', '3-page sales funnel', 'Basic CRM + UTM tracking', 'Monthly report and strategy call'],
      bestFor: 'SMEs with a R5K–R15K monthly ad budget building their first structured lead-generation system.',
    },
    {
      name: 'Growth', tagline: 'Complete managed system', price: 'R30,000', featured: true,
      features: ['Everything in Starter', 'Google Search + LinkedIn Ads', 'WhatsApp and email automation', 'Funnel A/B testing + heatmaps', 'Lead qualification scoring'],
      bestFor: 'Growing SMEs spending R15K–R40K monthly who need a complete, managed lead-generation system.',
    },
    {
      name: 'Scale', tagline: 'Full-service growth partnership', price: 'R45,000',
      features: ['Everything in Growth', 'Full multi-platform management', 'Dedicated account manager', 'Competitor and market intelligence', 'Live ROI dashboard + weekly calls'],
      bestFor: 'Established SMEs spending R40K+ monthly that want full execution and weekly accountability.',
    },
  ];

  forms: FormAsset[] = [
    {
      label: 'Client Intake',
      title: 'Persona Formula',
      copy: 'Capture the dream client, pain points, outcomes and qualification criteria before any discovery call.',
      file: 'assets/docs/TRN_PersonaFormula_Form.pdf',
    },
    {
      label: 'Channel Brief',
      title: 'Platform Selection',
      copy: 'Choose the right platform based on awareness level, intent and where prospects already spend time.',
      file: 'assets/docs/TRN_Platform_Form.pdf',
    },
    {
      label: 'Funnel Brief',
      title: 'Sales Funnel',
      copy: 'Map the conversion path from landing page to CRM so the team can build without ambiguity.',
      file: 'assets/docs/TRN_SalesFunnel_Form.pdf',
    },
  ];

  onPageScroll(event: CustomEvent): void {
    const top = Number((event as any).detail?.scrollTop ?? 0);
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    this.scrollProgress = Math.min(1, top / max);
    this.morphProgress = Math.min(1, Math.max(0, top / (window.innerHeight * 0.9)));
  }

  ngAfterViewInit(): void {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = document.querySelectorAll('.reveal');
    if (reducedMotion) {
      elements.forEach((el) => el.classList.add('in'));
      return;
    }
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          this.observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    elements.forEach((el) => this.observer?.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
