const test = require('node:test');
const assert = require('node:assert/strict');

const app = require('../server');

test('health endpoint reports the service is ready', async (t) => {
    const server = app.listen(0);
    t.after(() => server.close());

    await new Promise((resolve) => server.once('listening', resolve));
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/health`);

    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok' });
});

test('home page is served', async (t) => {
    const server = app.listen(0);
    t.after(() => server.close());

    await new Promise((resolve) => server.once('listening', resolve));
    const { port } = server.address();
    const response = await fetch(`http://127.0.0.1:${port}/`);

    assert.equal(response.status, 200);
    assert.match(await response.text(), /Minuite Pe/i);
});