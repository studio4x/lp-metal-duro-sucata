# Metal Duro Sucata - Landing Page

Este repositório/pasta contém os arquivos fonte para a landing page da **Metal Duro Sucata**. 
O site foi construído com HTML, CSS e JavaScript puros (Vanilla), visando máxima performance, SEO e extrema facilidade de hospedagem.

## Estrutura de Arquivos
- `/index.html`: Arquivo principal contendo a estrutura semântica e todo o conteúdo da página.
- `/css/style.css`: Arquivo de estilos contendo o design premium, variáveis de cor, responsividade e animações.
- `/js/script.js`: Arquivo de script para menu mobile, header dinâmico, animações ao rolar a página (scroll reveal), accordion de FAQ e link dinâmico para WhatsApp no formulário.
- `/assets/`: Pasta para armazenar as imagens e ícones exportados posteriormente. As imagens atuais no HTML apontam para placeholders dentro dessa pasta.

## Como Publicar na Hostinger (Hospedagem Comum)

A publicação deste site é muito simples, pois não requer *build* ou Node.js. Siga os passos:

1. Acesse o painel de **hospedagem (hPanel)** da sua conta Hostinger.
2. Navegue até o gerenciador de arquivos (File Manager).
3. Abra a pasta correspondente ao seu domínio (geralmente `public_html`).
4. Faça o **upload** de todos os arquivos descompactados (as pastas `css`, `js`, `assets` e o arquivo `index.html`) diretamente na raiz do `public_html`.
5. Substitua as imagens na pasta `assets` pelos arquivos reais com os mesmos nomes (ou edite o `index.html` caso o nome seja outro).
6. Pronto! O site já estará no ar de forma imediata.

## Destaques do Projeto
- **Mobile First e Totalmente Responsivo**: Design adaptado perfeitamente para celulares e desktops.
- **Foco em Conversão (WhatsApp)**: CTAs estratégicos e formulário na seção de contato preparam uma mensagem que vai direto ao número da empresa.
- **SEO Otimizado**: Meta-tags embutidas, tags de cabeçalho bem ordenadas (H1, H2, H3), tags block semânticas.
- **Microanimações Premium**: Scroll-reveal via IntersectionObserver do próprio browser com alta performance.
