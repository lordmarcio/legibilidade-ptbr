# Como contribuir

Obrigado pelo interesse! Este é um projeto pequeno e mantido por uma pessoa, então contribuições
claras e focadas ajudam muito.

## Formas de ajudar

1. **Reportar uma palavra contada errado.** Abra uma issue com a palavra, o número de sílabas que a
   biblioteca retornou e o correto (com a separação silábica).
2. **Adicionar casos de teste** em `test/silabas.test.mjs` ou `test/sentencas.test.mjs`, com palavras ou
   frases reais.
3. **Adicionar uma exceção** em `EXCECOES` (`src/silabas.ts`) para uma palavra comum que a regra geral erra.
4. **Melhorar a regra geral**, se o problema afetar uma classe de palavras (explique o padrão).
5. **Corrigir ou melhorar a documentação.**

## Rodando localmente

```bash
git clone https://github.com/lordmarcio/legibilidade-ptbr.git
cd legibilidade-ptbr
npm install
npm test
```

Requer Node.js 18 ou superior.

## Antes de abrir um PR

- Abra uma issue primeiro se for uma mudança grande.
- Um PR por assunto, com testes que falhavam antes e passam depois.
- `npm test` precisa passar.
- Escreva a mensagem do commit e a descrição do PR de forma clara, em português ou inglês.
- Se usou ferramentas de IA, revise e entenda tudo o que está enviando. PRs genéricos ou sem teste
  serão fechados.

## Conduta

Seja respeitoso. Este projeto segue o [Contributor Covenant](https://www.contributor-covenant.org/pt-br/version/2/1/code_of_conduct/).
Problemas de conduta podem ser reportados abrindo uma issue privada de segurança ou pelo e-mail do mantenedor no perfil do GitHub.
