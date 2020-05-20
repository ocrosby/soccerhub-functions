'use strict';

module.exports = {
    coverageDirectory: '.coverage/unit',
    coverageReporters: [
        'html',
        'lcov',
        'cobertura',
        'text',
        'text-summary'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],
    collectCoverageFrom: [
        'ECNL*/**/*.js',
        'SharedCode/**/*.js'
    ],
    coverageThreshold: {
        global: {
            branches: 53,
            lines: 63,
            statements: 63,
            functions: 61
        }
    },
    reporters: [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: '.testresults/unit',
                outputName: 'junit.xml'
            }
        ]
    ],
    testResultsProcessor: 'jest-sonar-reporter',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    testMatch: [
        '**/test/**/*.test.+(ts|js)'
    ],
    testEnvironment: 'node'
};

