define(["exports","../shared_bundle_1.js"],function(_exports,_shared_bundle_){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.PaperCheckedElementBehaviorImpl=_exports.PaperCheckedElementBehavior=_exports.IronCheckedElementBehaviorImpl=_exports.IronCheckedElementBehavior=_exports.$paperCheckedElementBehavior=_exports.$ironCheckedElementBehavior=void 0;const IronCheckedElementBehaviorImpl={properties:{/**
     * Fired when the checked state changes.
     *
     * @event iron-change
     */ /**
         * Gets or sets the state, `true` is checked and `false` is unchecked.
         */checked:{type:Boolean,value:!1,reflectToAttribute:!0,notify:!0,observer:"_checkedChanged"},/**
     * If true, the button toggles the active state with each tap or press
     * of the spacebar.
     */toggles:{type:Boolean,value:!0,reflectToAttribute:!0},/* Overriden from IronFormElementBehavior */value:{type:String,value:"on",observer:"_valueChanged"}},observers:["_requiredChanged(required)"],created:function(){// Used by `iron-form` to handle the case that an element with this behavior
// doesn't have a role of 'checkbox' or 'radio', but should still only be
// included when the form is serialized if `this.checked === true`.
this._hasIronCheckedElementBehavior=!0},/**
   * Returns false if the element is required and not checked, and true
   * otherwise.
   * @param {*=} _value Ignored.
   * @return {boolean} true if `required` is false or if `checked` is true.
   */_getValidity:function(_value){return this.disabled||!this.required||this.checked},/**
   * Update the aria-required label when `required` is changed.
   */_requiredChanged:function(){if(this.required){this.setAttribute("aria-required","true")}else{this.removeAttribute("aria-required")}},/**
   * Fire `iron-changed` when the checked state changes.
   */_checkedChanged:function(){this.active=this.checked;this.fire("iron-change")},/**
   * Reset value to 'on' if it is set to `undefined`.
   */_valueChanged:function(){if(this.value===void 0||null===this.value){this.value="on"}}};/** @polymerBehavior */_exports.IronCheckedElementBehaviorImpl=IronCheckedElementBehaviorImpl;const IronCheckedElementBehavior=[_shared_bundle_.IronFormElementBehavior,_shared_bundle_.IronValidatableBehavior,IronCheckedElementBehaviorImpl];_exports.IronCheckedElementBehavior=IronCheckedElementBehavior;var ironCheckedElementBehavior={IronCheckedElementBehaviorImpl:IronCheckedElementBehaviorImpl,IronCheckedElementBehavior:IronCheckedElementBehavior};_exports.$ironCheckedElementBehavior=ironCheckedElementBehavior;const PaperCheckedElementBehaviorImpl={/**
   * Synchronizes the element's checked state with its ripple effect.
   */_checkedChanged:function(){IronCheckedElementBehaviorImpl._checkedChanged.call(this);if(this.hasRipple()){if(this.checked){this._ripple.setAttribute("checked","")}else{this._ripple.removeAttribute("checked")}}},/**
   * Synchronizes the element's `active` and `checked` state.
   */_buttonStateChanged:function(){_shared_bundle_.PaperRippleBehavior._buttonStateChanged.call(this);if(this.disabled){return}if(this.isAttached){this.checked=this.active}}};/** @polymerBehavior */_exports.PaperCheckedElementBehaviorImpl=PaperCheckedElementBehaviorImpl;const PaperCheckedElementBehavior=[_shared_bundle_.PaperInkyFocusBehavior,IronCheckedElementBehavior,PaperCheckedElementBehaviorImpl];_exports.PaperCheckedElementBehavior=PaperCheckedElementBehavior;var paperCheckedElementBehavior={PaperCheckedElementBehaviorImpl:PaperCheckedElementBehaviorImpl,PaperCheckedElementBehavior:PaperCheckedElementBehavior};_exports.$paperCheckedElementBehavior=paperCheckedElementBehavior;const template=_shared_bundle_.html$1`
<style>
  :host {
    display: inline-block;
    line-height: 0;
    white-space: nowrap;
    cursor: pointer;
    @apply --paper-font-common-base;
    --calculated-paper-radio-button-size: var(--paper-radio-button-size, 16px);
    /* -1px is a sentinel for the default and is replace in \`attached\`. */
    --calculated-paper-radio-button-ink-size: var(--paper-radio-button-ink-size, -1px);
  }

  :host(:focus) {
    outline: none;
  }

  #radioContainer {
    @apply --layout-inline;
    @apply --layout-center-center;
    position: relative;
    width: var(--calculated-paper-radio-button-size);
    height: var(--calculated-paper-radio-button-size);
    vertical-align: middle;

    @apply --paper-radio-button-radio-container;
  }

  #ink {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    width: var(--calculated-paper-radio-button-ink-size);
    height: var(--calculated-paper-radio-button-ink-size);
    color: var(--paper-radio-button-unchecked-ink-color, var(--primary-text-color));
    opacity: 0.6;
    pointer-events: none;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  #ink[checked] {
    color: var(--paper-radio-button-checked-ink-color, var(--primary-color));
  }

  #offRadio, #onRadio {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  #offRadio {
    border: 2px solid var(--paper-radio-button-unchecked-color, var(--primary-text-color));
    background-color: var(--paper-radio-button-unchecked-background-color, transparent);
    transition: border-color 0.28s;
  }

  #onRadio {
    background-color: var(--paper-radio-button-checked-color, var(--primary-color));
    -webkit-transform: scale(0);
    transform: scale(0);
    transition: -webkit-transform ease 0.28s;
    transition: transform ease 0.28s;
    will-change: transform;
  }

  :host([checked]) #offRadio {
    border-color: var(--paper-radio-button-checked-color, var(--primary-color));
  }

  :host([checked]) #onRadio {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }

  #radioLabel {
    line-height: normal;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: var(--paper-radio-button-label-spacing, 10px);
    white-space: normal;
    color: var(--paper-radio-button-label-color, var(--primary-text-color));

    @apply --paper-radio-button-label;
  }

  :host([checked]) #radioLabel {
    @apply --paper-radio-button-label-checked;
  }

  #radioLabel:dir(rtl) {
    margin-left: 0;
    margin-right: var(--paper-radio-button-label-spacing, 10px);
  }

  #radioLabel[hidden] {
    display: none;
  }

  /* disabled state */

  :host([disabled]) #offRadio {
    border-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));
    opacity: 0.5;
  }

  :host([disabled][checked]) #onRadio {
    background-color: var(--paper-radio-button-unchecked-color, var(--primary-text-color));
    opacity: 0.5;
  }

  :host([disabled]) #radioLabel {
    /* slightly darker than the button, so that it's readable */
    opacity: 0.65;
  }
</style>

<div id="radioContainer">
  <div id="offRadio"></div>
  <div id="onRadio"></div>
</div>

<div id="radioLabel"><slot></slot></div>`;template.setAttribute("strip-whitespace","");/**
                                               Material design: [Radio button](https://www.google.com/design/spec/components/selection-controls.html#selection-controls-radio-button)
                                               
                                               `paper-radio-button` is a button that can be either checked or unchecked. The
                                               user can tap the radio button to check or uncheck it.
                                               
                                               Use a `<paper-radio-group>` to group a set of radio buttons. When radio buttons
                                               are inside a radio group, exactly one radio button in the group can be checked
                                               at any time.
                                               
                                               Example:
                                               
                                                   <paper-radio-button></paper-radio-button>
                                                   <paper-radio-button>Item label</paper-radio-button>
                                               
                                               ### Styling
                                               
                                               The following custom properties and mixins are available for styling:
                                               
                                               Custom property | Description | Default
                                               ----------------|-------------|----------
                                               `--paper-radio-button-unchecked-background-color` | Radio button background color when the input is not checked | `transparent`
                                               `--paper-radio-button-unchecked-color` | Radio button color when the input is not checked | `--primary-text-color`
                                               `--paper-radio-button-unchecked-ink-color` | Selected/focus ripple color when the input is not checked | `--primary-text-color`
                                               `--paper-radio-button-checked-color` | Radio button color when the input is checked | `--primary-color`
                                               `--paper-radio-button-checked-ink-color` | Selected/focus ripple color when the input is checked | `--primary-color`
                                               `--paper-radio-button-size` | Size of the radio button | `16px`
                                               `--paper-radio-button-ink-size` | Size of the ripple | `48px`
                                               `--paper-radio-button-label-color` | Label color | `--primary-text-color`
                                               `--paper-radio-button-label-spacing` | Spacing between the label and the button | `10px`
                                               `--paper-radio-button-radio-container` | A mixin applied to the internal radio container | `{}`
                                               `--paper-radio-button-label` | A mixin applied to the internal label | `{}`
                                               `--paper-radio-button-label-checked` | A mixin applied to the internal label when the radio button is checked | `{}`
                                               
                                               This element applies the mixin `--paper-font-common-base` but does not import
                                               `paper-styles/typography.html`. In order to apply the `Roboto` font to this
                                               element, make sure you've imported `paper-styles/typography.html`.
                                               
                                               @group Paper Elements
                                               @element paper-radio-button
                                               @demo demo/index.html
                                               */(0,_shared_bundle_.Polymer)({_template:template,is:"paper-radio-button",behaviors:[PaperCheckedElementBehavior],hostAttributes:{role:"radio","aria-checked":!1,tabindex:0},properties:{/**
     * Fired when the checked state changes due to user interaction.
     *
     * @event change
     */ /**
         * Fired when the checked state changes.
         *
         * @event iron-change
         */ariaActiveAttribute:{type:String,value:"aria-checked"}},ready:function(){this._rippleContainer=this.$.radioContainer},attached:function(){// Wait until styles have resolved to check for the default sentinel.
// See polymer#4009 for more details.
(0,_shared_bundle_.afterNextRender)(this,function(){var inkSize=this.getComputedStyleValue("--calculated-paper-radio-button-ink-size").trim();// If unset, compute and set the default `--paper-radio-button-ink-size`.
if("-1px"===inkSize){var size=parseFloat(this.getComputedStyleValue("--calculated-paper-radio-button-size").trim()),defaultInkSize=Math.floor(3*size);// The button and ripple need to have the same parity so that their
// centers align.
if(defaultInkSize%2!==size%2){defaultInkSize++}this.updateStyles({"--paper-radio-button-ink-size":defaultInkSize+"px"})}})}});class LoginElement extends _shared_bundle_.PolymerElement{// Define optional shadow DOM template
static get template(){return _shared_bundle_.html`
      <style>
        /* CSS rules for your element */
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

        <!-- shadow DOM for your element -->
   
 
  <!-- data bindings in shadow DOM -->
  

<paper-card >
<!--alert-dialog-->

<paper-dialog id="alertdialog">
  <h2>[[alertMsg]]</h2>
  <paper-button class="custom indigo customizedDangercss" style="float:right" dialog-confirm autofocus>OK</paper-button>
 </paper-dialog>
  <div class="card-content" style="background-color:beige">
  <paper-tabs selected="0">
        <paper-tab id="login"  data-item$="login" on-click="_switchBetweenLoginAndCreate">SignIn</paper-tab>
        <paper-tab id="create" data-item$="create" on-click="_switchBetweenLoginAndCreate">Create Profile</paper-tab>
          
</paper-tabs>
  </div>

  <!--SignIn  Form End-->
  <template is="dom-if" if="{{showLoginForm}}">
          <div class="card-actions"  style="margin:20px;border:5px solid beige; background-color:bisque">
          <p class="headerStyle">
          Login Member,
        <small>Meet over 10 lakh profiles</small>
              <div class="horizontal justified">
            <iron-form id="loginForm">
              <form>
                            <paper-input  value="{{loginName}}" always-float-label label="User" error-message="Enter First Name" auto-validate required></paper-input>
                            <paper-input type="password" value="{{password}}" always-float-label label="password" error-message="Enter Password" auto-validate required></paper-input>
                            <paper-button class="custom indigo customizedcss"  
                            on-click="_loginAuthication" class="bkg">Login</paper-button>
                            <paper-button toggles class="custom indigo customizedDangercss" class="green" on-click="_resetForm">Reset</paper-button>
                </form>
                
              </iron-form> 
        </div>
    </template>
    <!--SignIn  Form End-->


    <!--Account Creation Form start-->
    <template is="dom-if" if="{{showSignUpForm}}">
    <div class="card-actions"  style="margin:20px;border:5px solid beige; background-color:bisque">
            <p class="headerStyle">
            REGISTER FREE
          <small>Meet over 10 lakh profiles</small>
            
            </p>
            <div class="horizontal justified">
          <iron-form id="ceateAccountForm">
            <form>
            <!--{
              "age": 0,
              "caste": "string",
              "dob": "2019-06-07T07:28:18.631Z",---
              "emailId": "string",
              "firstName": "string",
              "gender": "string",---
              "lastName": "string",
              "mobile": 0,
              "openToMany": "string",---
              "religionPreference": "string",
              "salary": 0
             }-->
                              <paper-input type="number" value="{{age}}" always-float-label label="Age" error-message="Enter First Name" auto-validate required></paper-input>
                              <paper-input  value="{{caste}}" always-float-label label="Caste" error-message="Enter Caste Name" auto-validate required></paper-input>
                              <paper-input type="date" value="{{dob}}" always-float-label label="Date" error-message="Enter Date" auto-validate required></paper-input>
                            
                              <paper-input type="emailId" value="{{emailId}}" always-float-label label="EmailId" error-message="Enter Email" auto-validate required></paper-input>
                            
                              <paper-input  value="{{firstName}}" always-float-label label="FirstName" error-message="Enter First Name" auto-validate required></paper-input>
                            
                              <paper-input  value="{{lastName}}" always-float-label label="LastName" error-message="Enter LastName " auto-validate required></paper-input>
                              <paper-input type="number" value="{{mobile}}" always-float-label label="Contact Number" error-message="Enter First Name" auto-validate required></paper-input>
                              <paper-input   value="{{salary}}"  always-float-label label="salary" error-message="Salary" auto-validate required></paper-input>
                           
                  
                             
                             <paper-dropdown-menu label="Choose Religious Preference">
                             <paper-listbox slot="dropdown-content" selected="1">
                               <paper-item id="Hindu" on-click="_getReligion">Hindu</paper-item>
                               <paper-item id="Other"  on-click="_getReligion">Others</paper-item>
                             </paper-listbox>
                       </paper-dropdown-menu>



                            <paper-dropdown-menu label="Choose Gender">
                                  <paper-listbox slot="dropdown-content" selected="1">
                                    <paper-item id="male" on-click="_getGender">Male</paper-item>
                                    <paper-item id="female"  on-click="_getGender">Female</paper-item>
                                  </paper-listbox>
                            </paper-dropdown-menu>

                          <paper-button class="custom indigo customizedcss bks"  
                          on-click="_submitCreateAccountForm">Join Free</paper-button>
                  
                          <paper-button toggles class="custom indigo customizedDangercss" class="green" on-click="_resetForm">Reset</paper-button>
              </form>
              
                </iron-form> 
          </iron-form> 
      </div>
    </template>
    <!--Account Creation Form End-->

  </div>
              <iron-ajax
                id="ajax"
                on-response="_onResponse"
                on-error ="_onError"
                debounce-duration="300">
            </iron-ajax> 
<!--Noraml Alert dialog-->
    <paper-dialog id="alertdialog">
            <h2>[[alertMsg]]</h2>
            <paper-button class="custom indigo customizedDangercss" style="float:right" dialog-confirm autofocus>OK</paper-button>
  </paper-dialog>
  
  <!--Details  Dialog Start-->
  <!--{profileId, firstName,lastName,age,gender,salary,caste,religionPreference,openToMany,mobile,emailId,dob}-->
<paper-dialog id="createdAccountDetailsDialogId">
                <div><h2 style="color:rgba(255, 98, 0, 0.66);">Created Profile Details:</h2></div>
                <div>ProfileId<span>: [[createdAccountDetails.loginId]]</span></div>
                <div>FirstName<span>: [[createdAccountDetails.loginName]]</span></div>
                <div>LastName<span>: [[createdAccountDetails.password]]</span></div>
               <!-- <div>Age<span>: [[createdAccountDetails.age]]</span></div>
                <div>Salary<span>: [[createdAccountDetails.salary]]</span></div>
                <div>Caste<span>: [[createdAccountDetails.caste]]</span></div>
                <div>ReligionPreference<span>: [[createdAccountDetails.religionPreference]]</span></div>
                <div>Contact Number<span>: [[createdAccountDetails.mobile]]</span></div>
                <div>EmailId<span>: [[createdAccountDetails.emailId]]</span></div>
                <div>Contact Number<span>: [[createdAccountDetails.mobile]]</span></div>
                <div>Date Of Birth<span>: [[createdAccountDetails.dob]]</span></div>-->
            <div class="buttons">
                  <paper-button dialog-dismiss>OK</paper-button>
                 
                <!-- <paper-button dialog-confirm autofocus>Accept</paper-button>-->
                </div>
</paper-dialog>

<!--Details  Dialog End-->
</paper-card>
    `}// Declare properties for the element's public API
static get properties(){return{creditStatus:{type:String,value:"Not Approved"},appliactionStatus:{type:String,value:"New"},greeting:{type:String},baseUrl:{type:String,value:"http://10.117.189.210:9090/app"},subUrl:{type:String,value:`/login`},alertMsg:{type:String,value:""},showLoginForm:{type:Boolean,value:!0},showSignUpForm:{type:Boolean,value:!1},createdAccountDetails:{type:Object,value:{}}}}constructor(){super()}connectedCallback(){super.connectedCallback();//this loggedInUsrDetails= JSON.parse(sessionStorage.getItem("userDetails"));
//sessionStorage.setItem("userDetails", JSON.stringify());
}_getGender(event){this.gender=event.target.id}_getReligion(event){this.religionPreference=event.target.id}_switchBetweenLoginAndCreate(event){console.log("_switchBetweenLoginAndCreate",event.target.dataset.item$);let falg=event.target.dataset.item$;if("login"==falg){this.showLoginForm=!0;this.showSignUpForm=!1;//this.$.signInFormDialog.open();
}else{this.showLoginForm=!1;this.showSignUpForm=!0;// this.$.signUpFormDialog.open();
}}_loginAuthication(){// const isValidate = this.$.loginForm.validate();
// console.log(this.$.loginForm.validate())
if(this.loginName){const jsonBody={loginName:this.loginName,password:this.password};let ajaxRef=this.$.ajax;ajaxRef.method="post";ajaxRef.url=`${this.baseUrl}/login`,ajaxRef.body=jsonBody;ajaxRef.contentType="application/json";ajaxRef.generateRequest()}else{//alertdialog,alertMsg
this.alertMsg="Please Enter User Credetails";this.$.alertdialog.open()}}_onResponse(event,request){const req=event.detail,statuscode=req.status;// iron-request
var result=req.response;console.log("Result:"+JSON.stringify(result));console.log("status code",req.status);console.log("status text",req.statusText);if(200==statuscode){const respone=req.response;if(result.hasOwnProperty("password")){//Profile Create api called..
if("success"==respone.actionMessage){// this.alertMsg = "You have been successfully loggedIn"
// this.$.alertdialog.open();
sessionStorage.setItem("userDetails",JSON.stringify(result));localStorage.loggedInId=result.profile.profileId;localStorage.profileName=result.profile.firstName;// alert(localStorage.loggedInId);
console.log(localStorage.loggedInId);window.history.pushState({},null,"/dashboard");window.dispatchEvent(new CustomEvent("location-changed"))}}else{//Login Api Called
if("success"==result.actionMessage){this._resetForm();alert("You have been successfully created profile");// this.alertMsg = "You have been successfully created profile"
// this.$.alertdialog.open();
console.log(localStorage.loggedInId)}}}else{alert("Something Went Wrong!");// this.alertMsg = "Something Went Wrong!"
// this.$.alertdialog.open();
}}_onError(event){const req=event.detail,statuscode=req.status;// iron-request
var result=req.response;console.log("Result:"+JSON.stringify(result));console.log("status code",req.status);console.log("status text",req.statusText);// I think one of those two would be what you're looking for.
console.log(event.detail.response);//console.log(e.detail.request.xhr.response);
//this.alertMsg = "Something Went Wrong!"
alert("Something Went Wrong!")}_resetForm(){// this.$.loginForm.reset();
this.age="",this.caste="",this.dob="",this.emailId="",this.firstName="",this.gender="",this.mobile="",""==this.religionPreference,// openToMany:this.openToMany,
this.salary="",this.lastName=""}_submitCreateAccountForm(){if(this.age&&this.caste&&this.dob&&this.emailId&&this.gender&&this.mobile&&this.religionPreference){const jsonBody={ageDto:this.age,casteDto:this.caste,dobDto:this.dob,emailIdDto:this.emailId,firstNameDto:this.firstName,genderDto:this.gender,mobileDto:this.mobile,openToManyDto:"yes",//this.openToMany,
genderDto:"male",religionPreferenceDto:this.religionPreference,// openToMany:this.openToMany,
salaryDto:this.salary,lastNameDto:this.lastName};console.log(jsonBody);let ajaxRef=this.$.ajax;ajaxRef.method="post";ajaxRef.url=`${this.baseUrl}/createProfile`,ajaxRef.body=jsonBody;ajaxRef.contentType="application/json";ajaxRef.generateRequest()}else{alert("Please Enter All Mandatory Fields");//this.alertMsg = "Please Enter All Mandatory Fields";
//this.$.alertdialog.open();
}}}// Register the x-custom element with the browser
customElements.define("login-element",LoginElement)});