/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 * 
 * Incase you need to reset some stuff
 * rm -rf node_modules/ package-lock.json; npm i
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <iron-ajax
          auto
          id="dataAjax"
          url="http://localhost:8080/{{ajaxURL}}"
          handle-as="json"
          headers='{"Access-Control-Allow-Origin": "*"}'
          on-response="handleResponse"
          debounce-duration="300">
      </iron-ajax>

      <style>
        :host {
          --app-primary-color: #2B5995;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
          border-bottom-color: #DE8139;
          border-bottom-style: solid;
          border-bottom-width: 4px;
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }

        .logo-uf {
          padding: 14px 24px 14px 0px;
        }

        .login-button {
          font-size: 14px;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Menu</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="course-search" href="[[rootPath]]course-search">Course Search</a>
            <a name="instructor-page" href="[[rootPath]]instructor-page">Instructor Page</a>
            <a name="login-page" href="[[rootPath]]login-page">Login Page</a>
            <a name="user-courses" href="[[rootPath]]user-courses">User Courses</a>
            <a name="view-evaluation" href="[[rootPath]]view-evaluation">View Evaluation</a>
          </iron-selector>
        </app-drawer>
        -->

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header class="app-header" slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <img class="logo-uf" src="../images/logo-uf.svg" width="32px" height="32px">
              <div main-title="">ONE.UF</div>
              <template is="dom-if" if="{{login}}">
                <paper-button class="login-button" on-click="loginClicked">Log in</paper-button>
              </template>
              <template is="dom-if" if="{{loggedIn}}">
                <paper-button class="login-button" on-click="myCoursesClicked">My Courses</paper-button>
              </template>
            </app-toolbar>
          </app-header>

          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <course-search name="course-search" class="course-search" 
              search-input="{{searchInput}}" 
              courses="{{courses}}"
              prof-id="{{profId}}"
              page="{{page}}"></course-search>
            <instructor-page name="instructor-page"
              prof="{{prof}}"
              selected-course-code="{{selectedCourseCode}}"
              page="{{page}}"></instructor-page>
            <login-page name="login-page"
              logged-in="{{loggedIn}}"
              page="{{page}}"
              login="{{login}}"></login-page>
            <user-courses name="user-courses"
              page="{{page}}"></user-courses>
            <view-evaluation name="view-evaluation"
              prof="{{prof}}" 
              eval="{{eval}}" 
              page="{{page}}"></view-evaluation>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
      <script>
      const childElement = document.querySelector('course-search');
      childElement.addEventListener('profChanged', function (e) {
        this.prof = e.detail.prof;
        this.profID = e.detail.profID;
      })
      </script>
    `;
  }

  static get properties() {
    return {
      dataToUpdate: String,
      searchInput: {
        type: String,
        value: '',
        observer: '_searchInputChanged',
        notify: true
      },
      profId: {
        type: String,
        value: '',
        observer: '_profIdChanged',
        notify: true
      },
      selectedCourseCode: {
        type: String,
        value: '',
        observer: '_selectedCourseCodeChanged',
        notify: true
      },
      eval: {
        type: Object,
        value: '',
        notify: true
      },
      prof: {
        type: Object,
        value: '',
        notify: true
      },
      courses: {
        type: Array,
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      loggedIn: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true,
      }
    };
  }

  handleResponse(e) {
    switch (this.dataToUpdate) {
      case 'courses':
        this.courses = e.detail.response;
        break;
      case 'prof':
        this.prof = e.detail.response;
        break;
      case 'eval':
        this.eval = e.detail.response;
        break;
    }
  }

  ready() {
    super.ready();
    if (this.page == "login-page" || this.page == "user-courses") {
      this.login = false;
    } else {
      this.login = true;
    }
    this.loggedIn = false;
    this.prof = "";
    this.profID = "";
    // const childElement = document.querySelector('course-search');
    // childElement.addEventListener('profChanged', function (e) {
    //   this.prof = e.detail.prof;
    //   this.profID = e.detail.profID;
    // })
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'course-search' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'course-search';
    } else if (['course-search', 'instructor-page', 'login-page', 'user-courses', 'view-evaluation'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    // if (!this.$.drawer.persistent) {
    //   this.$.drawer.close();
    // }
  }

  _searchInputChanged() {
    this.dataToUpdate = 'courses';
    this.ajaxURL = 'professors/course/' + this.searchInput;
    this.$.dataAjax.generateRequest();
  }

  _profIdChanged() {
    this.dataToUpdate = 'prof';
    this.ajaxURL = 'professors/' + this.profId;
    this.$.dataAjax.generateRequest();
  }

  _selectedCourseCodeChanged() {
    this.dataToUpdate = 'eval';
    this.ajaxURL = 'evaluation/' + this.profId + "/" + this.selectedCourseCode;
    this.$.dataAjax.generateRequest();
  }

  loginClicked() {
    this.page = "login-page";
  }

  myCoursesClicked() {
    this.page = "user-courses";
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'course-search':
        import('./course-search.js');
        break;
      case 'instructor-page':
        import('./instructor-page.js');
        break;
      case 'login-page':
        import('./login-page.js');
        break;
      case 'user-courses':
        import('./user-courses.js');
        break;
      case 'view-evaluation':
        import('./view-evaluation.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
