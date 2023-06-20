import { createRoot } from 'react-dom/client';
import { App } from './App';

const rootTag = document.querySelector('#root');
const root = createRoot(rootTag as HTMLElement);

import './index.css';
import './styles/bootstrap.min.css';

root.render(
    <>
        <App />
    </>
);