import { classificarFlesch, fleschPtBr, type Classificacao } from "./flesch.js";
import { contarSilabas } from "./silabas.js";
import { dividirSentencas, separarPalavras } from "./sentencas.js";

export { contarSilabas, EXCECOES } from "./silabas.js";
export { contarSentencas, dividirSentencas, separarPalavras } from "./sentencas.js";
export { classificarFlesch, fleschPtBr } from "./flesch.js";
export type { Classificacao, NivelLegibilidade } from "./flesch.js";

export interface Resultado {
  palavras: number;
  sentencas: number;
  silabas: number;
  palavrasPorSentenca: number;
  silabasPorPalavra: number;
  /** Índice de Flesch (adaptação PT-BR). `null` se o texto não tiver palavras. */
  flesch: number | null;
  classificacao: Classificacao | null;
}

/** Analisa um texto em português e devolve contagens, o índice de Flesch e o nível. */
export function analisar(texto: string): Resultado {
  const palavras = separarPalavras(texto);
  const sentencas = dividirSentencas(texto);

  if (palavras.length === 0) {
    return {
      palavras: 0,
      sentencas: 0,
      silabas: 0,
      palavrasPorSentenca: 0,
      silabasPorPalavra: 0,
      flesch: null,
      classificacao: null,
    };
  }

  const silabas = palavras.reduce((soma, p) => soma + contarSilabas(p), 0);
  const nSentencas = Math.max(1, sentencas.length);
  const palavrasPorSentenca = palavras.length / nSentencas;
  const silabasPorPalavra = silabas / palavras.length;
  const flesch = fleschPtBr(palavrasPorSentenca, silabasPorPalavra);

  return {
    palavras: palavras.length,
    sentencas: nSentencas,
    silabas,
    palavrasPorSentenca,
    silabasPorPalavra,
    flesch,
    classificacao: classificarFlesch(flesch),
  };
}
