export default {
  collectCoverageFrom: ['./src/**/*.{ts}'],
  moduleNameMapper: {
    '@/(.*)': ['<rootDir>/src/$1'],
  },
};
