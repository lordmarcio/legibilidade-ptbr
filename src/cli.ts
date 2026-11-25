#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { analisar } from "./index.js";

const ajuda = `legibilidade-ptbr — índice de legibilidade de Flesch para português do Brasil

Uso:
  legibilidade-ptbr arquivo.txt
  cat texto.txt | legibilidade-ptbr
  legibilidade-ptbr --json arquivo.txt

Opções:
  --json        saída em JSON
  -h, --help    mostra esta ajuda
`;

const args = process.argv.slice(2);
if (args.includes("-h") || args.includes("--help")) {
  process.stdout.write(ajuda);
  process.exit(0);
}

const json = args.includes("--json");
const arquivo = args.find((a) => !a.startsWith("-"));

let texto: string;
try {
  texto = readFileSync(arquivo ?? 0, "utf8");
} catch (erro) {
  const mensagem = erro instanceof Error ? erro.message : String(erro);
  process.stderr.write(`Não foi possível ler o texto: ${mensagem}\n`);
  process.exit(1);
}

const r = analisar(texto);

if (json) {
  process.stdout.write(JSON.stringify(r, null, 2) + "\n");
} else if (r.flesch === null || r.classificacao === null) {
  process.stdout.write("Texto sem palavras.\n");
} else {
  process.stdout.write(
    [
      `Palavras:             ${r.palavras}`,
      `Sentenças:            ${r.sentencas}`,
      `Sílabas:              ${r.silabas}`,
      `Palavras / sentença:  ${r.palavrasPorSentenca.toFixed(1)}`,
      `Sílabas / palavra:    ${r.silabasPorPalavra.toFixed(2)}`,
      `Índice de Flesch:     ${r.flesch.toFixed(1)}`,
      `Nível:                ${r.classificacao.rotulo} (${r.classificacao.escolaridade})`,
      "",
    ].join("\n"),
  );
}
