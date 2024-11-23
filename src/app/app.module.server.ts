import { ApplicationConfig, NgModule } from '@angular/core';
import { provideServerRendering, ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { serverRoutes } from './app.routes.server';
import { provideServerRoutesConfig } from '@angular/ssr';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig(serverRoutes)
  ]
})
export class AppServerModule {}
