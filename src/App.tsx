import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  persistQueryClient,
  removeOldestQuery,
} from "@tanstack/react-query-persist-client";
import router from "./api/routes";
import { RouterProvider } from "@tanstack/react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 10,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  retry: removeOldestQuery,
});

persistQueryClient({
  queryClient,
  persister,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
