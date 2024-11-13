import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  persistQueryClient,
  removeOldestQuery,
} from "@tanstack/react-query-persist-client";
import Homepage from "./pages/homepage/Homepage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 2000 * 60,
    },
  },
});

queryClient.clear();

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
      <Homepage />
    </QueryClientProvider>
  );
}

export default App;
