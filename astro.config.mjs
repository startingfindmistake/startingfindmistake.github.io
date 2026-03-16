// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({

	site: 'https://startingfindmistake.github.io',

	integrations: [
		starlight({
			title: 'Starting Find Mistake',

			head: [
				{
					tag: 'meta',
					attrs: {
						name: 'google-site-verification',
						content: 'tDADCh4tjNdsfpCotMR9twDLQ37pJKsAW4U-hYM8TZ0',
					},
				},
			],


			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/startingfindmistake' }],
			sidebar: [
				{
					label: '메뉴',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: '블로그 소개글', slug: 'hello' },
					],
				},
				{
					label: 'java',
					autogenerate: { directory: 'java_language' },
				},
				{
					label: 'GitHub 뉴스 요약본',
					autogenerate: { directory: 'github_news' },
				},
				{
					label: 'conversation with english',
					autogenerate: { directory: 'conversation_en'},
				},
				{
					label: 'SpringBoot',
					autogenerate: { directory: 'springboot'},
				},
				{
					label: 'baekjoon_java',
					autogenerate: { directory: 'baekjoon_java'},
				},
				{
					label: 'machine learning',
					autogenerate: { directory: 'machine_learning'},
				},




				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
