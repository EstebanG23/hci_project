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
import '@polymer/paper-button/paper-button.js';
import './shared-styles.js';

class InstructorPage extends PolymerElement {
  static get properties() {
    return {
      prof: {
        type: Object,
        value: {
        }
      },
      selectedCourseCode: {
        type: String,
        value: '',
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

          padding: 10px;
        }

        .instructor-name {
          margin: 24px 24px 0px 24px;
          border-bottom: solid 1px grey;
          height: 32px;
        }

        .back-to-search {
          background-color: #DE8139;
          color: white;
          margin: 24px 0 0 24px;
        }

        .result-table {
          width: 100%;
        }

        .view-evaluation {
          background-color: #2D5A93;
          color: white;
          font-size: 12px;
        }
      </style>

      <paper-button raised class="back-to-search" on-click="backToSearch"><img style="filter: invert(100)" src="../images/back-arrow.svg">Search for other courses</paper-button>
      <div class="instructor-name">
        <h1>Instructor: [[prof.name]]</h1>
      </div>
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
            tr:hover td{
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
              <th>Term</th>
              <th>Course</th>
              <th>Course Title</th>
              <th style="width: 138px;">Evaluation</th>
            </tr>
          </thead>
          <tbody is="s-tbody">
            <template is="dom-repeat" items="{{prof.coursesTaught}}">
              <tr is="s-tr" multi>
                <td class="prof">[[item.term]]</td>
                <td>[[item.courseCode]]</td>
                <td>[[item.name]]</td>
                <td><paper-button raised class="view-evaluation" on-click="updateEvaluation">View Evaluation</paper-button></td>
              </tr>
            </template>
          </tbody>
          </table>
        </div>
    `;
  }

  backToSearch() {
    this.page = "course-search";
  }

  updateEvaluation(e) {
    this.selectedCourseCode = e.currentTarget.parentNode.parentNode.childNodes[3].innerHTML;
    this.page = "view-evaluation";
  }
}

window.customElements.define('instructor-page', InstructorPage);
