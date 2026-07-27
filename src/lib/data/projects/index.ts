export type { ProjectCategory, ProjectResult, Project } from './types';
import type { Project } from './types';
import { projectsPart1 } from './part1';
import { projectsPart2 } from './part2';

const serviceLandingTemplate = projectsPart2.find(p => p.id === 'service-landing-template');
const smartMenu = projectsPart2.find(p => p.id === 'smart-menu');
const aiOrchestrator = projectsPart2.find(p => p.id === 'ai-orchestrator');

export const projects: Project[] = [...projectsPart1, ...(serviceLandingTemplate ? [serviceLandingTemplate] : []), ...(smartMenu ? [smartMenu] : []), ...(aiOrchestrator ? [aiOrchestrator] : [])];
