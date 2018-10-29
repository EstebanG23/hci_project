/* Load the PolymerElement base class and html helper function */
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
/* Load shared styles. All view elements use these styles */
import './shared-styles.js';

/* Extend the base PolymerElement class */
class ViewEvaluation extends PolymerElement {
  static get properties() {
    return {
      eval: {
        type: Object,
      },
      prof: {
        type: Object,
      },
      page: {
        type: String,
        notify: true
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
      height: 80px;
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

  <paper-button raised class="back-to-search" on-click="backToInstructor"><img style="filter: invert(100)" src="../images/back-arrow.svg">Back to Instructor</paper-button>
  <div class="instructor-name">
    <h1>Course: [[eval.courseCode]]</h1>
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
          <th>Questions</th>
          <th>Average</th>
        </tr>
      </thead>
      <tbody is="s-tbody">
        <tr is="s-tr" multi>
          <td class="prof">Overall</td>
          <td>[[eval.overall]]</td>
        </tr>
        <tr is="s-tr" multi>
          <td class="prof">Helpful</td>
          <td>[[eval.helpful]]</td>
        </tr>
        <tr is="s-tr" multi>
          <td class="prof">Organization</td>
          <td>[[eval.organization]]</td>
        </tr>
        <tr is="s-tr" multi>
          <td class="prof">Communication</td>
          <td>[[eval.communication]]</td>
        </tr>
        <tr is="s-tr" multi>
          <td class="prof">Interest</td>
          <td>[[eval.interest]]</td>
        </tr>
        <tr is="s-tr" multi>
          <td class="prof">Difficulty</td>
          <td>[[eval.difficulty]]</td>
        </tr>
      </tbody>
      </table>
    </div>
    `;
  }

  backToInstructor() {
    this.page = "instructor-page"
  }
}
/* Register the new element with the browser */
window.customElements.define('view-evaluation', ViewEvaluation);