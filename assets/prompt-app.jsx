import { createRoot } from 'react-dom/client';

const PromptApp = () => {
  return <StratosphericPrompt />
}

const root = createRoot(document.getElementById('prompt'));
root.render(<PromptApp/>);
