const execa = require('execa')
const es = require('event-stream')

module.exports = function exec(command, { cwd } = {}) {
  const proc = execa.shell(command, { cwd })
  const formatLine = (line, label) => `  [${label}]\t${line}\n`
  const formatStream = (stream, label) =>
    stream
      .pipe(es.split())
      .pipe(es.map((line, cb) => cb(null, formatLine(line, label))))

  process.stdout.write(formatLine(command, 'cmd'))
  es
    .merge(formatStream(proc.stdout, 'out'), formatStream(proc.stderr, 'ERR'))
    .pipe(process.stdout)
  return proc
}
