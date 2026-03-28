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
				{
					tag: 'meta',
					attrs: {
						name: 'google-site-verification',
						content: '3EkjzPipCcEdMUzElwwDATaN0LOThltrddfxudrKViM',
					},
				},
				{
					tag: 'script',
					attrs: {
						async: true, //비동기 로드
						src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6449334868265557',
						crossorigin: 'anonymous',
					},
				}
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
					label: 'java_framework',
					autogenerate: { directory: 'java_framework' },
				},
				{
					label: 'GitHub 뉴스 정리',
					autogenerate: { directory: 'github_news' },
				},
				{
					label: 'conversation with english',
					autogenerate: { directory: 'conversation_en' },
				},
				{
					label: 'SpringBoot',
					autogenerate: { directory: 'springboot' },
				},
				{
					label: 'baekjoon_java',
					autogenerate: { directory: 'baekjoon_java' },
				},
				{
					label: 'machine learning',
					autogenerate: { directory: 'machine_learning' },
				},
				{
					label: 'Markdown',
					autogenerate: { directory: 'markdowns' },
				},
				{
					label: 'Database',
					autogenerate: { directory: 'database_inform'},
				},



				{
					label: '알뜰살뜰',
					autogenerate: { directory: 'thrifty' },
				},




				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
