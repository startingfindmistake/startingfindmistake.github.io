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
					label: 'Java',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: '생성자(Constructor) vs 메서드(Method)', slug: 'constructor_vs_method' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
