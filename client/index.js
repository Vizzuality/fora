const { spawn } = require('child_process');
const path = require('path');
const nextPath = path.join(__dirname, 'node_modules', '.bin', 'next');

const nextProcess = spawn(nextPath, ['start'], {
  stdio: 'inherit',
});

nextProcess.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
  process.exit(1);
});

nextProcess.on('exit', (code) => {
  process.exit(code);
});
