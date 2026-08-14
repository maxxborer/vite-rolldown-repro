import { average } from '../../shared/math/statistics.js';

export const projectScore = (project) => {
  const statusWeight = { active: 1, review: 0.82, paused: 0.45 }[project.status] ?? 0.5;
  return Math.round(project.progress * statusWeight + Math.min(project.budget / 10_000, 20));
};

export const rankProjects = (projects) => [...projects]
  .map((project) => ({ ...project, score: projectScore(project) }))
  .sort((a, b) => b.score - a.score);

export const portfolioHealth = (projects) => average(projects.map(projectScore));
