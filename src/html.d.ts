// allows importing html from TypeScript
// source: https://medium.com/@sampsonjoliver/importing-html-files-from-typescript-bd1c50909992
declare module '*.html' {
	const value: string;
	export default value
}
