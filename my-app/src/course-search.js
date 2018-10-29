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

class CourseSearch extends PolymerElement {
  static get properties() {
    return {
      searchInput: {
        type: String,
        value: '',
        notify: true
      },
      profId: {
        type: String,
        value: '',
        notify: true
      },
      courses: {
        type: Array,
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

          padding: 10px;
        }

        .search-bar {
          background-color: white;
          height: 60px;
          width: 100%;
          display: flex;
          flex-direction: row;
          box-shadow: 1px 1px 1px #585e5e;
        }

        .search-bar-input {
          margin-left: 16px;
          margin-top: 20px;
          padding-left: 2px;
          height: 28px;
          margin-top: 15px;
          margin-bottom: 15px;
          font-size: 20px;
          border: none;
          flex-grow:2;
        }

        .search-bar-input::placeholder {
          color: #9E9E9E;
        }
        .search-bar-input:focus::placeholder {
          color: #7f7f7f;
        }

        .search-bar-input:focus {
          outline: none;
          placeholder-color
        }

        #search-card {
          padding: 20px 10%;
          background-color: transparent;
          box-shadow: none;
          margin-top: 0px;
          padding-top: 0px;
          text-align: center;
        }

        .search-button {
          height: 60px;
          width: 60px;
          background-color: #DE8139;
          cursor: pointer;
        }

        .search-icon {
          padding: 18px;
          filter: invert(100%);
        }

        .table-card {
          display: flex;
        }

        .result-table {
          width: 100%;
        }
      </style>

      <div class="card" id="search-card">
      <p>Enter the course number (e.g. GRE1130) for the course that you wish to search for. A list of instructors who have taught the course will be returned.
        <div class="search-bar">
          <input class="search-bar-input" placeholder="Enter Course Code" on-keydown="courseSearchEnter">
          <div class="search-button" on-click="courseSearch">
            <img class="search-icon" src="../images/search.svg" height="24" width="24">
          </div>
        </div>
      </div>

      <template is="dom-if" if="{{courses}}">
        <div class="card table-card">
          <style>
            td, th {
              padding: 8px;
              box-sizing: border-box;
              white-space: nowrap;
              text-align:left;
            }
            td:nth-of-type(1),
            th:nth-of-type(1) {
              background-color: transparent;
            }
            tr.iron-selected td {
              background-color: rgba(0, 0, 0, 0.1);
            }
            .prof:hover {
              background-color: rgba(0, 0, 0, 0.2);
              cursor: pointer;
              color: white;
            }
            tr td.iron-selected:not(:nth-of-type(1)) {
              background-color: rgba(255, 255, 0, 0.2);
            }
          </style>
          
          <table class="result-table" is="s-table-lite" fixed-column>
            <thead>
              <tr>
                <th>Name</th>
                <th>Most Recent Term</th>
              </tr>
            </thead>
            <tbody is="s-tbody">
              <template is="dom-repeat" items="{{courses}}">
                <tr is="s-tr" multi>
                  <td id="[[item.profId]]" class="prof" on-click="profClicked">[[item.name]]</td>
                  <td>[[item.term]]</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </template>

      <script> 
            function updateSearch() {
              console.log('hello');
            }
      </script
    `;
  }

  profClicked(e) {
    this.profId = e.path[0].id;
    this.page = "instructor-page"
  }

  courseSearch(e) {
    this.searchInput = e.currentTarget.parentNode.childNodes[1].value;
  }

  courseSearchEnter(e) {
    if (e.keyCode == 13) {
      this.searchInput = e.currentTarget.parentNode.childNodes[1].value;
    }
  }
}

window.customElements.define('course-search', CourseSearch);
