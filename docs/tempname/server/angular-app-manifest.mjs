
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-3DIZCZAJ.js",
      "chunk-CWXCDSCJ.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-3LQOWIS3.js"
    ],
    "route": "/experience"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-A5VPVPSZ.js",
      "chunk-CWXCDSCJ.js"
    ],
    "route": "/projects"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HHDLAMIG.js"
    ],
    "route": "/resume"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 9285, hash: '153ae71d7dfca7d11432046412d7af1dbe7d579bc3976d773f8abbf77c7f97d4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1048, hash: '55fcef18fe2f55fa3abd1a780c63050d44731df1f0346bdce44aea473aa6d717', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'projects/index.html': {size: 30780, hash: 'c85cfd630292661f88cf880d3d0c9f3ff3bf844a3bd155b99156525f0c8c6d84', text: () => import('./assets-chunks/projects_index_html.mjs').then(m => m.default)},
    'experience/index.html': {size: 34569, hash: '233834256dcd3642278a22bd4148f75182612936f21ff915b9fec99c38396526', text: () => import('./assets-chunks/experience_index_html.mjs').then(m => m.default)},
    'index.html': {size: 67449, hash: 'b7dbe265c9dfca8b2a2c9245456fbe6f6486367c01fd82c618f20513e80cc1c5', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'resume/index.html': {size: 31699, hash: '7924fbd3e005b0f4c3ba34764b12f3eec9b46422cd930dad0bfd419d2f8ec66f', text: () => import('./assets-chunks/resume_index_html.mjs').then(m => m.default)},
    'styles-FSB7NELA.css': {size: 58988, hash: 'WNlKP6GkmcY', text: () => import('./assets-chunks/styles-FSB7NELA_css.mjs').then(m => m.default)}
  },
};
