import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class TestElement extends PolymerElement {
static get template() {
    return html `<div>
    
    
        Test
    </div>`
}
}
window.customElements.define('test-element', TestElement);