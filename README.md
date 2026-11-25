# legibilidade-ptbr

Índice de legibilidade de **Flesch adaptado ao português do Brasil**, em TypeScript, **sem dependências**.
Conta palavras, sentenças e sílabas e diz se o texto é fácil ou difícil de ler.

> English: a zero-dependency library and CLI that computes the Brazilian-Portuguese adaptation of the
> Flesch Reading Ease score (Martins et al., 1996), including a rule-based Portuguese syllable counter.

Útil para quem escreve conteúdo em português: SEO e blogs, linguagem simples em órgãos públicos,
acessibilidade, revisão de contratos e materiais de saúde ou educação.

## Instalação

```bash
npm install legibilidade-ptbr
```

> O pacote ainda não foi publicado no npm. Por enquanto, clone o repositório e rode
> `npm install && npm run build` (veja o [CONTRIBUTING.md](CONTRIBUTING.md)).

## Uso em código

```ts
import { analisar } from "legibilidade-ptbr";

const r = analisar("O gato subiu no telhado.");

r.palavras;            // 5
r.sentencas;           // 1
r.silabas;             // 9
r.flesch;              // 91.48
r.classificacao;       // { nivel: "facil", rotulo: "Fácil", escolaridade: "anos iniciais do ensino fundamental, 1ª a 4ª série" }
```

Funções menores também são exportadas: `contarSilabas`, `dividirSentencas`, `separarPalavras`,
`fleschPtBr` e `classificarFlesch`.

## Uso na linha de comando

```bash
npx legibilidade-ptbr artigo.txt
cat artigo.txt | npx legibilidade-ptbr
npx legibilidade-ptbr --json artigo.txt
```

```
Palavras:             30
Sentenças:            4
Sílabas:              67
Palavras / sentença:  7.5
Sílabas / palavra:    2.23
Índice de Flesch:     52.3
Nível:                Médio (anos finais do ensino fundamental, 5ª a 8ª série)
```

## Como é calculado

```
Flesch (PT-BR) = 248,835 − 1,015 × (palavras / sentenças) − 84,6 × (sílabas / palavras)
```

Fórmula de Martins et al. (1996), que ajusta a fórmula original do inglês porque as palavras em
português têm, em média, mais sílabas. Quanto maior o índice, mais fácil o texto.

| Índice | Nível         | Escolaridade aproximada       |
| ------ | ------------- | ----------------------------- |
| 75–100 | Fácil         | 1ª a 4ª série                 |
| 50–75  | Médio         | 5ª a 8ª série                 |
| 25–50  | Difícil       | ensino médio                  |
| 0–25   | Muito difícil | ensino superior               |

As faixas são aproximadas; use como guia, não como medida exata.

> **Atenção:** estas faixas ainda **não foram conferidas** com o texto original de Martins et al. (1996).
> A verificação está pendente; até lá, trate a classificação como provisória.

## Limitações (leia antes de confiar cegamente)

- A contagem de sílabas é feita por **regras**, sem dicionário. Acerta a grande maioria das palavras
  comuns, mas erra em alguns casos ambíguos (hiatos como "mediana"). Palavras problemáticas conhecidas
  ficam em `EXCECOES` (`src/silabas.ts`).
- Siglas sem vogais (como "SP") contam como 1 sílaba.
- Números são ignorados. Listas e títulos sem pontuação só viram sentenças separadas se houver linha em branco entre eles.
- É um índice estatístico, não entende o conteúdo: um texto curto pode ser difícil por vocabulário raro.

## Contribuindo

Contribuições são bem-vindas, principalmente **novas palavras de teste** e **exceções** na contagem de
sílabas. Veja o [CONTRIBUTING.md](CONTRIBUTING.md).

## Referência

Martins, T. B. F.; Ghiraldelo, C. M.; Nunes, M. G. V.; Oliveira Jr., O. N. *Readability formulas applied
to textbooks in Brazilian Portuguese.* Notas do ICMSC, n. 28, São Carlos, 1996.

## Licença

[MIT](LICENSE)
