import { portfolioHealth, rankProjects } from './scoring.js';

export const createPortfolioSummary = (projects) => ({
  health: portfolioHealth(projects),
  ranked: rankProjects(projects),
});

export { portfolioHealth, rankProjects };
export { projectNavigationLabel, statusLabel } from './labels.js';
