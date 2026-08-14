import { shell } from './shared/shell.js';

shell();

window.loadLight = () => import('./routes/light.js');
window.loadHeavy = () => import('./routes/heavy.js');
window.loadReports = () => import('./routes/reports.js');
