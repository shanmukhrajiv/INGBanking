import {PolymerElement, html} from '@polymer/polymer/polymer-element.js'
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
class LoginElement extends PolymerElement {
  static get properties () {
    return {
      // Configure owner property
      owner: {
        type: String,
          value: 'Daniel',
      },
      baseUrl:
      {
        type: String,
        //value: "http://10.117.189.210:8090/app"
        value: "http://52.66.210.171:8090/app"
      },
    };
  }
  connectedCallback(){
    super.connectedCallback();
    localStorage.isDashboard= true;
    

  }
  ready(){
    super.ready();
    this.$.loginForm.addEventListener('iron-form-submit', function(event) {
      this.querySelector('.output').innerHTML = JSON.stringify(event.detail);
      spinner.active = false;
      spinner.hidden = true;
      loginFormSubmit.disabled = false;
    });
    
    
  }


  
  
 
  _showLognTab(){
    alert("_showLognTab");
    alert(localStorage.isDashboard);
  }
  static get template () {// 
    return html`
    <style>
    paper-card{
      margin:4%;
      margin-left:6%;
      width:90%;
    }
    paper-card:hover{
     border-bottom: 3px solid #ff6200; 
    
     cursor:pointer;
    
    }
      .customizedcss{
      background-color:rgba(0,0,0,0.8);
      color:#fff;

}

.customizedDangercss{
    background-color:red;
    color:rgba(255, 98, 0, 0.66);
    color:#fff;

}
#actions{
margin-top: 7%;
margin-left: 27%;
width: 30%;
border:8px solid beige
}     
#alertdialog{
color:#ff6200!important;
min-width: 31%;
margin-top:-28%;
position: fixed;
border: 6px solid beige;
}
#createdAccountDetailsDialogId{
color:#ff6200!important;
border: 6px solid beige;

}
.headerStyle{
background: #d9475c;
margin:1%;
padding:1%;
color:white;
}

.bkg{
background-color:#d9475c;
color:white;
}
    </style>
      <!-- bind to the "owner" property -->
     
       
      <paper-card heading="Customer Login:"  >
      <div class="card-actions"  style="margin:20px;border:5px solid beige; background-color:bisque">
      <p class="headerStyle">
      Login Ing Web
    
      <div class="horizontal justified">
        <iron-form id="loginForm">
          <form >
              <paper-input name="name" label="Customer id" value="{{accountId}}" required auto-validate  error-message="Please Enter Customer id "></paper-input>
              <paper-input name="password" type="password" label="Password" value="{{password}}" required auto-validate error-message="Please Enter Password  "></paper-input>
              <paper-button raised >
                <paper-spinner id="spinner"  on-click="_loginAuthication">Continue</paper-spinner></paper-button>
              <paper-button raised on-click="_resetForm">Reset</paper-button>
       </form>
  
</iron-form>
    </div>
      </paper-card>
      
     
      <!--Iron Ajax Start-->
      <iron-ajax
              id="ajax"
              on-response="_onResponse"
              on-error ="_onError"
              debounce-duration="300">
      </iron-ajax> 
      <!--Iron Ajax End-->
    `;
  }
  _resetForm() {
  this.$.loginForm.reset();
   
   }
  _loginAuthication() {
    
    

   const isValidate = this.$.loginForm.validate();
     console.log(this.$.loginForm.validate())
     if (isValidate) {
       const jsonBody = {
        accountId: this.accountId,
        password: this.password
        }
       let ajaxRef = this.$.ajax;
       ajaxRef.method = "post";
       ajaxRef.url = `${this.baseUrl}/login`,
       ajaxRef.body = jsonBody;
       ajaxRef.contentType = "application/json"
       ajaxRef.generateRequest();
     }else{
        //alertdialog,alertMsg
       // this.alertMsg ="Please Enter User Credetails"
      //  this.$.alertdialog.open();
      alert("Please Enter User Credetails");
 
     }
   }
  _onResponse(event,request) {
    const req = event.detail; 
    const statuscode = req.status
    var result = req.response;
      // this.$.alertdialog.open();
        if(result){
          //localStorage.loggedInId= result.loginId;
          localStorage.setItem("userDetails", JSON.stringify(result));
          localStorage.accountId =result.account.accountId;
          window.history.pushState({}, null, '/dashboard');
          window.dispatchEvent(new CustomEvent("location-changed"));

        }
  }

  _onError(event) {
    const req = event.detail; // iron-request
    const statuscode = req.status
    var result = req.response;
      alert(result.message);
    //alert( "Something Went Wrong!");
   
   
  }
}
customElements.define('login-element', LoginElement);