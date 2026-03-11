// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({

	site: 'https://startingfindmistake.github.io',

	integrations: [
		starlight({
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			sidebar: [
				{
					label: '메뉴',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: '블로그 테스트', slug: 'hello' },
					],
				},
				{
					label: 'java',
					autogenerate: { directory: 'java_language' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
