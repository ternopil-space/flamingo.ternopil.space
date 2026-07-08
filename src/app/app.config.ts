import {
	APP_INITIALIZER,
	ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection,
} from '@angular/core';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideNgxCore } from '@wawjs/ngx-core';
import { provideNgxHttp } from '@wawjs/ngx-http';
import { provideTranslate } from '@wawjs/ngx-translate';
import { provideNgxUi } from '@wawjs/ngx-ui';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { BootstrapService } from './feature/bootstrap/bootstrap.service';
import { companyProfile } from './feature/company/company.data';
import { buildAbsoluteUrl, seoTitleSuffix, stripTitleSuffix } from './services/seo.utils';

const initializeBootstrapData = (bootstrapService: BootstrapService) => () =>
	bootstrapService.initialize();

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(
			routes,
			withRouterConfig({
				onSameUrlNavigation: 'reload',
			}),
		),
		provideHttpClient(withFetch()),
		provideNgxHttp({
			http: {
				url: environment.apiUrl,
			},
		}),
		provideClientHydration(withEventReplay()),
		provideNgxCore({
			meta: {
				applyFromRoutes: true,
				useTitleSuffix: true,
				defaults: {
					title: stripTitleSuffix(companyProfile.defaultSeo.title),
					titleSuffix: seoTitleSuffix,
					description: companyProfile.defaultSeo.description,
					image: buildAbsoluteUrl(companyProfile.defaultSeo.image),
					robots: companyProfile.defaultSeo.robots,
				},
			},
		}),
		provideTranslate({
			defaultLanguage: environment.defaultLanguage,
			languages: environment.languages,
			folder: '/i18n/',
		}),
		provideNgxUi({
			mode: 'light',
			modes: ['light', 'dark'],
			density: 'comfortable',
			densities: ['comfortable', 'compact'],
			radius: 'rounded',
			radiuses: ['rounded', 'square'],
			tokens: {
				ffBase: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
				letterSpacing: '0',
				motion: '0.25s',
				motionFast: '0.15s',
				easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
			},
			compactTokens: {
				sp1: '2px',
				sp2: '6px',
				sp3: '10px',
				sp4: '14px',
				sp5: '18px',
				sp6: '22px',
			},
			roundedTokens: {
				radius: '8px',
				radiusCard: '10px',
				radiusBtn: '8px',
			},
			squareTokens: {
				radius: '0px',
				radiusCard: '0px',
				radiusBtn: '0px',
			},
		}),
		{
			provide: APP_INITIALIZER,
			useFactory: initializeBootstrapData,
			deps: [BootstrapService],
			multi: true,
		},
	],
};
