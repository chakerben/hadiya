(function(){var e={752:function(e,t,n){"use strict";var r=n(5130),o=n(6768);function a(e,t,n,r,a,s){const i=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.Wv)(i)}var s={name:"App"},i=n(1241);const u=(0,i.A)(s,[["render",a]]);var l=u,c=n(1387),d=n(4232);const m=e=>((0,o.Qi)("data-v-c724056e"),e=e(),(0,o.jt)(),e),p={class:"form-container"},h=m((()=>(0,o.Lk)("h1",null,"تقديم النموذج",-1))),f=m((()=>(0,o.Lk)("label",null,"الاسم:",-1))),g={key:0,class:"error"},b=m((()=>(0,o.Lk)("label",null,"رقم الهاتف:",-1))),v={key:1,class:"error"},y=m((()=>(0,o.Lk)("button",{type:"submit"},"إرسال",-1))),w={key:2,class:"error"};function k(e,t,n,a,s,i){return(0,o.uX)(),(0,o.CE)("div",p,[h,(0,o.Lk)("form",{onSubmit:t[2]||(t[2]=(0,r.D$)(((...e)=>i.submitForm&&i.submitForm(...e)),["prevent"])),class:"form"},[f,(0,o.bo)((0,o.Lk)("input",{"onUpdate:modelValue":t[0]||(t[0]=e=>s.name=e),required:""},null,512),[[r.Jo,s.name]]),s.errors.name?((0,o.uX)(),(0,o.CE)("span",g,(0,d.v_)(s.errors.name),1)):(0,o.Q3)("",!0),b,(0,o.bo)((0,o.Lk)("input",{type:"tel","onUpdate:modelValue":t[1]||(t[1]=e=>s.phoneNumber=e),required:"",placeholder:"+966"},null,512),[[r.Jo,s.phoneNumber]]),s.errors.phoneNumber?((0,o.uX)(),(0,o.CE)("span",v,(0,d.v_)(s.errors.phoneNumber),1)):(0,o.Q3)("",!0),y,s.formError?((0,o.uX)(),(0,o.CE)("span",w,(0,d.v_)(s.formError),1)):(0,o.Q3)("",!0)],32)])}var E=n(8355);const L="http://maabada.net";var $={data(){return{name:"",phoneNumber:"+966",errors:{},formError:""}},methods:{async submitForm(){if(this.errors={},this.formError="",this.name||(this.errors.name="الرجاء إدخال الاسم"),this.phoneNumber||(this.errors.phoneNumber="الرجاء إدخال رقم الهاتف"),!(Object.keys(this.errors).length>0))try{await E.A.post(`${L}/api/forms`,{name:this.name,phoneNumber:this.phoneNumber}),alert("تم إرسال النموذج بنجاح!"),this.name="",this.phoneNumber=""}catch(e){console.log("error",e.message),this.formError="حدث خطأ أثناء إرسال النموذج. الرجاء المحاولة مرة أخرى."}}}};const N=(0,i.A)($,[["render",k],["__scopeId","data-v-c724056e"]]);var A=N;const _=e=>((0,o.Qi)("data-v-341a9b6c"),e=e(),(0,o.jt)(),e),D={class:"admin-container"},O={key:0,class:"loader"},C=_((()=>(0,o.Lk)("h1",null,"لوحة التحكم",-1)));function j(e,t,n,r,a,s){const i=(0,o.g2)("ag-grid-vue");return(0,o.uX)(),(0,o.CE)("div",D,[a.loading?((0,o.uX)(),(0,o.CE)("div",O)):(0,o.Q3)("",!0),C,(0,o.bF)(i,{columnDefs:a.columnDefs,rowData:a.requests,domLayout:"autoHeight",gridAutoHeight:!0,class:"ag-theme-quartz custom-ag-grid",enableRtl:!0,rowHeight:40,pagination:!0},null,8,["columnDefs","rowData"])])}var q=n(3505),P=n(9122),S=n.n(P),x={components:{AgGridVue:q.b},data(){return{requests:[],loading:!0,columnDefs:[{field:"id",headerName:"رقم",valueGetter:"node.rowIndex + 1"},{field:"name",headerName:"الاسم",sortable:!0},{field:"phoneNumber",headerName:"رقم الهاتف",sortable:!0},{headerName:"إرسال",cellRenderer:e=>{if(null!==e.data?._id){const t=document.createElement("div");return t.classList.add("btn-group"),t.innerHTML='\n                  <input\n                     className="upload__inputfile d-none"\n                     type="file"\n                     multiple=""\n                     data-max_length="20"\n                    name="image"\n                    accept="image/*"\n                    />\n            ',this.addClickEventListener(t,e.data),t}return""}},{headerName:"الصورة",cellRenderer:e=>{if(e.data?.urlPicture){const t=document.createElement("div");return t.classList.add("btn-group"),t.innerHTML=`\n                  <a href="${L}/api/admin/picture/${e.data?._id}/${e.data?.urlPicture}" target="_blank" class="btn btn-info">فتح الصورة</a>`,t}return""}},{field:"creationDate",headerName:"تاريخ الإنشاء",valueFormatter:e=>{const t=new Date(e.value),n=`${t.getMonth()+1}/${t.getDate()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;return n}},{field:"sendDate",headerName:"تاريخ الإرسال",valueFormatter:e=>{if(e.value){const t=new Date(e.value),n=`${t.getMonth()+1}/${t.getDate()}/${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;return n}}}]}},methods:{async takePhoto(e,t){this.loading=!0;const n=t?._id,r=t?.phoneNumber;try{const o=e.target.files[0];if(o){const e=new FormData;e.append("imageData",o),e.append("orderId",n);const a=await E.A.post(`${L}/api/admin/uploadPhoto`,e,{headers:{"Content-Type":"multipart/form-data"}}),s=a.data?.imageUrl;await this.sendPicture(s,r),await E.A.post(`${L}/api/admin/update-send-date/${n}`),await this.sendPictureTomanager(s,t?.name),this.loading=!1}}catch(o){this.loading=!1,console.error("Erreur lors de la prise de la photo :",o)}},addClickEventListener(e,t){e.addEventListener("change",(e=>this.takePhoto(e,t)))},async fetchRequests(){try{const e=await E.A.get(`${L}/api/admin/requests`);console.log("response",e),this.requests=e.data,this.loading=!1}catch(e){this.loading=!1,console.log("errer",e.message)}},async sendPicture(e,t){var n=S().stringify({token:"x1y1nwz2fbss9sj8",to:t,image:e,caption:"جزاكم الله خيرًا ، ونسأل الله أن يجعل ذلك في ميزان حسناتكم."}),r={method:"post",url:"https://api.ultramsg.com/instance82295/messages/image",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:n};(0,E.A)(r).then((function(e){console.log(JSON.stringify(e.data)),alert("تم التقاط الصورة وإرسالها إلى رقم الواتساب!")})).catch((function(e){console.log(e)}))},async sendPictureTomanager(e,t){var n=S().stringify({token:"x1y1nwz2fbss9sj8",to:966563466639,image:e,caption:t}),r={method:"post",url:"https://api.ultramsg.com/instance82295/messages/image",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:n};(0,E.A)(r).then((function(e){console.log(JSON.stringify(e.data))})).catch((function(e){console.log(e)}))}},mounted(){this.fetchRequests()}};const F=(0,i.A)(x,[["render",j],["__scopeId","data-v-341a9b6c"]]);var T=F;const M=e=>((0,o.Qi)("data-v-1e1c2ae8"),e=e(),(0,o.jt)(),e),X={class:"login-container"},Q=M((()=>(0,o.Lk)("h1",null,"تسجيل الدخول",-1))),H=M((()=>(0,o.Lk)("label",null,"اسم المستخدم:",-1))),I=M((()=>(0,o.Lk)("label",null,"كلمة المرور:",-1))),J=M((()=>(0,o.Lk)("button",{type:"submit"},"تسجيل الدخول",-1))),R={key:0,class:"error"};function U(e,t,n,a,s,i){return(0,o.uX)(),(0,o.CE)("div",X,[Q,(0,o.Lk)("form",{onSubmit:t[2]||(t[2]=(0,r.D$)(((...e)=>i.login&&i.login(...e)),["prevent"])),class:"login-form"},[H,(0,o.bo)((0,o.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>s.username=e),required:""},null,512),[[r.Jo,s.username]]),I,(0,o.bo)((0,o.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>s.password=e),required:""},null,512),[[r.Jo,s.password]]),J,s.loginError?((0,o.uX)(),(0,o.CE)("span",R,(0,d.v_)(s.loginError),1)):(0,o.Q3)("",!0)],32)])}n(4114);var V={data(){return{username:"",password:"",loginError:""}},methods:{async login(){try{const e=await E.A.post(`${L}/api/admin/login`,{username:this.username,password:this.password});console.log("response",e),localStorage.setItem("isAuthenticated",!0),this.$router.push({name:"Admin"})}catch(e){e.response&&401===e.response.status?this.loginError="اسم المستخدم أو كلمة المرور غير صحيحة. الرجاء المحاولة مرة أخرى.":this.loginError="حدث خطأ أثناء عملية تسجيل الدخول. الرجاء المحاولة مرة أخرى لاحقًا."}}}};const z=(0,i.A)(V,[["render",U],["__scopeId","data-v-1e1c2ae8"]]);var G=z;const Y=[{path:"/",name:"Form",component:A},{path:"/admin",name:"Admin",component:T,meta:{requiresAuth:!0}},{path:"/login",name:"Login",component:G}],W=(0,c.aE)({history:(0,c.LA)(),routes:Y});W.beforeEach(((e,t,n)=>{const r=localStorage.getItem("isAuthenticated");e.matched.some((e=>e.meta.requiresAuth))?r?n():n({name:"Login"}):n()}));var B=W;(0,r.Ef)(l).mount("#app");const K=(0,r.Ef)(l);K.use(B),K.mount("#app")},2634:function(){}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,n),a.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,a){if(!r){var s=1/0;for(c=0;c<e.length;c++){r=e[c][0],o=e[c][1],a=e[c][2];for(var i=!0,u=0;u<r.length;u++)(!1&a||s>=a)&&Object.keys(n.O).every((function(e){return n.O[e](r[u])}))?r.splice(u--,1):(i=!1,a<s&&(s=a));if(i){e.splice(c--,1);var l=o();void 0!==l&&(t=l)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[r,o,a]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,a,s=r[0],i=r[1],u=r[2],l=0;if(s.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(u)var c=u(n)}for(t&&t(r);l<s.length;l++)a=s[l],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(c)},r=self["webpackChunkfront"]=self["webpackChunkfront"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[504],(function(){return n(752)}));r=n.O(r)})();
//# sourceMappingURL=app.ce9da466.js.map