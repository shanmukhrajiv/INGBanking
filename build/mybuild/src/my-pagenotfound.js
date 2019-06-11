define(["../shared_bundle_1.js"],function(_shared_bundle_){"use strict";class PageNotFound extends _shared_bundle_.PolymerElement{static get template(){return _shared_bundle_.html`
      <style>
        :host {
          display: block;

          padding: 10px 20px;
        }
      </style>

      Oops! you hit a 404(Not Found..). <a href="[[rootPath]]">Head back togo  home.</a>
    `}}window.customElements.define("page-not-found",PageNotFound)});