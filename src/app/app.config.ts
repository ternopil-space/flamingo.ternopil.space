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
			lightTokens: {
				primary: '#8b6f47',
				primaryHover: '#6b5344',
				secondary: '#e0708f',
				secondaryHover: '#c8546f',
				bgPrimary: '#faf8f5',
				bgSecondary: '#f5ede3',
				bgTertiary: '#e8dccf',
				textPrimary: '#6b5344',
				textSecondary: '#5a4a3a',
				textMuted: '#8b6f47',
				placeholder: '#8b6f47b3',
				border: '#d9c9bc',
				shadowSm: '0 1px 2px rgba(107, 83, 68, 0.08)',
				shadowMd: '0 6px 18px rgba(107, 83, 68, 0.12)',
				focusRing: '0 0 0 3px rgba(224, 112, 143, 0.45)',
			},
			darkTokens: {
				primary: '#c9a876',
				primaryHover: '#dbbf95',
				secondary: '#f2839f',
				secondaryHover: '#f5a0b8',
				bgPrimary: '#221a14',
				bgSecondary: 'rgba(42, 32, 25, 0.9)',
				bgTertiary: '#2e241b',
				textPrimary: '#d9c6b0',
				textSecondary: '#f5ebdd',
				textMuted: '#b39a7d',
				placeholder: '#b39a7dcc',
				border: '#4a3b2c',
				shadowSm: '0 1px 2px rgba(0, 0, 0, 0.35)',
				shadowMd: '0 10px 30px rgba(0, 0, 0, 0.5)',
				focusRing: '0 0 0 3px rgba(242, 131, 159, 0.3)',
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
