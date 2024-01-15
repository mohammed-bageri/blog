import { contract } from '@myapp/contracts';
import { initQueryClient } from '@ts-rest/react-query';

export const client = initQueryClient(contract, {
  baseUrl: import.meta.env.VITE_API_URL,
  baseHeaders: {},
});
