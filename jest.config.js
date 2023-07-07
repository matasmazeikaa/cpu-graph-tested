module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
		'^.+\\.(j|t)sx?$': 'babel-jest',
	},
	setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
};
