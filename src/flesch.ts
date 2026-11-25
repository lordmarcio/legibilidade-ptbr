export type NivelLegibilidade = "facil" | "medio" | "dificil" | "muito-dificil";

export interface Classificacao {
  nivel: NivelLegibilidade;
  rotulo: string;
  escolaridade: string;
}

/**
 * Índice de Facilidade de Leitura de Flesch adaptado ao português do Brasil
 * (Martins et al., 1996):
 *
 *   248,835 − 1,015 × (palavras / sentenças) − 84,6 × (sílabas / palavras)
 *
 * Quanto maior o valor, mais fácil o texto.
 */
export function fleschPtBr(palavrasPorSentenca: number, silabasPorPalavra: number): number {
  return 248.835 - 1.015 * palavrasPorSentenca - 84.6 * silabasPorPalavra;
}

/**
 * Faixas usuais para o índice em português. Valores aproximados; use como guia,
 * não como medida exata.
 */
export function classificarFlesch(indice: number): Classificacao {
  if (indice >= 75) {
    return { nivel: "facil", rotulo: "Fácil", escolaridade: "anos iniciais do ensino fundamental, 1ª a 4ª série" };
  }
  if (indice >= 50) {
    return { nivel: "medio", rotulo: "Médio", escolaridade: "anos finais do ensino fundamental, 5ª a 8ª série" };
  }
  if (indice >= 25) {
    return { nivel: "dificil", rotulo: "Difícil", escolaridade: "ensino médio" };
  }
  return { nivel: "muito-dificil", rotulo: "Muito difícil", escolaridade: "ensino superior" };
}
