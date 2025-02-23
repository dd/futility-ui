/** @type {import('auto').AutoRc} */
module.exports = {
	baseBranch: 'master',
	labels: [
		{
			name: 'documentation',
			releaseType: 'none',
		},
		{
			name: 'bug',
			releaseType: 'patch',
		},
		{
			name: 'feature',
			releaseType: 'minor',
		},
		{
			name: 'breaking',
			releaseType: 'major',
		},
	],
	prereleaseBranches: ['next'],
};
