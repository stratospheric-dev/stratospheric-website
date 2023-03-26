import { createRoot } from 'react-dom/client';

const PromptApp = () => {
  return (
    <button onClick={sayHello}>Click me!</button>
  )
}

const root = createRoot(document.getElementById('prompt'));
root.render(<PromptApp/>);
