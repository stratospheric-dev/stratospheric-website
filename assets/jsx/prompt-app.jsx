import * as React from 'react'
import * as ReactDOMClient from 'react-dom/client';

import StratosphericPrompt from './stratospheric-prompt';

const PromptApp = () => {
  return <StratosphericPrompt />;
}

const root = ReactDOMClient.createRoot(document.getElementById('prompt'));
root.render(<StratosphericPrompt />);
