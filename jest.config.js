module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ]
}

// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     reporters: [
//       'default',
//       [
//         'jest-junit',
//         {
//           outputName: 'junit-TEST.xml',
//         },
//       ],
//     ],
//     coverageThreshold: {
//       global: {
//         statements: 50,
//         branches: 90,
//         functions: 0,
//         lines: 0,
//       },
//     },
//     setupFiles: ['./jest.setup-file.ts'],
//   }