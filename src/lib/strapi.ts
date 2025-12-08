/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const API_KEY = process.env.STRAPI_READ_ONLY_API_KEY;

type FetchOptions = {
  fields?: string[];
  populate?: Record<string, any>;
  filters?: Record<string, any>;
  sort?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
};

/**
 * Build Strapi query parameters from options object
 */
function buildStrapiQuery(options: FetchOptions = {}): string {
  const params = new URLSearchParams();

  // Fields
  if (options.fields) {
    options.fields.forEach(field => {
      params.append('fields[]', field);
    });
  }

  // Populate - Handle nested population
  if (options.populate) {
    Object.entries(options.populate).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Simple field array: populate[key][fields][]=field1
        value.forEach(field => {
          params.append(`populate[${key}][fields][]`, field);
        });
      } else if (typeof value === 'object' && value !== null) {
        // Nested object: populate[key][populate][subkey][fields][]=field1
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subKey === 'fields' && Array.isArray(subValue)) {
            subValue.forEach(field => {
              params.append(`populate[${key}][fields][]`, field);
            });
          } else if (subKey === 'populate' && typeof subValue === 'object') {
            Object.entries(subValue as Record<string, string[]>).forEach(([nestedKey, nestedFields]) => {
              if (Array.isArray(nestedFields)) {
                nestedFields.forEach(field => {
                  params.append(`populate[${key}][populate][${nestedKey}][fields][]`, field);
                });
              }
            });
          }
        });
      } else if (value === '*') {
        // populate[key]=*
        params.append(`populate[${key}]`, '*');
      }
    });
  }

  // Filters
  if (options.filters) {
    Object.entries(options.filters).forEach(([key, value]) => {
      params.append(`filters[${key}]`, String(value));
    });
  }

  // Sort
  if (options.sort) {
    options.sort.forEach((sortField, index) => {
      params.append(`sort[${index}]`, sortField);
    });
  }

  // Pagination
  if (options.pagination) {
    if (options.pagination.page) {
      params.append('pagination[page]', String(options.pagination.page));
    }
    if (options.pagination.pageSize) {
      params.append('pagination[pageSize]', String(options.pagination.pageSize));
    }
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Base fetch function for Strapi API
 */
export async function fetchStrapi(path: string, options: RequestInit = {}) {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_STRAPI_URL is not defined');
  }

  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(API_KEY && { Authorization: `Bearer ${API_KEY}` }),
      ...(options.headers || {}),
    },
    next: {
      revalidate: 60,
      ...(options.next || {}),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Strapi Fetch Error:', errorText);
    throw new Error(`Failed to fetch Strapi data: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Fetch Strapi API with query builder
 * Combines path building with query parameters
 */
export async function fetchStrapiAPI(
  endpoint: string,
  queryOptions: FetchOptions = {},
  fetchOptions: RequestInit = {}
) {
  const query = buildStrapiQuery(queryOptions);
  const path = `${endpoint}${query}`;

  return fetchStrapi(path, fetchOptions);
}