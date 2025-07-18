import { html, render, useState, useEffect } from './libs/preact.js';
import QRCodeCard from './modules/QRCodeCard.js';
import { i18n } from './utils.js';

const Popup = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  // Determine if a QR code should be generated. 
  const shouldGenerate = title.trim() && url.trim();

  // Read query parameters on component mount
  useEffect(() => {
    // Set page title dynamically
    document.title = i18n('extension_name');

    const params = new URLSearchParams(window.location.search);
    const initialTitle = params.get('title') ? decodeURIComponent(params.get('title')) : '';
    const initialUrl = params.get('url') ? decodeURIComponent(params.get('url')) : '';

    setTitle(initialTitle);
    setUrl(initialUrl);
  }, []);

  return html`
    <form id="qrcode-form">
      <div class="form-group">
        <label for="title">${i18n('form_title_label')}</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          class="form-control"
          value=${title}
          onInput=${(e) => setTitle(e.target.value)}
          placeholder=${i18n('form_title_placeholder')}
        />
      </div>
      
      <div class="form-group">
        <label for="url">${i18n('form_url_label')}</label>
        <input 
          type="url" 
          id="url" 
          name="url" 
          class="form-control"
          value=${url}
          onInput=${(e) => setUrl(e.target.value)}
          placeholder=${i18n('form_url_placeholder')}
        />
      </div>
    </form>
    
    ${(shouldGenerate) ? html`<${QRCodeCard} url=${url} title=${title} />` : ''}
  `;
};

render(html`<${Popup} />`, document.querySelector('#app'));