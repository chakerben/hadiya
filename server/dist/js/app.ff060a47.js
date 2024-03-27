(function(){var e={5787:function(e,t,n){"use strict";var r=n(5130),a=n(6768);function o(e,t,n,r,o,s){const i=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.Wv)(i)}var s={name:"App"},i=n(1241);const u=(0,i.A)(s,[["render",o]]);var l=u,c=n(1387),d=n(4232);const m=e=>((0,a.Qi)("data-v-c724056e"),e=e(),(0,a.jt)(),e),p={class:"form-container"},h=m((()=>(0,a.Lk)("h1",null,"تقديم النموذج",-1))),f=m((()=>(0,a.Lk)("label",null,"الاسم:",-1))),g={key:0,class:"error"},b=m((()=>(0,a.Lk)("label",null,"رقم الهاتف:",-1))),v={key:1,class:"error"},y=m((()=>(0,a.Lk)("button",{type:"submit"},"إرسال",-1))),w={key:2,class:"error"};function k(e,t,n,o,s,i){return(0,a.uX)(),(0,a.CE)("div",p,[h,(0,a.Lk)("form",{onSubmit:t[2]||(t[2]=(0,r.D$)(((...e)=>i.submitForm&&i.submitForm(...e)),["prevent"])),class:"form"},[f,(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>s.name=e),required:""},null,512),[[r.Jo,s.name]]),s.errors.name?((0,a.uX)(),(0,a.CE)("span",g,(0,d.v_)(s.errors.name),1)):(0,a.Q3)("",!0),b,(0,a.bo)((0,a.Lk)("input",{type:"tel","onUpdate:modelValue":t[1]||(t[1]=e=>s.phoneNumber=e),required:"",placeholder:"+966"},null,512),[[r.Jo,s.phoneNumber]]),s.errors.phoneNumber?((0,a.uX)(),(0,a.CE)("span",v,(0,d.v_)(s.errors.phoneNumber),1)):(0,a.Q3)("",!0),y,s.formError?((0,a.uX)(),(0,a.CE)("span",w,(0,d.v_)(s.formError),1)):(0,a.Q3)("",!0)],32)])}var E=n(8355);const L="http://maabada.net";var $={data(){return{name:"",phoneNumber:"+966",errors:{},formError:""}},methods:{async submitForm(){if(this.errors={},this.formError="",this.name||(this.errors.name="الرجاء إدخال الاسم"),this.phoneNumber||(this.errors.phoneNumber="الرجاء إدخال رقم الهاتف"),!(Object.keys(this.errors).length>0))try{await E.A.post(`${L}/api/forms`,{name:this.name,phoneNumber:this.phoneNumber}),alert("تم إرسال النموذج بنجاح!"),this.name="",this.phoneNumber=""}catch(e){console.log("error",e.message),this.formError="حدث خطأ أثناء إرسال النموذج. الرجاء المحاولة مرة أخرى."}}}};const N=(0,i.A)($,[["render",k],["__scopeId","data-v-c724056e"]]);var _=N;const A=e=>((0,a.Qi)("data-v-741debea"),e=e(),(0,a.jt)(),e),D={class:"admin-container"},O={key:0,class:"loader"},C=A((()=>(0,a.Lk)("h1",null,"لوحة التحكم",-1)));function P(e,t,n,r,o,s){const i=(0,a.g2)("ag-grid-vue");return(0,a.uX)(),(0,a.CE)("div",D,[o.loading?((0,a.uX)(),(0,a.CE)("div",O)):(0,a.Q3)("",!0),C,(0,a.bF)(i,{columnDefs:o.columnDefs,rowData:o.requests,domLayout:"autoHeight",gridAutoHeight:!0,class:"ag-theme-quartz custom-ag-grid",enableRtl:!0,rowHeight:40,pagination:!0},null,8,["columnDefs","rowData"])])}var S=n(3505),j=n(9122),q=n.n(j),x={components:{AgGridVue:S.b},data(){return{requests:[],loading:!0,columnDefs:[{field:"id",headerName:"رقم",valueGetter:"node.rowIndex + 1"},{field:"name",headerName:"الاسم",sortable:!0},{field:"phoneNumber",headerName:"رقم الهاتف",sortable:!0},{headerName:"تحميل الصورة",cellRenderer:e=>{if(null!==e.data?._id){const t=document.createElement("div");return t.classList.add("btn-group"),t.innerHTML='\n                  <input\n                     className="upload__inputfile d-none"\n                     type="file"\n                     multiple=""\n                     data-max_length="20"\n                    name="image"\n                    accept="image/*"\n                    />\n            ',this.addClickEventListener(t,e.data),t}return""}},{headerName:"الصورة",cellRenderer:e=>{if(e.data?.urlPicture){const t=document.createElement("div");return t.classList.add("btn-group"),t.innerHTML=`\n                  <a href="${L}/api/admin/picture/${e.data?._id}/${e.data?.urlPicture}" target="_blank" class="btn btn-info">فتح الصورة</a>`,t}return""}},{headerName:"إرسال",cellRenderer:this.renderSendButton},{field:"creationDate",headerName:"تاريخ الإنشاء",valueFormatter:e=>{const t=new Date(e.value),n=`${t.getMonth()+1}/${t.getDate()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;return n}},{field:"sendDate",headerName:"تاريخ الإرسال",valueFormatter:e=>{if(e.value){const t=new Date(e.value),n=`${t.getMonth()+1}/${t.getDate()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;return n}}}]}},methods:{async takePhoto(e,t){this.loading=!0;const n=t?._id;try{const t=e.target.files[0];if(t){const e=new FormData;e.append("imageData",t),e.append("orderId",n);const r=await E.A.post(`${L}/api/admin/uploadPhoto`,e,{headers:{"Content-Type":"multipart/form-data"}});200===r.status&&alert("تم التقاط الصورة !"),this.loading=!1}}catch(r){this.loading=!1,console.error("Erreur lors de la prise de la photo :",r)}},renderSendButton(e){const t=e.data?.urlPicture;if(t){const t=document.createElement("div");return t.classList.add("btn-group"),t.innerHTML=`<button @click="sendPicture('${e.data}')" class="btn btn-success">إرسال</button>`,t}return""},addClickEventListener(e,t){e.addEventListener("change",(e=>this.takePhoto(e,t)))},async fetchRequests(){try{const e=await E.A.get(`${L}/api/admin/requests`);console.log("response",e),this.requests=e.data,this.loading=!1}catch(e){this.loading=!1,console.log("errer",e.message)}},async sendPicture(e){const t=`${L}/api/admin/picture/${e?._id}/${e?.urlPicture}`;try{const n=q().stringify({token:"x1y1nwz2fbss9sj8",to:e?.phoneNumber,image:t,caption:"جزاكم الله خيرًا ، ونسأل الله أن يجعل ذلك في ميزان حسناتكم."}),r={method:"post",url:"https://api.ultramsg.com/instance82295/messages/image",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:n},a=await(0,E.A)(r);console.log(JSON.stringify(a.data)),await E.A.post(`${L}/api/admin/update-send-date/${e?._id}`),await this.sendPictureToManager(t,e?.name),alert("تم إرسال الصورة إلى رقم الواتساب!")}catch(n){console.error(n)}},async sendPictureTomanager(e,t){var n=q().stringify({token:"x1y1nwz2fbss9sj8",to:966563466639,image:e,caption:t}),r={method:"post",url:"https://api.ultramsg.com/instance82295/messages/image",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:n};(0,E.A)(r).then((function(e){console.log(JSON.stringify(e.data))})).catch((function(e){console.log(e)}))}},mounted(){this.fetchRequests()}};const T=(0,i.A)(x,[["render",P],["__scopeId","data-v-741debea"]]);var F=T;const M=e=>((0,a.Qi)("data-v-1e1c2ae8"),e=e(),(0,a.jt)(),e),X={class:"login-container"},H=M((()=>(0,a.Lk)("h1",null,"تسجيل الدخول",-1))),Q=M((()=>(0,a.Lk)("label",null,"اسم المستخدم:",-1))),I=M((()=>(0,a.Lk)("label",null,"كلمة المرور:",-1))),J=M((()=>(0,a.Lk)("button",{type:"submit"},"تسجيل الدخول",-1))),R={key:0,class:"error"};function V(e,t,n,o,s,i){return(0,a.uX)(),(0,a.CE)("div",X,[H,(0,a.Lk)("form",{onSubmit:t[2]||(t[2]=(0,r.D$)(((...e)=>i.login&&i.login(...e)),["prevent"])),class:"login-form"},[Q,(0,a.bo)((0,a.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>s.username=e),required:""},null,512),[[r.Jo,s.username]]),I,(0,a.bo)((0,a.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>s.password=e),required:""},null,512),[[r.Jo,s.password]]),J,s.loginError?((0,a.uX)(),(0,a.CE)("span",R,(0,d.v_)(s.loginError),1)):(0,a.Q3)("",!0)],32)])}n(4114);var U={data(){return{username:"",password:"",loginError:""}},methods:{async login(){try{const e=await E.A.post(`${L}/api/admin/login`,{username:this.username,password:this.password});console.log("response",e),localStorage.setItem("isAuthenticated",!0),this.$router.push({name:"Admin"})}catch(e){e.response&&401===e.response.status?this.loginError="اسم المستخدم أو كلمة المرور غير صحيحة. الرجاء المحاولة مرة أخرى.":this.loginError="حدث خطأ أثناء عملية تسجيل الدخول. الرجاء المحاولة مرة أخرى لاحقًا."}}}};const z=(0,i.A)(U,[["render",V],["__scopeId","data-v-1e1c2ae8"]]);var B=z;const G=[{path:"/",name:"Form",component:_},{path:"/admin",name:"Admin",component:F,meta:{requiresAuth:!0}},{path:"/login",name:"Login",component:B}],Y=(0,c.aE)({history:(0,c.LA)(),routes:G});Y.beforeEach(((e,t,n)=>{const r=localStorage.getItem("isAuthenticated");e.matched.some((e=>e.meta.requiresAuth))?r?n():n({name:"Login"}):n()}));var W=Y;(0,r.Ef)(l).mount("#app");const K=(0,r.Ef)(l);K.use(W),K.mount("#app")},2634:function(){}},t={};function n(r){var a=t[r];if(void 0!==a)return a.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,r,a,o){if(!r){var s=1/0;for(c=0;c<e.length;c++){r=e[c][0],a=e[c][1],o=e[c][2];for(var i=!0,u=0;u<r.length;u++)(!1&o||s>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(i=!1,o<s&&(s=o));if(i){e.splice(c--,1);var l=a();void 0!==l&&(t=l)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[r,a,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var a,o,s=r[0],i=r[1],u=r[2],l=0;if(s.some((function(t){return 0!==e[t]}))){for(a in i)n.o(i,a)&&(n.m[a]=i[a]);if(u)var c=u(n)}for(t&&t(r);l<s.length;l++)o=s[l],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},r=self["webpackChunkfront"]=self["webpackChunkfront"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(5787)}));r=n.O(r)})();
//# sourceMappingURL=app.ff060a47.js.map