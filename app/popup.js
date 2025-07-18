import { html, render, useState, useEffect } from './libs/preact.js';
import { i18n } from './utils.js';

const Popup = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  // Read query parameters on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialTitle = params.get('title') ? decodeURIComponent(params.get('title')) : '';
    const initialUrl = params.get('url') ? decodeURIComponent(params.get('url')) : '';

    setTitle(initialTitle);
    setUrl(initialUrl);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // QR code generation logic will be added later
  };

  return html`
    <form id="qrcode-form" onSubmit=${handleSubmit}>
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
      
      <div class="form-group">
        <button type="submit" class="btn-submit">${i18n('form_submit_button')}</button>
      </div>
    </form>
    
    <div id="qrcode"></div>
  `;
};

render(html`<${Popup} />`, document.querySelector('#app'));