# Cadastro de Fornecedor

Este projeto é um sistema de cadastro de fornecedores e produtos, desenvolvido com HTML, CSS e JavaScript, utilizando as bibliotecas Bootstrap e jQuery. O sistema permite a inclusão, visualização e exclusão de fornecedores e produtos, além de anexos de documentos.

## Funcionalidades

- Cadastro de Fornecedor: Formulário para inserir dados do fornecedor, como razão social, CNPJ, endereço, e contato.
- Cadastro de Produtos: Formulário para inserir dados dos produtos, como nome, unidade de medida, quantidade em estoque e valor.
- Anexos: Inclusão de documentos em memória, com opção de visualização e exclusão.
- Validação de Formulário: Todos os campos obrigatórios devem ser preenchidos.
- Envio de Dados: Ao clicar no botão de salvar fornecedor, é exibido um modal de carregamento e os dados são formatados em JSON.

## Estrutura do Projeto

/
|-- index.html
|-- index.css
|-- index.js
|-- README.md
|-- node_modules/
|-- bootstrap/
|-- jquery/
|-- style-guide/
|-- css/
|-- js/

## Dependências

- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)

## Instalação

1. Clone o repositório para o seu computador:

   ```sh
   git clone (https://github.com/ElT0N-R/Teste-Estagio)
Navegue até o diretório do projeto:

sh
Copiar código
cd Teste-Estagio
Instale as dependências necessárias:

sh
Copiar código
npm install bootstrap jquery
Uso
Abra o arquivo index.html no seu navegador.
Preencha o formulário com os dados do fornecedor e produtos.
Adicione os documentos necessários na seção de anexos.
Clique em "Salvar Fornecedor" para enviar os dados. O modal de carregamento será exibido e os dados serão formatados em JSON.
