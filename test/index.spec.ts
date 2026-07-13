import { describe, test, expect } from 'vitest';
import lib from '@/index';

describe('Placeholder', () => {
  test('should pass', () => {
    expect(lib.TEST).toBe('test');
  });
});
