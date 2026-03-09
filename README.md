# vs-decoder

Uma extensão para o VS Code que decodifica texto selecionado diretamente no editor, exibindo o resultado em um painel lateral.

## Decoders disponveis

- **Base64** - Decodifica texto em Base64 para UTF-8
- **Gzip + Base64** - Decodifica texto comprimido com Gzip e codificado em Base64

## Instalacao

### Pre-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- [vsce](https://github.com/microsoft/vscode-vsce): ferramenta oficial para empacotar extensoes VS Code

```bash
npm install -g @vscode/vsce
```

### Instalando a extensao

1. Clone o repositorio e instale as dependencias:

```bash
git clone https://github.com/seu-usuario/vs-decoder
cd vs-decoder
npm install
```

2. Empacote a extensao:

```bash
bun run package:patch   # 1.0.0 -> 1.0.1 (correcoes)
bun run package:minor   # 1.0.0 -> 1.1.0 (novas funcionalidades)
bun run package:major   # 1.0.0 -> 2.0.0 (mudancas incompativeis)
```

3. Instale o arquivo gerado:

```bash
code --install-extension vscode-decoder-1.0.0.vsix
```

## Como usar

1. Selecione o texto que deseja decodificar no editor
2. Clique com o botao direito do mouse sobre a selecao
3. No menu de contexto, selecione **VS Decoder**
4. Escolha o decoder adequado para o seu caso

O resultado sera exibido em um novo painel ao lado do editor atual.

## Contribuicao

Contribuicoes sao bem-vindas. Abra uma issue ou pull request descrevendo o que voce gostaria de alterar ou adicionar. Seja respeitoso nas interacoes.

## Licenca

MIT