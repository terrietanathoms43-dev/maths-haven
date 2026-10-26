// Maths Haven prototype: deterministic maths regression suite.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadPrototype() {
  const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  const blocks = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
  assert.ok(blocks.length > 0, 'inline gameplay script must exist');

  const elements = new Map();
  function element() {
    return {
      innerHTML: '', textContent: '', value: '',
      classList: { add() {}, remove() {} },
      addEventListener() {}, querySelectorAll() { return []; },
      setAttribute() {}, focus() {},
    };
  }
  const document = {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, element());
      return elements.get(selector);
    },
  };
  const sandbox = {
    document, window: { scrollTo() {} }, navigator: {},
    location: { search: '', protocol: 'file:', hostname: '' },
    localStorage: { getItem() { return null; }, setItem() {} },
    URLSearchParams, Math, Number, String, Error, JSON, console,
    setTimeout, clearTimeout,
  };
  vm.createContext(sandbox);
  vm.runInContext(blocks.at(-1)[1], sandbox, { timeout: 3000 });
  assert.ok(sandbox.window.IslandMathTest, 'prototype exposes pure generator checks');
  return sandbox.window.IslandMathTest;
}

const game = loadPrototype();

test('equivalent answers, mixed numbers and decimals', () => {
  assert.ok(game.equal(game.parseFraction('2/4'), game.R(1, 2)));
  assert.ok(game.equal(game.parseFraction('1 1/2'), game.R(3, 2)));
  assert.ok(game.equal(game.parseFraction('-1 1/2'), game.R(-3, 2)));
  assert.ok(game.equal(game.parseFraction('0.75'), game.R(3, 4)));
});

test('bad answers and zero denominators are rejected', () => {
  assert.equal(game.parseFraction('1/0'), null);
  assert.equal(game.parseFraction('hello'), null);
  assert.throws(() => game.R(1, 0), /Zero denominator/);
  assert.equal(game.decodeCode('NOT-A-CODE'), null);
});

test('every grade and activity creates seeded, fully explained finite questions', () => {
  for (let grade = 7; grade <= 13; grade++) {
    for (const skill of ['fractions', 'puzzles', 'mixed']) {
      const first = game.generateSet(grade, skill, 'mix', 15, 123456);
      const second = game.generateSet(grade, skill, 'mix', 15, 123456);
      assert.equal(first.length, 15, `Grade ${grade} / ${skill}`);
      assert.equal(JSON.stringify(first), JSON.stringify(second), 'seeds are deterministic');
      for (const question of first) {
        assert.ok(Number.isFinite(question.answer.n) && Number.isFinite(question.answer.d));
        assert.ok(question.answer.d > 0);
        assert.ok(question.prompt && question.hint && question.explanation);
      }
    }
  }
});

test('fraction operations across all grades never create undefined answers', () => {
  for (let grade = 7; grade <= 13; grade++) {
    for (const operation of ['add', 'sub', 'mul', 'div', 'mix']) {
      for (let seed = 1; seed <= 60; seed++) {
        let state = seed;
        const rng = () => {
          state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
          return state / 4294967296;
        };
        const question = game.generateFraction(grade, operation, rng);
        assert.ok(Number.isFinite(question.answer.n) && Number.isFinite(question.answer.d));
        assert.ok(question.answer.d > 0);
      }
    }
  }
});

test('friend code parser accepts grade 13 challenge', () => {
  const decoded = game.decodeCode('IMA-123456-G13-MX-10');
  assert.equal(decoded.grade, 13);
  assert.equal(decoded.count, 10);
  assert.equal(decoded.skill, 'mixed');
});
