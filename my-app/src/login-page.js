/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class LoginPage extends PolymerElement {
  static get properties() {
    return {
      loggedIn: {
        type: Boolean,
        notify: true
      },
      login: {
        type: Boolean,
        notify: true
      },
      page: {
        type: String,
        notify: true
      },
    };
  }
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          background-color: rgb(250, 248, 241);
          background-image: url('../images/bg-texture.png');
          height: 100%;
          bottom: 0;
          padding: 0px;
        }

        .login-header {
          height: 100px;
          background: white;
          display: flex;
          flex-direction: row;
        }

        .uf-auth {
          width: 180px;
          height: 58px;
          padding: 21px;
          fill: #00529b;
        }

        .login-buttons {
          color: #0A5499;
          height: 20px;
          font-weight: bold;
          padding: 40px 8px;
        }

        .login-buttons:hover {
          cursor: pointer;
          background-color: rgba(95, 44, 19, .1);
        }

        #search-card {
          padding: 120px 10% 200px 10%;
          background-color: transparent;
          box-shadow: none;
          margin-top: 0px;
          display: flex;
          flex-direction: row;
        }

        .left-login {
          display: flex;
          flex-direction: column;
          width: 60%;
        }

        .right-login {
          background-color: #FFFDF5;
          width: 40%;
          border: solid 2px #6E9BC1;
          border-left-width: 8px;
          padding: 10px;
          margin-left: 30px;
          margin-top: 30px;
        }

        .login-inputs {
          color: #F17030;
          height: 30px;
          padding: 17px 20px 16px 20px;
          font-size: 20px;
          border-color: white;
          border-style: solid;
          border-width: 2px;
          margin-bottom: 30px;
        }

        .login-inputs:focus {
          border-color: #F17030;
          outline: none;
        }

        .login-inputs:focus::placeholder {
          color: #F17030;
        }

        .login-titles {
          font-size: 20px;
        }

        .login-card {
          padding-top: 200px;
        }

        .login-button {
          letter-spacing: 1px;
          height: 22px;
          width: 50px;
          font-weight: bold;
          color: #F17030;
          padding: 15px 20px;
          border: solid 3px #F17030;
        }

        .login-button:hover {
          color: white;
          background-color: #F17030;
          cursor: pointer;
        }
      </style>

      <div class="login-header">
      <img class="uf-auth" src="../images/uf_auth.svg">
      <div class="login-buttons">CHANGE PASSWORD</div>
      <div class="login-buttons">FORGOT PASSWORD</div>
      <div class="login-buttons">CREATE ACCOUNT</div>
      <div class="login-buttons">TROUBLE SIGNING ON?</div>
      </div>

      <div class="card login-card" id="search-card">
        <div class="left-login">
          <span class="login-titles">Username</span>
          <input placeholder="GatorLink Username" class="login-inputs" on-keydown="loginEnter">
          <span class="login-titles">Password</span>
          <input type="password" placeholder="Password" class="login-inputs" on-keydown="loginEnter">
          <div class="login-button" on-click="login2">LOGIN</div>
        </div>
        <div class="right-login">
        <p>You are logging in to a University of Florida (UF) information system and agree to comply with the UF Acceptable Use Policy and Guidelines. Unauthorized use of this system is prohibited and may subject the user to criminal and civil penalties. UF may monitor computer and network activities, and the user should have limited expectations of privacy.</p>
        </div>
      </div>
    `;
  }

  loginEnter(e) {
    if (e.keyCode == 13) {
      this.page = "course-search";
      this.loggedIn = true;
      this.login = false;
    }
  }

  login2() {
    this.page = "course-search";
    this.loggedIn = true;
    this.login = false;
  }
}

window.customElements.define('login-page', LoginPage);
