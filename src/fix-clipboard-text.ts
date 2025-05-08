import { Clipboard, closeMainWindow } from "@raycast/api";
import "./polyfill-fetch.js";
import * as harper from "harper.js";

export default async function FixClipboardText() {
	let selectedText = await Clipboard.readText();
	if (selectedText == undefined) {
		return;
	}
	let linter = new harper.LocalLinter({
		binary: harper.binaryInlined,
	});
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
	await Clipboard.copy(selectedText);
	closeMainWindow({ clearRootSearch: true });
}
