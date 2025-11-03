const env = process.env.NODE_ENV || 'development';

let testData;

switch (env) {
  // this part of script is implement to verify concept on environment based config loading of the framework, actual project won't need this
  case 'test':
    testData = (await import('./development.js')).default;
    break;
  case 'production':
    testData = (await import('./staging.js')).default;
    break;
  default:
    testData = (await import('./development.js')).default;
    break;
}

export default testData;
