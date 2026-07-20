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

interface LaunchItem {
  item: string;
  why: string;
  owner: string;
}

interface FormAsset {
  title: string;
  file: string;
  purpose: string;
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

  partners = ['Voi', 'Framer', 'Juni', 'Monta', 'Bounce'];

  heroBars = [54, 68, 60, 77, 66, 53, 44, 59, 55, 67, 61, 78, 64, 52];

  pillars = [
    {
      label: 'Digital Presence',
      title: 'Be launch-ready before outreach',
      copy: 'From the readiness plan: one-page website on a custom domain, founder profile updated, and a professional domain email before the first message is sent.',
      link: 'View launch checklist',
      href: '#system',
    },
    {
      label: 'Internal Operations',
      title: 'Build the execution engine first',
      copy: 'CRM, service agreement, invoice template, and team workspace are marked critical so conversion does not stall after first contact.',
      link: 'See operational assets',
      href: '#assets',
    },
    {
      label: 'Sales Assets',
      title: 'Use concise send-ready documents',
      copy: 'The plan calls for a short capability deck, a cleaned pricing PDF, and a personalised proposal for Aeversa before launch day.',
      link: 'Review core forms',
      href: '#pricing',
    },
  ];

  launchChecklist: LaunchItem[] = [
    {
      item: 'Professional domain email live',
      why: 'Outreach from generic mail addresses hurts trust instantly in SA B2B.',
      owner: 'Founder',
    },
    {
      item: 'One-page site on custom domain',
      why: 'Every prospect will search your brand before replying.',
      owner: 'Web',
    },
    {
      item: 'Founder and company LinkedIn profiles updated',
      why: 'LinkedIn is the primary first-touch channel for pilot and prospects.',
      owner: 'Founder',
    },
    {
      item: 'CRM with Aeversa plus top 5 prospects',
      why: 'Without a tracker, outreach becomes chaotic by day two.',
      owner: 'Assistant',
    },
    {
      item: 'Pricing PDF and product PDF send-ready',
      why: 'Prospects ask for cost and process immediately after first positive reply.',
      owner: 'Assistant',
    },
    {
      item: 'Outreach schedule mapped Mon-Wed',
      why: 'Execution cadence prevents reactive follow-up gaps during launch week.',
      owner: 'Founder',
    },
  ];

  formAssets: FormAsset[] = [
    {
      title: 'The Persona Formula — Client Intake Form',
      file: 'TRN_PersonaFormula_Form.pdf',
      purpose: 'Captures target client profile, pain points, and qualification criteria before campaign planning.',
    },
    {
      title: 'The Platform — Selection and Targeting Brief',
      file: 'TRN_Platform_Form.pdf',
      purpose: 'Selects channels and audience strategy across Google, YouTube, Meta, and LinkedIn by awareness level.',
    },
    {
      title: 'The Sales Funnel — Funnel Architecture Brief',
      file: 'TRN_SalesFunnel_Form.pdf',
      purpose: 'Defines landing page, qualifier flow, and thank-you sequence for higher conversion intent.',
    },
    {
      title: 'Service Pricing Sheet',
      file: 'TRN_PricingSheet_v2.pdf',
      purpose: 'Client-facing pricing reference aligned to setup fee plus monthly retainer tiers.',
    },
    {
      title: 'ROF Growth System Product Deck',
      file: 'TRN_ROFGrowthSystem_Product_v3.pdf',
      purpose: 'Explains the full six-step system as a send-after-contact leave-behind document.',
    },
    {
      title: 'Pre-Launch Readiness Plan',
      file: 'TRN_PreLaunch_Readiness_Plan.docx',
      purpose: 'Four-day execution checklist covering digital presence, operations, assets, and outreach prep.',
    },
  ];

  heroCharts = [
    { label: 'Qualified leads', value: '50', width: 78 },
    { label: 'Cost per lead', value: 'R450', width: 42 },
    { label: 'ROAS', value: '13.33×', width: 88 },
  ];

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
            if (entry.target.id === 'dashboard-stage' && !this.dashboardInView) {
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
    const dashboardStage = document.querySelector('#dashboard-stage');
    if (dashboardStage) {
      this.observer.observe(dashboardStage);
    }
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
