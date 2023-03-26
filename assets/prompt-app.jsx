// import { createRoot } from 'react-dom/client';
import * as React from 'react'
import * as ReactDOM from 'react-dom'

const PromptApp = () => {
  return <StratosphericPrompt />
}

ReactDOM.render(
  React.createElement(PromptApp, null),
  document.getElementById('prompt')
)

// const root = createRoot(document.getElementById('prompt'));
// root.render(<PromptApp/>);
