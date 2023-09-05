import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const jestConfig: JestConfigWithTsJest = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', '<rootDir>'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default jestConfig;
