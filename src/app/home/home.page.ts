import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

interface ProcessStep {
  num: string;
  title: string;
  copy: string;
}

interface ProblemItem {
  label: string;
  copy: string;
}

interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  dark?: boolean;
  accent?: string;
  features: { text: string; included: boolean }[];
  bestFor: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonContent],
})
export class HomePage implements AfterViewInit, OnDestroy {
  @ViewChild(IonContent) ionContent!: IonContent;

  // ---- Content, drawn from the ROF Growth System docs ----
  steps: ProcessStep[] = [
    { num: '01', title: 'The Persona Formula', copy: 'Define your dream client, qualify them precisely, craft messaging that speaks directly to their pain.' },
    { num: '02', title: 'The Platform', copy: 'Choose the right channels — Google, YouTube, Meta, LinkedIn — based on your persona\u2019s awareness level.' },
    { num: '03', title: 'The Offer', copy: 'Build an irresistible value ladder from free/low-cost entry to high-ticket engagement.' },
    { num: '04', title: 'The Sales Funnel', copy: 'A 3-step conversion funnel: Sales Landing Page \u2192 Qualifier Pop-up \u2192 Thank You Page \u2014 integrated with CRM.' },
    { num: '05', title: 'The Sales Process', copy: 'Custom CRM + UTM tracking so your sales team only touches qualified leads \u2014 and you see where every lead comes from.' },
    { num: '06', title: 'Optimisation', copy: 'Continuous 90-day sprint cycles using a Traffic Light System to improve results month over month.' },
  ];

  problems: ProblemItem[] = [
    { label: 'No Persona Clarity', copy: 'Chasing the wrong prospects wastes ad spend and sales hours.' },
    { label: 'Weak Offer Architecture', copy: 'Trust is low online. Going straight for the sale kills conversion.' },
    { label: 'No Qualification System', copy: 'Sales teams spend time on leads that will never close.' },
    { label: 'Spreadsheet CRM', copy: 'No follow-up automation, no insight into lead sources, no ROI visibility.' },
    { label: 'No Funnel \u2014 Just a Website', copy: 'Websites convert at 1\u20133%. A dedicated sales funnel converts at 5\u201310%.' },
    { label: 'No Optimisation Loop', copy: 'Without data, the same mistakes repeat indefinitely.' },
  ];

  pricing: PricingTier[] = [
    {
      name: 'Starter', tagline: 'Entry-level growth system', price: 'R20,000',
      features: [
        { text: 'Full 6-step ROF Growth System build', included: true },
        { text: '1\u20132 Google Search Ads campaigns', included: true },
        { text: 'Sales funnel \u2014 landing, qualifier, thank you', included: true },
        { text: 'Basic CRM setup + UTM tracking', included: true },
        { text: 'Monthly performance report', included: true },
        { text: 'LinkedIn Ads', included: false },
        { text: 'Automated follow-up sequences', included: false },
      ],
      bestFor: 'SMEs with a R5K\u2013R15K/month Google Ads budget building their first structured lead gen system.'
    },
    {
      name: 'Growth', tagline: 'Most popular \u2014 full system', price: 'R30,000', accent: 'orange',
      features: [
        { text: 'Everything in Starter, plus:', included: true },
        { text: 'Google Search + LinkedIn (multi-channel)', included: true },
        { text: 'CRM + WhatsApp/email automation', included: true },
        { text: 'Funnel A/B testing + heatmaps', included: true },
        { text: 'Lead qualification scoring', included: true },
        { text: 'Competitor intelligence monitoring', included: false },
        { text: 'Dedicated account manager', included: false },
      ],
      bestFor: 'Growing SMEs spending R15K\u2013R40K/month on ads who need a fully managed system.'
    },
    {
      name: 'Scale', tagline: 'Full-service growth partnership', price: 'R45,000', dark: true,
      features: [
        { text: 'Everything in Growth, plus:', included: true },
        { text: 'Full multi-platform ad management', included: true },
        { text: 'Weekly calls + dedicated account manager', included: true },
        { text: 'Competitor monitoring + market intel', included: true },
        { text: 'Full funnel rebuild every 90-day sprint', included: true },
        { text: 'Live ROI dashboard (real-time)', included: true },
        { text: 'Priority support \u2014 2 hour response', included: true },
      ],
      bestFor: 'Established SMEs spending R40K+/month who want a weekly-accountable growth partner.'
    },
  ];

  // ---- Dashboard demo state ----
  trafficLights = [
    { label: 'Ad CTR', state: 'green' as 'green' | 'red' | 'amber' },
    { label: 'Landing Page', state: 'red' as 'green' | 'red' | 'amber' },
    { label: 'Thank You Page', state: 'amber' as 'green' | 'red' | 'amber' },
    { label: 'Sales Close', state: 'green' as 'green' | 'red' | 'amber' },
  ];

  metrics = [
    { label: 'Leads Generated', from: 25, to: 50, value: 25, suffix: '' },
    { label: 'Cost Per Lead', from: 800, to: 450, value: 800, prefix: 'R' },
    { label: 'ROAS', from: 5.97, to: 13.33, value: 5.97, suffix: '\u00d7', decimals: 2 },
  ];

  dashboardInView = false;
  private lightTimer: any;
  private countTimer: any;

  @ViewChild('dashboardAnchor') dashboardAnchor!: ElementRef;

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const revealEls = document.querySelectorAll('.reveal');
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            if (entry.target.id === 'dashboard-panel' && !this.dashboardInView) {
              this.dashboardInView = true;
              this.animateMetrics();
              this.cycleTrafficLights();
            }
          }
        });
      },
      { threshold: 0.25 }
    );
    revealEls.forEach((el) => this.observer!.observe(el));
  }

  private animateMetrics() {
    const duration = 1400;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      this.metrics = this.metrics.map((m) => ({
        ...m,
        value: m.from + (m.to - m.from) * eased,
      }));
      if (t < 1) {
        this.countTimer = requestAnimationFrame(step);
      }
    };
    this.countTimer = requestAnimationFrame(step);
  }

  private cycleTrafficLights() {
    const states: Array<'green' | 'red' | 'amber'> = ['red', 'amber', 'green'];
    this.lightTimer = setInterval(() => {
      this.trafficLights = this.trafficLights.map((l, i) => {
        const currentIdx = states.indexOf(l.state);
        const nextIdx = (currentIdx + 1 + i) % states.length;
        return { ...l, state: states[nextIdx] };
      });
    }, 2200);
  }

  formatMetric(m: { value: number; prefix?: string; suffix?: string; decimals?: number }): string {
    const val = m.decimals ? m.value.toFixed(m.decimals) : Math.round(m.value).toLocaleString();
    return `${m.prefix ?? ''}${val}${m.suffix ?? ''}`;
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.lightTimer) clearInterval(this.lightTimer);
    if (this.countTimer) cancelAnimationFrame(this.countTimer);
  }
}
