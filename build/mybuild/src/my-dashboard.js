define(["../shared_bundle_1.js"],function(_shared_bundle_){"use strict";(0,_shared_bundle_.Polymer)({_template:_shared_bundle_.html$1`
    <style>
      :host {
        display: block;
        transition-duration: var(--iron-collapse-transition-duration, 300ms);
        /* Safari 10 needs this property prefixed to correctly apply the custom property */
        -webkit-transition-duration: var(--iron-collapse-transition-duration, 300ms);
        overflow: visible;
      }

      :host(.iron-collapse-closed) {
        display: none;
      }

      :host(:not(.iron-collapse-opened)) {
        overflow: hidden;
      }
    </style>

    <slot></slot>
`,is:"iron-collapse",behaviors:[_shared_bundle_.IronResizableBehavior],properties:{/**
     * If true, the orientation is horizontal; otherwise is vertical.
     *
     * @attribute horizontal
     */horizontal:{type:Boolean,value:!1,observer:"_horizontalChanged"},/**
     * Set opened to true to show the collapse element and to false to hide it.
     *
     * @attribute opened
     */opened:{type:Boolean,value:!1,notify:!0,observer:"_openedChanged"},/**
     * When true, the element is transitioning its opened state. When false,
     * the element has finished opening/closing.
     *
     * @attribute transitioning
     */transitioning:{type:Boolean,notify:!0,readOnly:!0},/**
     * Set noAnimation to true to disable animations.
     *
     * @attribute noAnimation
     */noAnimation:{type:Boolean},/**
     * Stores the desired size of the collapse body.
     * @private
     */_desiredSize:{type:String,value:""}},get dimension(){return this.horizontal?"width":"height"},/**
   * `maxWidth` or `maxHeight`.
   * @private
   */get _dimensionMax(){return this.horizontal?"maxWidth":"maxHeight"},/**
   * `max-width` or `max-height`.
   * @private
   */get _dimensionMaxCss(){return this.horizontal?"max-width":"max-height"},hostAttributes:{role:"group","aria-hidden":"true"},listeners:{transitionend:"_onTransitionEnd"},/**
   * Toggle the opened state.
   *
   * @method toggle
   */toggle:function(){this.opened=!this.opened},show:function(){this.opened=!0},hide:function(){this.opened=!1},/**
   * Updates the size of the element.
   * @param {string} size The new value for `maxWidth`/`maxHeight` as css property value, usually `auto` or `0px`.
   * @param {boolean=} animated if `true` updates the size with an animation, otherwise without.
   */updateSize:function(size,animated){// Consider 'auto' as '', to take full size.
size="auto"===size?"":size;var willAnimate=animated&&!this.noAnimation&&this.isAttached&&this._desiredSize!==size;this._desiredSize=size;this._updateTransition(!1);// If we can animate, must do some prep work.
if(willAnimate){// Animation will start at the current size.
var startSize=this._calcSize();// For `auto` we must calculate what is the final size for the animation.
// After the transition is done, _transitionEnd will set the size back to
// `auto`.
if(""===size){this.style[this._dimensionMax]="";size=this._calcSize()}// Go to startSize without animation.
this.style[this._dimensionMax]=startSize;// Force layout to ensure transition will go. Set scrollTop to itself
// so that compilers won't remove it.
this.scrollTop=this.scrollTop;// Enable animation.
this._updateTransition(!0);// If final size is the same as startSize it will not animate.
willAnimate=size!==startSize}// Set the final size.
this.style[this._dimensionMax]=size;// If it won't animate, call transitionEnd to set correct classes.
if(!willAnimate){this._transitionEnd()}},/**
   * enableTransition() is deprecated, but left over so it doesn't break
   * existing code. Please use `noAnimation` property instead.
   *
   * @method enableTransition
   * @deprecated since version 1.0.4
   */enableTransition:function(enabled){_shared_bundle_.Base._warn("`enableTransition()` is deprecated, use `noAnimation` instead.");this.noAnimation=!enabled},_updateTransition:function(enabled){this.style.transitionDuration=enabled&&!this.noAnimation?"":"0s"},_horizontalChanged:function(){this.style.transitionProperty=this._dimensionMaxCss;var otherDimension="maxWidth"===this._dimensionMax?"maxHeight":"maxWidth";this.style[otherDimension]="";this.updateSize(this.opened?"auto":"0px",!1)},_openedChanged:function(){this.setAttribute("aria-hidden",!this.opened);this._setTransitioning(!0);this.toggleClass("iron-collapse-closed",!1);this.toggleClass("iron-collapse-opened",!1);this.updateSize(this.opened?"auto":"0px",!0);// Focus the current collapse.
if(this.opened){this.focus()}},_transitionEnd:function(){this.style[this._dimensionMax]=this._desiredSize;this.toggleClass("iron-collapse-closed",!this.opened);this.toggleClass("iron-collapse-opened",this.opened);this._updateTransition(!1);this.notifyResize();this._setTransitioning(!1)},_onTransitionEnd:function(event){if((0,_shared_bundle_.dom)(event).rootTarget===this){this._transitionEnd()}},_calcSize:function(){return this.getBoundingClientRect()[this.dimension]+"px"}});(0,_shared_bundle_.Polymer)({_template:_shared_bundle_.html$1`
    <style>
      :host {
        display: block;
        position: absolute;
        outline: none;
      }

      :host([hidden]), [hidden] {
        display: none !important;
      }

      iron-icon {
        --iron-icon-width: 12px;
        --iron-icon-height: 12px;
      }

      .badge {
        @apply --layout;
        @apply --layout-center-center;
        @apply --paper-font-common-base;

        font-weight: normal;
        font-size: 11px;
        border-radius: 50%;
        margin-left: var(--paper-badge-margin-left, 0px);
        margin-bottom: var(--paper-badge-margin-bottom, 0px);
        width: var(--paper-badge-width, 20px);
        height: var(--paper-badge-height, 20px);
        background-color: var(--paper-badge-background, var(--accent-color));
        opacity: var(--paper-badge-opacity, 1.0);
        color: var(--paper-badge-text-color, white);

        @apply --paper-badge;
      }
    </style>

    <div class="badge">
      <iron-icon hidden\$="{{!_computeIsIconBadge(icon)}}" icon="{{icon}}"></iron-icon>
      <span id="badge-text" hidden\$="{{_computeIsIconBadge(icon)}}">{{label}}</span>
    </div>
  `,is:"paper-badge",/** @private */hostAttributes:{role:"status",tabindex:0},behaviors:[_shared_bundle_.IronResizableBehavior],listeners:{"iron-resize":"updatePosition"},properties:{/**
     * The id of the element that the badge is anchored to. This element
     * must be a sibling of the badge.
     */for:{type:String,observer:"_forChanged"},/**
     * The label displayed in the badge. The label is centered, and ideally
     * should have very few characters.
     */label:{type:String,observer:"_labelChanged"},/**
     * An iron-icon ID. When given, the badge content will use an
     * `<iron-icon>` element displaying the given icon ID rather than the
     * label text. However, the label text will still be used for
     * accessibility purposes.
     */icon:{type:String,value:""},_boundNotifyResize:{type:Function,value:function(){return this.notifyResize.bind(this)}},_boundUpdateTarget:{type:Function,value:function(){return this._updateTarget.bind(this)}}},attached:function(){// Polymer 2.x does not have this.offsetParent defined by attached
requestAnimationFrame(this._boundUpdateTarget)},attributeChanged:function(name){if("hidden"===name){this.updatePosition()}},_forChanged:function(){// The first time the property is set is before the badge is attached,
// which means we're not ready to position it yet.
if(!this.isAttached){return}this._updateTarget()},_labelChanged:function(){this.setAttribute("aria-label",this.label)},_updateTarget:function(){this._target=this.target;requestAnimationFrame(this._boundNotifyResize)},_computeIsIconBadge:function(icon){return 0<icon.length},/**
   * Returns the target element that this badge is anchored to. It is
   * either the element given by the `for` attribute, or the immediate parent
   * of the badge.
   */get target(){var parentNode=(0,_shared_bundle_.dom)(this).parentNode,ownerRoot=(0,_shared_bundle_.dom)(this).getOwnerRoot(),target;// If the parentNode is a document fragment, then we need to use the host.
if(this.for){target=(0,_shared_bundle_.dom)(ownerRoot).querySelector("#"+this.for)}else{target=parentNode.nodeType==Node.DOCUMENT_FRAGMENT_NODE?ownerRoot.host:parentNode}return target},/**
   * Repositions the badge relative to its anchor element. This is called
   * automatically when the badge is attached or an `iron-resize` event is
   * fired (for exmaple if the window has resized, or your target is a
   * custom element that implements IronResizableBehavior).
   *
   * You should call this in all other cases when the achor's position
   * might have changed (for example, if it's visibility has changed, or
   * you've manually done a page re-layout).
   */updatePosition:function(){if(!this._target||!this.offsetParent){return}var parentRect=this.offsetParent.getBoundingClientRect(),targetRect=this._target.getBoundingClientRect(),thisRect=this.getBoundingClientRect();this.style.left=targetRect.left-parentRect.left+(targetRect.width-thisRect.width/2)+"px";this.style.top=targetRect.top-parentRect.top-thisRect.height/2+"px"}});class DashboardElement extends _shared_bundle_.PolymerElement{// Define optional shadow DOM template
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
  #createdAccountDetailsDialog{
    color:#ff6200!important;
    border: 6px solid beige;

  }
  iron-collapse {
    border: 1px solid #dedede;
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    @apply --shadow-elevation-2dp;
  }
  paper-item{
    background-color:cadetblue;
    color:white;
    height:12px;
    border-bottom: 2px solid red;
  } 
  .bkg{
    background-color:#d9475c;
    color:white;
  }
  .headerStyle{
    background: #d9475c;
    margin:1%;
    padding:1%;
    color:white;
  }
</style>

      
<paper-card >
<!--alert-dialog-->

<paper-dialog id="alertdialog">
  <h2>[[alertMsg]]</h2>
  <paper-button class="custom indigo customizedDangercss" style="float:right" dialog-confirm autofocus>OK</paper-button>
 </paper-dialog>
  <div class="card-content" style="background-color:beige">

  </div>
 
          <div class="card-actions"  style="margin:20px;border:5px solid beige; background-color:bisque">
              <p class="headerStyle">All Profiles:</p>
              <paper-tabs selected="0">
                       <paper-tab id="productGroupName1"  data-item$="profile" on-click="_switchBetweenLoginAndCreate">
                Profiles
              
               </paper-tab>
              <paper-tab id="productGroupName2" data-item$="interested" on-click="_switchBetweenLoginAndCreate">
                       Interested
              </paper-tab>
              <paper-tab id="productGroupName3" data-item$="accepted" on-click="_switchBetweenLoginAndCreate">
                     Accepted
              
              </paper-tab>
              <paper-tab id="productGroupName3" data-item$="rejected" on-click="_switchBetweenLoginAndCreate">
                      Rejected
              
              </paper-tab>
                
      </paper-tabs>
            
    

    


            
         
    <!--Account Creation Form End-->

  </div>


 
</div>
             
           
<!--Noraml Alert dialog-->
    <paper-dialog id="alertdialog">
            <h2>[[alertMsg]]</h2>
            <paper-button class="custom indigo customizedDangercss" style="float:right" dialog-confirm autofocus>OK</paper-button>
  </paper-dialog>

  <!--Details  Dialog Start-->
<paper-dialog id="createdAccountDetailsDialog">
                <div><h2 style="color:rgba(255, 98, 0, 0.66);">Created Account Details:</h2></div>
                <div>AccountId<span>: [[createdAccountDetails.account.accountId]]</span></div>
                <div>LoggedIn User Id<span>: [[createdAccountDetails.loginId]]</span></div>
                <div>Password has been sent to your registered email id. Please Check</span></div>
            <div class="buttons">
                  <paper-button dialog-dismiss>OK</paper-button>
                <!-- <paper-button dialog-confirm autofocus>Accept</paper-button>-->
                </div>
</paper-dialog>

<!--Details  Dialog End-->


<iron-ajax
      id="profileAjax"
      on-response="_profileHandler"
      on-error ="_errorHandler"
      debounce-duration="300">
</iron-ajax>  

<iron-ajax
        id="interestedAjax"
        on-response="_interestedHanler" 
        on-error ="_errorHandler"
        debounce-duration="300">
</iron-ajax>  

<iron-ajax
    id="acceptedAjax"
    on-response="_acceptedAjaxHanler"
    on-error ="_errorHandler"
    debounce-duration="300">
</iron-ajax>  


<iron-ajax
        id="ajax"
        on-response="_onResponse"
        on-error ="_onError"
        debounce-duration="300">
        </iron-ajax> 
<iron-ajax
        id="rejectedAjax"
        on-response="_rejectedHandler"
        on-error ="_errorHandler"
        debounce-duration="300">
        </iron-ajax> 
       
        <iron-ajax
        id="interestSendAjax"
        on-response="_interestSendHandler"
        on-error ="_errorHandler"
        debounce-duration="300">
        </iron-ajax> 


        
</paper-card>
<!--Profile List-->
<template is="dom-if" if="{{profileListFlag}}">
   <div class="card-actions"  style="margin:20px;border:1px solid gray; background-color:ivory;padding:1%">
           <p>Profiles:</p>
           <vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort items={{filteredProfiles}}>
                 <vaadin-grid-column width="9em" path="firstName"></vaadin-grid-column>
                 <vaadin-grid-column width="9em" path="lastName"></vaadin-grid-column>
                 <vaadin-grid-column width="9em" path="emailId"></vaadin-grid-column>
                 <vaadin-grid-column width="9em" path="salary"></vaadin-grid-column>
                 <vaadin-grid-column width="9em" path="caste"></vaadin-grid-column>
                 <vaadin-grid-column width="9em" path="action">
                 <template> 
                      <paper-button raised class="custom indigo bkg" id="[[]]" data-set$={{item}} on-click="_interested">Interested</paper-button>
                </template>
                </vaadin-grid-column>
         </vaadin-grid>
       
     </div>
   </template>
   <!--Profile List End -->

   <!--Interested List-->
   <template is="dom-if" if="{{interestedFlag}}">
      <div class="card-actions"  style="margin:20px;border:1px solid gray; background-color:ivory;padding:1%">
              <p>Interested Profiles:</p>
          <div></div>
        <vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort items={{filteredInterested}}>
                      <vaadin-grid-column width="9em" path="interestedProfileName"></vaadin-grid-column>
                     
                      <vaadin-grid-column width="9em" path="accept">
                      <template> 
                     
                                <paper-button raised class="custom indigo  bkg" data-set$={{item}} id="accept" on-click="_acceptOrRejected">Accept</paper-button>

                    </template>
                      </vaadin-grid-column>
 
                      <vaadin-grid-column width="9em" path="reject">
                      <template>
                            <paper-button toggles raised class="custom green bkg" data-set$={{item}} id="reject" on-click="_acceptOrRejected">Reject</paper-button>

                    </template>
                      </vaadin-grid-column>
                     <!--
                      <vaadin-grid-column width="9em" path="emailId"></vaadin-grid-column>
                      <vaadin-grid-column width="9em" path="salary"></vaadin-grid-column>
                      <vaadin-grid-column width="9em" path="caste"></vaadin-grid-column>-->
            </vaadin-grid>-->
          
        </div>
      </template>
   <!--Interested List End -->

   <!--Accepated List-->
   <template is="dom-if" if="{{acceptedFlag}}">
      <div class="card-actions"  style="margin:20px;border:1px solid gray; background-color:ivory;padding:1%">
              <p>Accepated Profiles:</p>
              <div></div>
              <vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort items={{filteredAccepted}}>
                    <vaadin-grid-column width="9em" path="acceptedProfileName"></vaadin-grid-column>
                   <!-- <vaadin-grid-column width="9em" path="lastName"></vaadin-grid-column>
                    <vaadin-grid-column width="9em" path="emailId"></vaadin-grid-column>
                    <vaadin-grid-column width="9em" path="salary"></vaadin-grid-column>
                    <vaadin-grid-column width="9em" path="caste"></vaadin-grid-column>-->
            </vaadin-grid>
          
        </div>
      </template>
   <!--Accepated List End -->

   <!--Rejected List-->
   <template is="dom-if" if="{{rejectedFlag}}">
      <div class="card-actions"  style="margin:20px;border:1px solid gray; background-color:ivory;padding:1%">
              <p>Rejected:</p>
              <vaadin-grid theme="row-dividers" column-reordering-allowed multi-sort items={{filteredRejected}}>
                      <vaadin-grid-column width="9em" path="rejectedProfileName"></vaadin-grid-column>
                     <!-- <vaadin-grid-column width="9em" path="profileId"></vaadin-grid-column>-->
                      
            </vaadin-grid>
          
        </div>
      </template>
   <!--Rejected List End -->
    `}// Declare properties for the element's public API
static get properties(){return{creditStatus:{type:String,value:"Not Approved"},appliactionStatus:{type:String,value:"New"},greeting:{type:String},subUrl:{type:String,value:`/login`},alertMsg:{type:String,value:""},showLoginForm:{type:Boolean,value:!0},showSelectedGroupProductlist:{type:Boolean,value:!1},createdAccountDetailsDialog:{type:Object,value:{}},allProdu:{type:Array,value:[]},baseUrl:{type:String,value:"http://10.117.189.210:9090/app"},triggerId:{type:String,value:""},collapseId:{type:String,value:"colid"},//SavingsCount,MortgageCount, MortgageCount
SavingsCount:{type:Number,value:0},MortgageCount:{type:Number,value:0},PaymentCount:{type:Number,value:0},productMorgageList:{type:Array,value:[]},productPaymentList:{type:Array,value:[]},productSavingList:{type:Array,value:[]},profileListFlag:{type:Boolean,value:!1},products:{type:Array,value:[]},selectedProductDetails:{type:Object,value:{}},productUniqId:{type:Number,value:0},profileListFlag:{type:Boolean,value:!1},interestedFlag:{type:Boolean,value:!1},acceptedFlag:{type:Boolean,value:!1},rejectedFlag:{type:Boolean,value:!1},filteredProfiles:{type:Array,value:[]},filteredInterested:{type:Array,value:[]},filteredRejected:{type:Array,value:[]},acceptOrRejectedMsg:{type:String,value:""//////profileListFlag,interestedFlag,acceptedFlag,rejectedFlag 
}}}constructor(){super()}connectedCallback(){super.connectedCallback();this._getProfile();// this._getAllProductGroup();
//this._getupdateOverview();
}_interested(event){//interestedAjax,_interestedAjax/ interestSendAjax,_interestSendHandler
//{profileId, profileName, actionProfileId, actionProfileName, action (Interest,accept,reject)
console.log("_interested",JSON.parse(event.target.dataset.set));let actionProfileData=JSON.parse(event.target.dataset.set);const jsonBody={profileId:localStorage.loggedInId,profileName:localStorage.profileName,actionProfileId:actionProfileData.profileId,actionProfileName:actionProfileData.firstName,action:"Interest"};let ajaxRef=this.$.interestSendAjax;ajaxRef.method="put";ajaxRef.body=jsonBody;ajaxRef.url=`${this.baseUrl}/updateInterest`,ajaxRef.contentType="application/json";ajaxRef.generateRequest()}_interestSendHandler(event){const response=event.detail.response;if(response){alert("Congratulation! Your Interest has been successfully sent. ")}else{alert("Sorry, Your Interest could not happed")}}_acceptOrRejected(event){console.log("_interested",JSON.parse(event.target.dataset.set));let actionProfileData=JSON.parse(event.target.dataset.set);console.log("actionProfileData:"+actionProfileData);var jsonBody={profileId:localStorage.loggedInId,profileName:localStorage.profileName,actionProfileId:actionProfileData.interestedProfileId,actionProfileName:actionProfileData.interestedProfileName// accept,reject
};if("accept"==event.target.id){this.acceptOrRejectedMsg=event.target.id;jsonBody.action="Accept"}else{jsonBody.action="Reject";this.acceptOrRejectedMsg=event.target.id}// alert("_acceptOrRejected");
let ajaxRef=this.$.ajax;ajaxRef.method="put";ajaxRef.url=`${this.baseUrl}/updateAcceptReject`,ajaxRef.body=jsonBody;ajaxRef.contentType="application/json";ajaxRef.generateRequest()}_onResponse(event,request){const req=event.detail,statuscode=req.status;// iron-request
var result=req.response;console.log("Result:"+JSON.stringify(result));console.log("status code",req.status);console.log("status text",req.statusText);if(null==result){alert("Successfully Your Interest"+" "+this.acceptOrRejectedMsg+"ed");// this.acceptOrRejectedMsg="";
}}_onError(event){const req=event.detail,statuscode=req.status;// iron-request
var result=req.response;console.log("Result:"+JSON.stringify(result));console.log("status code",req.status);console.log("status text",req.statusText);// I think one of those two would be what you're looking for.
console.log(event.detail.response);//console.log(e.detail.request.xhr.response);
//this.alertMsg = "Something Went Wrong!"
alert("Something Went Wrong!")}_switchBetweenLoginAndCreate(event){//Savings,Payments,Mortgage
console.log("_switchBetweenLoginAndCreate",event.target.dataset.item$);let type=event.target.dataset.item$;// this.showSelectedGroupProductlist=true;
//this.prodctGroupName=type;        
if("profile"==type){this._getProfile();this.profileListFlag=!0;this.interestedFlag=!1;this.acceptedFlag=!1;this.rejectedFlag=!1}else if("interested"==type){this._getInterested();this.interestedFlag=!0;this.acceptedFlag=!1;this.rejectedFlag=!1;this.profileListFlag=!1}else if("accepted"==type){this._getAccepted();this.acceptedFlag=!0;this.interestedFlag=!1;this.rejectedFlag=!1;this.profileListFlag=!1}else{//  alert("Comming Soon..");
this._getRejected();this.acceptedFlag=!1;this.interestedFlag=!1;this.profileListFlag=!1;this.rejectedFlag=!0}}_getProfile(){//alert(localStorage.loggedInId);
let profileId=localStorage.loggedInId,ajaxRef=this.$.profileAjax;ajaxRef.method="get";ajaxRef.url=`${this.baseUrl}/getFilteredProfile/${profileId}`,ajaxRef.contentType="application/json";ajaxRef.generateRequest()}_profileHandler(event){let data=event.detail.response;this.filteredProfiles=event.detail.response;if(data){this.profileListFlag=!0;this.interestedFlag=!1;this.acceptedFlag=!1;this.rejectedFlag=!1}}_getAccepted(){let profileId=localStorage.loggedInId,ajaxRef=this.$.acceptedAjax;ajaxRef.method="get";ajaxRef.url=`${this.baseUrl}/getAcceptedProfile/${profileId}`,ajaxRef.contentType="application/json";ajaxRef.generateRequest()}_acceptedAjaxHanler(event){let data=event.detail.response;this.filteredAccepted=event.detail.response;if(data){this.acceptedFlag=!0;this.profileListFlag=!1;this.interestedFlag=!1;this.rejectedFlag=!1}else{alert("No Data")}}_getInterested(){let profileId=localStorage.loggedInId,ajaxRef=this.$.interestedAjax;ajaxRef.method="get";ajaxRef.url=`${this.baseUrl}/getInterestedProfile/${profileId}`,ajaxRef.contentType="application/json";ajaxRef.generateRequest()}_interestedHanler(event){let data=event.detail.response;this.filteredInterested=event.detail.response;if(data){this.acceptedFlag=!1;this.profileListFlag=!1;this.interestedFlag=!0;this.rejectedFlag=!1}else{alert("No Data")}}_getRejected(){this.profileListFlag=!1;let profileId=localStorage.loggedInId,ajaxRef=this.$.rejectedAjax;ajaxRef.method="get";ajaxRef.url=`${this.baseUrl}/getRejectedProfile/${profileId}`,ajaxRef.contentType="application/json";ajaxRef.generateRequest()}_rejectedHandler(event){let data=event.detail.response;this.filteredRejected=event.detail.response;if(data){this.rejectedFlag=!0;this.acceptedFlag=!1;this.profileListFlag=!1;this.interestedFlag=!1}else{alert("No Data")}}_errorHandler(){console.log("Error");// alert('error');
}_handleError(){// alert('_handleError');
}}// Register the x-custom element with the browser
customElements.define("dashboard-element",DashboardElement)});