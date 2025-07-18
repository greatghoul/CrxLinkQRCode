## Preact

1. We use preact standalone package, it already contains everything we need, we can directly import from preact.js
   ```js
   import { html, render, useState, useEffect } from './preact.js';
   ```
2. We always use html to create template, like html`<div class="foo">...</div>`
3. Preact component always use arrow function and manage in a separacted file under app/modules/
   ```js
   import QRCodeCard from './modules/QRCodeCard.js';
   // ...
   return html`<${QRCodeCard} url=${url} title=${title} />`;
   ```

## Chrome Extension API

1. Note that chrome extension api support promise by default, for example:
   ```js
   const window = await chrome.windows.getCurrent();
   ```