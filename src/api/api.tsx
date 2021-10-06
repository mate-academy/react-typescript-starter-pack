export const BASE_URL = 'https://content.guardianapis.com/search?q=';

export const getData = async (query: string) => {
  const response = await fetch(`${BASE_URL}${query}&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=141f90d4-5cce-4f13-8f4e-2b6cf69cd8cb`);

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
};
