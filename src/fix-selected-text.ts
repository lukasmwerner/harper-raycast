import { Clipboard, getSelectedText } from "@raycast/api";
import "./polyfill-fetch.js";
import * as harper from "harper.js";

export default async function FixSelectedText() {
	let selectedText = await getSelectedText();
	let linter = new harper.LocalLinter();
	let lints = await linter.lint(selectedText);
	do {
		if (lints.length == 0) break;
		const lint = lints[0];
		const suggestions = lint.suggestions();
		if (suggestions.length == 0) {
			continue;
		}
		selectedText = await linter.applySuggestion(
			selectedText,
			suggestions[0],
			lint.span(),
		);
		lints = await linter.lint(selectedText);
	} while (lints.length > 0);
	await Clipboard.paste(selectedText);
}
