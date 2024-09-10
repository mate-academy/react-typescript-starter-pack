import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.scss';

import { App } from './App';

createRoot(document.getElementById('root') as HTMLDivElement).render(<App />);
