import * as vscode from 'vscode';

class DecodeProvider implements vscode.TextDocumentContentProvider {
    // Evento que notifica o VS Code quando o conteúdo muda
    onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    onDidChange = this.onDidChangeEmitter.event;

    private _lastContent: string = "";

    // O VS Code chama este método para obter o texto do documento
    provideTextDocumentContent(uri: vscode.Uri): string {
        return this._lastContent;
    }

    public async update(uri: vscode.Uri, content: string | Promise<string>) {
        this._lastContent = await content;
        this.onDidChangeEmitter.fire(uri);
    }
}

export default DecodeProvider;