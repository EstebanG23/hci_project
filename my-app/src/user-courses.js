/* Load the PolymerElement base class and html helper function */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-input/paper-input.js';
/* Load shared styles. All view elements use these styles */
import './shared-styles.js';

/* Extend the base PolymerElement class */
class UserCourses extends PolymerElement {
  static get properties() {
    return {
      page: {
        type: String,
        notify: true
      },
      // newEval: false,
      user: {
        type: Object,
        value: {
          "id": "5bd21b58bc99c91002c2894e",
          "username": "user1",
          "password": "test1",
          "currentTerm": "Fall 2018",
          "courses": [
            {
                "name": "Computer Organiation",
                "code": "CDA3101",
                "professorId": "5bd213f0bc99c96f5d02a3be",
                "prof": "Dave Small",
                "term": "Fall 2018",
                "section": "ABSCD"
            },
            {
                "name": "Software Engineering",
                "code": "CEN3101",
                "professorId": "5bd2181bbc99c96f5d02a3d7",
                "prof": "Cheryl Resch",
                "term": "Fall 2018",
                "section": "12345"
            }
          ]
        },
      }
    };
  }
  /* Define a template for the new element */
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

    .submit-new-eval {
      background-color: #2D5A93;
      color: white;
      padding-right: 40px;
      padding-left: 40px;
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
    <h1>Current Courses: [[user.currentTerm]]</h1>
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
          <th>Instructor</th>
          <th>Term</th>
          <th>Course</th>
          <th>Course Title</th>
          <th style="width: 138px;">Evaluation</th>
        </tr>
      </thead>
      <tbody is="s-tbody">
        <template is="dom-repeat" items="{{user.courses}}">
          <tr is="s-tr" multi>
            <td class="prof">[[item.prof]]</td>
            <td>[[item.term]]</td>
            <td>[[item.code]]</td>
            <td>[[item.name]]</td>
            <td><paper-button raised class="view-evaluation" on-click="newEvalForm">Submit Evaluation</paper-button></td>
          </tr>
        </template>
      </tbody>
      </table>
    </div>

    <template is="dom-if" if="{{newEval}}">
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
            <th>Questions</th>
            <th>Responses</th>
          </tr>
        </thead>
        <tbody is="s-tbody">
        <tr is="s-tr" multi>
          <td class="prof">Overall</td>
          <td><paper-input label="1-5" no-label-float></paper-input></td>
        </tr>
        <tr is="s-tr" multi>
          <td class="prof">Helpful</td>
          <td><paper-input label="1-5" no-label-float></paper-input></td>
        </tr>
        <tr is="s-tr" multi>
          <td class="prof">Organization</td>
          <td><paper-input label="1-5" no-label-float></paper-input></td>
        </tr>
        <tr is="s-tr" multi>
          <td class="prof">Communication</td>
          <td><paper-input label="1-5" no-label-float></paper-input></td>
        </tr>
        <tr is="s-tr" multi>
          <td class="prof">Interest</td>
          <td><paper-input label="1-5" no-label-float></paper-input></td>
        </tr>
        <tr is="s-tr" multi>
          <td class="prof">Difficulty</td>
          <td><paper-input label="1-5" no-label-float></paper-input></td>
        </tr>
      </tbody>
        </table>
        <paper-button raised class="submit-new-eval" on-click="newEvalSubmitted">Submit!</paper-button>
      </div>
    </template>

    `;
  }

  newEvalSubmitted() {
    this.newEval = false;
  }

  newEvalForm() {
    this.newEval = true;
  }
  
  backToSearch() {
    this.page = 'course-search';
  }
}
/* Register the new element with the browser */
window.customElements.define('user-courses', UserCourses);