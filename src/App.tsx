import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import '@assets/css/style.css';
import { LayoutProvider } from '@common/providers/LayoutProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <RouterProvider router={router} />
      </LayoutProvider>
    </QueryClientProvider>
  );
}

export default App;
