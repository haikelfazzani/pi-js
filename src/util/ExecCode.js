import JsonStore from "./JsonStore";

let execFile = window.childProcess.execFile;
let exec = window.childProcess.exec;

export default async function ExecCode () {

  return new Promise((resolve, reject) => {

    let filePath = JsonStore.getPropVal('currfilepath');
    let language = JsonStore.getPropVal('language');

    switch (language) {
      case 'python':
        execFile('python', [filePath], (error, stdout, stderr) => {
          if (stderr) reject(stderr || error);
          else resolve(stdout);
        });
        break;

      case 'golang':
        exec('go run ' + filePath, (error, stdout, stderr) => {
          if (stderr) { reject(stderr || error); }
          else resolve(stdout);
        });
        break;

      case 'javascript':
        execFile('node', [filePath], (err, stdout, stderr) => {
          if (stderr) reject(stderr || error);
          else resolve(stdout);
        });
        break;

      case 'typescript':
        exec('ts-node ' + filePath, (error, stdout, stderr) => {
          if (stderr) { reject(stderr || error); }
          else resolve(stdout);
        });
        break;

      default:
        break;
    }
  });
}