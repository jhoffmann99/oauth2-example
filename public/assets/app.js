import applicationProperties from './application-properties.js';

var OAuth2ClientApp = {
  start: function () {
    var that = this;
    that.logProperties(applicationProperties);

    const paramString = window.location.toString().split('?')[1];
    const params = new URLSearchParams(paramString);
    const code = params.get('code');

    if (code) {
      that.getAccessToken(code);
    }

    that.registerDomElements();
    that.registerEventListeners();
    
    if (that.isLoggedIn()) {
      that.renderLoggedIn();
    } else {
      that.renderLoggedOut();
    }



    return that;
  },
  on: function (event, handler) {
    this.app.addEventListener(event, (evt) => {
      handler(evt.detail);
    });
  },
  trigger: function (event, details) {
    const customEvent = new CustomEvent(event, { detail: details });
    this.app.dispatchEvent(customEvent);
  },
  registerDomElements: function () {
    this.template = document.querySelector('#template');
    this.app = document.querySelector('#app');
  },
  renderLoggedOut: function () {

    if (this.template.hasChildNodes()) {
      Array.from(this.template.childNodes).forEach(element => {
        element.remove();
      });
    }
    

    const title = document.createElement('h1');
    title.innerText = 'Logged Out';

    const text = document.createElement('p');
    text.innerText = 'You have to log in first to see something of value.';

    const loginButton = document.createElement('button');
    loginButton.innerText = 'Sign in';
    loginButton.addEventListener('click', () => {
      const oauth = applicationProperties.oAuthGithub;

      window.location = new URL(
        oauth.authorizeUrl +
          '?' +
          new URLSearchParams({
            response_type: 'code',
            client_id: oauth.clientId,
            redirect_uri: oauth.redirectUrl,
            scope: 'user public_repo',
          })
      );
    });


    this.template.appendChild(title);
    this.template.appendChild(text);
    this.template.appendChild(loginButton);
  },
  renderLoggedIn: function () {

    if (this.template.hasChildNodes()) {
      Array.from(this.template.childNodes).forEach(element => {
        element.remove();
      });
    }

    const title = document.createElement('h1');
    title.innerText = 'Logged In';

    this.template.appendChild(title);
  },
  isLoggedIn: function () {
    return !!localStorage.getItem('access-token');
  },
  getAccessToken: function (code) {
    fetch(applicationProperties.baseUrl + '/token?code=' + code, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/vnd.github.v3+json, application/json',
        'Content-Type': 'application/json',
        'User-Agent': applicationProperties.baseUrl,
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        localStorage.setItem('access-token', jsonResponse['access_token']);
        this.trigger('access_token_set');
      }
      )
      .catch((error) => console.log(error));
  },
  registerEventListeners: function () {
    this.on('access_token_set', () => {
      this.renderLoggedIn();
    });
  },
  logProperties: function (properties) {
    console.log(':: applicationProperties ::');
    console.table(properties);
  },
};

(function () {
  OAuth2ClientApp.start();
})();
