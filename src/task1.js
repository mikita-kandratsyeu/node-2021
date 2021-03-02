import process from 'process';

process.stdin.setEncoding('utf-8');

process.stdin.on('readable', () => {
  const sentence = process.stdin.read();

  if (sentence) {
    process.stdout.write(`${[...sentence]
      .filter(item => item !== '\n' && item !== '\r')
      .reverse()
      .join('')}\r\n`
    );
  }

  process.exit(0);
});