import * as vscode from 'vscode';
import DecodeProvider from './providers/decode_provider';
import * as zlib from 'zlib';
import { promisify } from 'util';

type DecoderFunction = (text: string) => string | Promise<string>;

const base64Decoder = (text: string) => {
	return Buffer.from(text, 'base64').toString('utf-8');
};

const gzipBase64Decoder = async (text: string) => {
	const base64decoded = Buffer.from(text, 'base64');
	const gunzip = promisify(zlib.gunzip);

	return (await gunzip(base64decoded)).toString('utf-8');
};

const handler = async (previewUri: vscode.Uri, provider: DecodeProvider, decoderFunction: DecoderFunction) => {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
		vscode.window.showErrorMessage("Nenhum editor ativo encontrado!");
		return;
	}

	const text = editor.document.getText(editor.selection);

	const decoded = await decoderFunction(text);
	await provider.update(previewUri, decoded);

	const previewDoc = await vscode.workspace.openTextDocument(previewUri);
	await vscode.window.showTextDocument(previewDoc, {
		viewColumn: vscode.ViewColumn.Beside,
		preserveFocus: true
	});
};

export function activate(context: vscode.ExtensionContext) {
	const provider = new DecodeProvider();
	const scheme = 'decoder-preview';
	const previewUri = vscode.Uri.parse(`${scheme}:preview.txt`);
	
	context.subscriptions.push(
		vscode.workspace.registerTextDocumentContentProvider(scheme, provider)
	);


	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-decoder.base64', () => handler(previewUri, provider, base64Decoder)),
		vscode.commands.registerCommand('vscode-decoder.gzipb64', () => handler(previewUri, provider, gzipBase64Decoder))
	);
}

export function deactivate() {}
