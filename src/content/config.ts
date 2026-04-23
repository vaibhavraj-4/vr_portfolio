import { defineCollection, z } from 'astro:content';

// ==================================================================
// HERO — single document (we use a collection with one entry for flexibility)
// ==================================================================
const hero = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string().default('Vaibhav Raj'),
    role: z.string().default('AI/ML Engineer · ATH Infosystems'),
    tagline: z.string().default('Programmer / Developer / Creator'),
    status: z.string().default('Engaged · SINTRA Phase 1 of 10'),
  }),
});

// ==================================================================
// ABOUT — typed.js strings + prose blocks
// ==================================================================
const about = defineCollection({
  type: 'data',
  schema: z.object({
    typedStrings: z.array(z.string()).default([]),
    blocks: z.array(
      z.object({
        heading: z.string(),
        body: z.string(), // markdown-ish; rendered as HTML-safe paragraphs
      })
    ).default([]),
  }),
});

// ==================================================================
// SKILLS — list of skill items with icon + name + order
// ==================================================================
const skills = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    icon: z.string(), // path relative to /public, e.g. /icons/python-logo.png
    category: z.enum(['Languages', 'Data & ML', 'Infra', 'APIs & LLMs', 'Other']).default('Other'),
    order: z.number().default(100),
  }),
});

// ==================================================================
// JOURNEY — timeline entries
// ==================================================================
const journey = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(), // e.g. "AI/ML Engineer"
    org: z.string(),   // e.g. "ATH Infosystems"
    dateRange: z.string(), // e.g. "November 2025 — Present"
    location: z.string().optional(),
    description: z.string(),
    skills: z.array(z.string()).default([]),
    logo: z.string().optional(), // /icons/ath-logo.png
    order: z.number().default(100),
    side: z.enum(['left', 'right']).default('left'),
    current: z.boolean().default(false),
  }),
});

// ==================================================================
// PROJECTS
// ==================================================================
const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    status: z.enum(['Active', 'Shipped', 'Archived']).optional(),
    statusLabel: z.string().optional(), // "Active · Phase 1 of 10"
    section: z.enum([
      'Production Work',
      'Internship',
      'Academic ML',
      'For Fun',
    ]).default('Academic ML'),
    summary: z.string(),
    description: z.string(), // full markdown-ish body
    image: z.string().optional(),
    link: z.string().optional(),
    linkLabel: z.string().default('View project →'),
    tags: z.array(z.string()).default([]),
    order: z.number().default(100),
    featured: z.boolean().default(false),
  }),
});

// ==================================================================
// CERTIFICATES
// ==================================================================
const certificates = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    issuer: z.string().optional(),
    image: z.string(),
    link: z.string().optional(),
    order: z.number().default(100),
  }),
});

// ==================================================================
// AWARDS
// ==================================================================
const awards = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    link: z.string().optional(),
    order: z.number().default(100),
  }),
});

// ==================================================================
// ACTIVITIES
// ==================================================================
const activities = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    link: z.string().optional(),
    order: z.number().default(100),
  }),
});

// ==================================================================
// CONTACT — single document
// ==================================================================
const contact = defineCollection({
  type: 'data',
  schema: z.object({
    headline: z.string().default("Let's build something precise."),
    lead: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    instagram: z.string().url().optional(),
    facebook: z.string().url().optional(),
    location: z.string().default('Delhi NCR, India · Remote-friendly'),
    resumeUrl: z.string().default('/resume.pdf'),
  }),
});

export const collections = {
  hero,
  about,
  skills,
  journey,
  projects,
  certificates,
  awards,
  activities,
  contact,
};
