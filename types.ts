import { LucideIcon } from 'lucide-react';
import React from 'react';

// Global declaration for React Three Fiber to fix JSX IntrinsicElements errors
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      directionalLight: any;
      group: any;
      mesh: any;
      primitive: any;
      boxGeometry: any;
      planeGeometry: any;
      torusGeometry: any;
      octahedronGeometry: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      meshDistortMaterial: any;
    }
  }
}

// Module augmentation for 'react' to support newer TS/React versions
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      directionalLight: any;
      group: any;
      mesh: any;
      primitive: any;
      boxGeometry: any;
      planeGeometry: any;
      torusGeometry: any;
      octahedronGeometry: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      meshDistortMaterial: any;
    }
  }
}

export enum ServiceCategory {
  SOFTWARE = 'software',
  ROBOTICS = 'robotics',
  MECHANICAL = 'mechanical',
  BRANDING = 'branding',
}

export interface WorkflowStep {
  title: string;
  duration: string;
  description: string;
  deliverables?: string[];
  tools?: string[];
}

export interface SubService {
  title: string;
  description: string;
  tools: string[];
}

export interface ServiceData {
  id: ServiceCategory;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  subServices: SubService[];
  workflow: string[]; // Kept for backward compatibility if needed
  detailedWorkflow: WorkflowStep[];
  outOfBox: string[];
  targetAudience: string[];
  colorTheme: 'blue' | 'purple' | 'green' | 'orange';
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  clientType: string;
  category: ServiceCategory;
  summary: string;
  challenge: string;
  solution: string;
  impact: string[];
  tools: string[];
  imageUrl: string;
  testimonial?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  clientType: string;
  serviceTags: string[];
  description: string;
  imageUrl: string;
  category: ServiceCategory;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: React.ReactNode; 
  date: string;
  category: string;
  readTime: string;
  imageUrl: string;
  author: string;
  tags?: string[];
}

export interface Founder {
  id: number;
  name: string;
  role: string;
  title?: string;
  background: string;
  bio: string;
  linkedin: string;
  image: string;
  expertise?: string[];
  skills?: { name: string; level: number }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  projectType: string;
  avatarUrl?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}