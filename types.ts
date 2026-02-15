
export interface Service {
  id: string;
  title: string;
  category: string;
  oneLiner: string;
  description: string;
  longDescription: string;
  features: string[];
  icon: string;
  tags: string[];
  microMetrics: string[];
  visualHint: string;
  metrics?: { label: string; value: string }[];
  link?: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  image: string;
  stats: { label: string; value: string }[];
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  kpi: string;
  compliance: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

export enum WizardStep {
  SECTOR = 0,
  NEEDS = 1,
  SCALE = 2,
  SLA = 3,
  CONTACT = 4
}
