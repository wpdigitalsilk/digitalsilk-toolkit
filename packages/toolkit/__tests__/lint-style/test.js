/* eslint-disable import/no-extraneous-dependencies */
import spawn from 'cross-spawn';

describe('lint styles', () => {
	let result;
	beforeAll(() => {
		// Capture the result of the spawn sync
		result = spawn.sync('node', ['../../scripts/lint-style'], {
			cwd: __dirname,
		});
	});

	it('should exit with status 0', () => {
		// Check that the process exited with status 0 (no error)
		expect(result.status).toBe(0);
		expect(result.error).toBeNull();
	});
});
