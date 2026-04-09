import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PageNotFoundComponent } from './page-not-found.component';
import { SharedModule } from './shared/shared.module';

import { registerLocaleData } from '@angular/common';
import localeUk from "@angular/common/locales/uk";
import { parserProviders } from './link-parser/data-access/parser.providers';
import { languageConfigProvider } from './shared/data-access/lang.provider';

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
            registrationStrategy: 'registerWhenStable:30000'
        }),
        SharedModule],
    providers: [
        languageConfigProvider,
        provideHttpClient(withFetch()),
        ...parserProviders,
    ]
})
export class AppModule { }
