import test from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage
const store = new Map();
globalThis.localStorage = {
  getItem: (key) => store.get(key) ?? null,
  setItem: (key, val) => store.set(key, String(val)),
  removeItem: (key) => store.delete(key),
  clear: () => store.clear(),
  get length() { return store.size; },
  key: (i) => Array.from(store.keys())[i] ?? null
};
globalThis.window = globalThis;

// Streak calculation logic test
function calculateActiveStreak(logs) {
  if (!logs || logs.length === 0) return 0;
  const sorted = [...logs].sort((a, b) => b.timestamp - a.timestamp);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;
  const mostRecent = sorted[0].timestamp;
  if (mostRecent < yesterdayStart) return 0;

  const dateSet = new Set();
  sorted.forEach((l) => {
    const d = new Date(l.timestamp);
    dateSet.add(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
  });

  let streak = 0;
  let checkDate = new Date(todayStart);
  const todayKey = `${checkDate.getFullYear()}-${checkDate.getMonth() + 1}-${checkDate.getDate()}`;
  if (!dateSet.has(todayKey)) {
    checkDate = new Date(yesterdayStart);
  }

  while (true) {
    const key = `${checkDate.getFullYear()}-${checkDate.getMonth() + 1}-${checkDate.getDate()}`;
    if (dateSet.has(key)) {
      streak++;
      checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
    } else {
      break;
    }
  }
  return streak;
}

test('streak returns 0 when logs are empty', () => {
  assert.equal(calculateActiveStreak([]), 0);
  assert.equal(calculateActiveStreak(null), 0);
});

test('streak returns 0 when last activity was older than yesterday', () => {
  const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
  const logs = [{ timestamp: threeDaysAgo }];
  assert.equal(calculateActiveStreak(logs), 0);
});

test('streak correctly counts consecutive days', () => {
  const now = Date.now();
  const yesterday = now - 24 * 60 * 60 * 1000;
  const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000;

  const logs = [
    { timestamp: now },
    { timestamp: yesterday },
    { timestamp: twoDaysAgo }
  ];
  assert.equal(calculateActiveStreak(logs), 3);
});

test('streak deduplicates multiple sessions on the same day', () => {
  const now = Date.now();
  const logs = [
    { timestamp: now },
    { timestamp: now - 10000 },
    { timestamp: now - 20000 }
  ];
  assert.equal(calculateActiveStreak(logs), 1);
});

test('streak ignores logs with missing timestamps', () => {
  const logs = [{ timestamp: null }, { timestamp: undefined }];
  assert.equal(calculateActiveStreak(logs), 0);
});

