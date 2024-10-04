const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'update-environment',
  async prepare(_, {nextRelease: {version}}) {
    const environments = ['environment.ts', 'environment.prod.ts'];
    environments.forEach(env => {
      const filePath = path.join('src', 'environments', env);
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/version: '.*?'/, `version: '${version}'`);
      fs.writeFileSync(filePath, content);
    });
  }
};