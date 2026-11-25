import { test } from "node:test";
import assert from "node:assert/strict";
import { contarSentencas, separarPalavras } from "../dist/index.js";

test("divide em . ! ?", () => {
  assert.equal(contarSentencas("Olá. Tudo bem? Sim!"), 3);
});

test("pontuação repetida conta uma vez", () => {
  assert.equal(contarSentencas("Olá!!! Tudo bem???"), 2);
});

test("não quebra em abreviações", () => {
  assert.equal(contarSentencas("O Dr. Silva chegou. Ele sentou."), 2);
  assert.equal(contarSentencas("A Sra. Souza ligou."), 1);
});

test("não quebra em iniciais", () => {
  assert.equal(contarSentencas("J. K. Rowling escreveu o livro."), 1);
});

test("não quebra em números decimais", () => {
  assert.equal(contarSentencas("O valor é 3.5 mil. Ok?"), 2);
  assert.equal(contarSentencas("O total foi 1.000 reais."), 1);
});

test("parágrafos sem ponto final contam como sentenças", () => {
  assert.equal(contarSentencas("Primeiro título\n\nSegundo título"), 2);
});

test("texto vazio ou só com números", () => {
  assert.equal(contarSentencas(""), 0);
  assert.equal(contarSentencas("123 456"), 0);
});

test("separarPalavras mantém hífen e ignora números", () => {
  assert.deepEqual(separarPalavras("O guarda-chuva custa 20 reais."), [
    "O", "guarda-chuva", "custa", "reais",
  ]);
});
