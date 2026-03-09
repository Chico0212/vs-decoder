import { error } from 'console';
import * as vscode from 'vscode';

const base64Handler = () => {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showErrorMessage("Nenhum editor ativo encontrado!");
		return;
	}

	const text = editor.document.getText(editor.selection);

	const decoded = Buffer.from(text, 'base64').toString('utf-8');
	vscode.window.showInformationMessage(decoded);
};

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('vscode-decoder.base64', base64Handler);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
