import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: '',
        renderMode: RenderMode.Prerender,
    },
    {
        path: '**', // All other routes will be rendered on the server (SSR)
        renderMode: RenderMode.Server,
    },
];