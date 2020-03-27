module.exports = {
	collectCoverage: true,
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	coverageDirectory: '../coverage/',
	coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/static/'],
	preset: 'ts-jest/presets/js-with-babel'
};
