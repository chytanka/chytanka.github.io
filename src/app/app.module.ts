import { NgModule, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PageNotFoundComponent } from './page-not-found.component';
import { SharedModule } from './shared/shared.module';

import { registerLocaleData } from '@angular/common';
import localeUk from "@angular/common/locales/uk";
import { parserProviders } from './link-parser/data-access/parser.providers';

registerLocaleData(localeUk)

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        SharedModule],
    providers: [
        // provideZoneChangeDetection({ eventCoalescing: true }),
        // provideClientHydration(withEventReplay(),
        //     withHttpTransferCacheOptions({
        //         includePostRequests: false,
        //     })
        // ),
        provideHttpClient(withFetch()),
        // ...parserProviders
    ]
})
export class AppModule { }
