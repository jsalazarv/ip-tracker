import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '@assets/css/style.css';
import { LayoutProvider } from '@common/providers/LayoutProvider';

function App() {
  return (
    <LayoutProvider>
      <RouterProvider router={router} />
    </LayoutProvider>
  );
}

export default App;
