import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: '**', // All other routes will be rendered on the server (SSR)
        renderMode: RenderMode.Server,
    },
];