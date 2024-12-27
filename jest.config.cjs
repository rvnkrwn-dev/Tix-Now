module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'ts', 'vue'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.vue$': 'vue-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    testMatch: ['<rootDir>/server/test/**/*.test.ts'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
