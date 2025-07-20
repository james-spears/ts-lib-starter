import { server } from '@/index';

describe('Server is defined', () => {
  afterAll(() => {
    server.close();
  });

  test('should pass', () => {
    expect(server).toBeTruthy();
  });
});
