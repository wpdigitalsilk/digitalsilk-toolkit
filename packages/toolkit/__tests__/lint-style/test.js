/* eslint-disable import/no-extraneous-dependencies */
import spawn from 'cross-spawn';
import fs from 'fs';
import path from 'path';

describe('lint styles', () => {
	let result;
	beforeAll(() => {
		// Capture the result of the spawn sync
		result = spawn.sync('node', ['../../scripts/lint-style'], {
			cwd: __dirname,
		});

		// Log the output and errors for debugging
		console.log('stdout:', result.stdout ? result.stdout.toString() : 'No stdout');
		console.log('stderr:', result.stderr ? result.stderr.toString() : 'No stderr');
		console.log('status:', result.status);
		console.log('error:', result.error);
	});

	it('should exit with status 0', () => {
		// Check that the process exited with status 0 (no error)
		expect(result.status).toBe(0);
		expect(result.error).toBeUndefined();
	});
});
