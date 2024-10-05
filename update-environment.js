const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'update-environment',
  async prepare(_, {nextRelease: {version}}) {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const newVersion = packageJson.version;

    const environments = ['environment.ts', 'environment.prod.ts', 'environment.staging.ts'];
    environments.forEach(env => {
      const filePath = path.join('src', 'environments', env);
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/version: '.*?'/, `version: '${newVersion}'`);
      fs.writeFileSync(filePath, content);
    });

    console.log('Environment files updated with new version:', newVersion);
  }
};