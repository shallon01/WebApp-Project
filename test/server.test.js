const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');

test('Health endpoint should return a successful response', async (t) => {
    const server = spawn(process.execPath, ['server.js'], {
        env: { ...process.env, PORT: '3100' },
        stdio: ['ignore', 'pipe', 'pipe']
    });

    t.after(() => server.kill());

    await new Promise((resolve, reject) => {
        server.stdout.on('data', (data) => {
            if (data.toString().includes('Server is running on port 3100')) {
                resolve();
            }
        });

        server.on('error', reject);

        server.on('exit', (code) => {
            reject(new Error(`Server exited with code ${code}`));
        });
    });

    const response = await fetch('http://127.0.0.1:3100/health');

    assert.equal(response.status, 200);
    assert.equal(
        await response.text(),
        'WebApp Project is running successfully!'
    );
});
