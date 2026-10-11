import { SITE_URL } from '@/lib/markdown';

/**
 * OpenAPI description of the read-only public API behind the listings site.
 * Deliberately limited to endpoints that need no authentication and expose only
 * published data (the DTOs the website itself renders). Keep it in sync with
 * rentia-backend `public-properties.controller.ts` / `public-blog.controller.ts`.
 */
const money = {
  type: 'object',
  properties: { amount: { type: 'number' }, currency: { type: 'string', example: 'USD' } },
};

const property = {
  type: 'object',
  properties: {
    _id: { type: 'string', format: 'uuid' },
    title: { type: 'string' },
    address: { type: 'string' },
    barrio: { type: 'string' },
    province: { type: 'object', properties: { _id: { type: 'string' }, name: { type: 'string' } } },
    locality: { type: 'object', properties: { _id: { type: 'string' }, name: { type: 'string' } } },
    lat: { type: 'number' },
    lng: { type: 'number' },
    type: { type: 'string', example: 'DEPARTAMENTO' },
    status: { type: 'string', example: 'DISPONIBLE' },
    publishForSale: { type: 'boolean' },
    publishForRent: { type: 'boolean' },
    valueForSale: money,
    valueForRent: money,
    specs: {
      type: 'object',
      properties: {
        rooms: { type: 'integer' },
        bedrooms: { type: 'integer' },
        bathrooms: { type: 'integer' },
        garageCount: { type: 'integer' },
        totalSquareMeters: { type: 'number' },
        coveredSquareMeters: { type: 'number' },
      },
    },
    detailedDescription: { type: 'string', description: 'HTML' },
    createdAt: { type: 'string', format: 'date-time' },
  },
};

const page = (name: string) => ({
  name,
  in: 'query',
  schema: { type: 'integer', minimum: 0, default: 0 },
  description: 'Zero-based page index.',
});

const spec = {
  openapi: '3.1.0',
  info: {
    title: 'iPropietas public listings API',
    version: '1.0.0',
    description:
      'Read-only, unauthenticated access to published real-estate listings and blog posts. ' +
      'Only properties with status DISPONIBLE that are published for sale or rent are returned.',
  },
  servers: [{ url: SITE_URL }],
  paths: {
    '/api/v1/property/public': {
      get: {
        operationId: 'listProperties',
        summary: 'Search published properties',
        parameters: [
          page('page'),
          { name: 'pageSize', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 } },
          { name: 'type', in: 'query', schema: { type: 'string' }, description: 'Property type, e.g. casa, departamento.' },
          { name: 'operation', in: 'query', schema: { type: 'string', enum: ['sale', 'rent', 'all'], default: 'all' } },
          { name: 'locality', in: 'query', schema: { type: 'string' }, description: 'City id from /property/public/locations.' },
          { name: 'province', in: 'query', schema: { type: 'string' }, description: 'Province id.' },
          { name: 'address', in: 'query', schema: { type: 'string' }, description: 'Free-text address search.' },
          { name: 'sort', in: 'query', schema: { type: 'string', enum: ['createdAt', 'price_low', 'price_high'] } },
        ],
        responses: {
          '200': {
            description: 'A page of properties.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    items: { type: 'array', items: property },
                    meta: {
                      type: 'object',
                      properties: {
                        totalItems: { type: 'integer' },
                        itemCount: { type: 'integer' },
                        itemsPerPage: { type: 'integer' },
                        totalPages: { type: 'integer' },
                        currentPage: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/property/public/{id}': {
      get: {
        operationId: 'getProperty',
        summary: 'Get one published property',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          '200': { description: 'The property.', content: { 'application/json': { schema: property } } },
          '404': { description: 'Not found or not published.' },
        },
      },
    },
    '/api/v1/property/public/locations': {
      get: {
        operationId: 'listLocations',
        summary: 'Neighbourhoods and cities that currently have published properties',
        parameters: [{ name: 'type', in: 'query', schema: { type: 'string', enum: ['all', 'sale', 'rent'], default: 'all' } }],
        responses: {
          '200': {
            description: 'Selectable locations.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      value: { type: 'string', description: 'Opaque filter token, e.g. "barrio:Playa Magagna".' },
                      label: { type: 'string' },
                      city: { type: 'string' },
                      province: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/v1/blog/public': {
      get: {
        operationId: 'listBlogPosts',
        summary: 'Published blog posts',
        parameters: [
          page('page'),
          { name: 'pageSize', in: 'query', schema: { type: 'integer', minimum: 1, default: 10 } },
          { name: 'search', in: 'query', schema: { type: 'string' } },
          { name: 'category', in: 'query', schema: { type: 'string' } },
        ],
        responses: { '200': { description: 'A page of posts.', content: { 'application/json': { schema: { type: 'object' } } } } },
      },
    },
    '/api/v1/blog/public/{id}': {
      get: {
        operationId: 'getBlogPost',
        summary: 'Get one published blog post',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'The post.', content: { 'application/json': { schema: { type: 'object' } } } },
          '404': { description: 'Not found.' },
        },
      },
    },
  },
};

export function GET() {
  return new Response(JSON.stringify(spec, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
