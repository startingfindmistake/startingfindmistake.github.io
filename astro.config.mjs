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
					items: [
						{ label: 'Java 언어 기초', autogenerate: { directory: 'java_language' } },
						{ label: 'Integer 클래스', autogenerate: { directory: 'java_lang_integer' } },
						{ label: 'if 조건문', autogenerate: { directory: 'if' } },
						{
							label: 'StringBuilder 클래스',
							autogenerate: { directory: 'java_lang_stringbuilder' },
						},
						{ label: 'Scanner 클래스', autogenerate: { directory: 'java_util_scanner' } },
						{ label: '반복문', autogenerate: { directory: 'loop' } },
						{ label: '배열', autogenerate: { directory: 'arrangement' } },
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
