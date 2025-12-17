var ve=Object.defineProperty;var De=(s,e,t)=>e in s?ve(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var R=(s,e,t)=>(De(s,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();function E(){}function Ae(s){return s()}function de(){return Object.create(null)}function v(s){s.forEach(Ae)}function Pe(s){return typeof s=="function"}function U(s,e){return s!=s?e==e:s!==e||s&&typeof s=="object"||typeof s=="function"}function Be(s){return Object.keys(s).length===0}function Fe(s,...e){if(s==null){for(const r of e)r(void 0);return E}const t=s.subscribe(...e);return t.unsubscribe?()=>t.unsubscribe():t}function We(s,e,t){s.$$.on_destroy.push(Fe(e,t))}function u(s,e){s.appendChild(e)}function b(s,e,t){s.insertBefore(e,t||null)}function P(s){s.parentNode&&s.parentNode.removeChild(s)}function Le(s,e){for(let t=0;t<s.length;t+=1)s[t]&&s[t].d(e)}function I(s){return document.createElement(s)}function he(s){return document.createTextNode(s)}function A(){return he(" ")}function Te(){return he("")}function G(s,e,t,r){return s.addEventListener(e,t,r),()=>s.removeEventListener(e,t,r)}function be(s){return function(e){return e.stopPropagation(),s.call(this,e)}}function d(s,e,t){t==null?s.removeAttribute(e):s.getAttribute(e)!==t&&s.setAttribute(e,t)}function Me(s){return Array.from(s.childNodes)}function Ge(s,e){e=""+e,s.data!==e&&(s.data=e)}function fe(s,e,t,r){t==null?s.style.removeProperty(e):s.style.setProperty(e,t,r?"important":"")}function _e(s,e,{bubbles:t=!1,cancelable:r=!1}={}){return new CustomEvent(s,{detail:e,bubbles:t,cancelable:r})}let V;function X(s){V=s}function we(){if(!V)throw new Error("Function called outside component initialization");return V}function Ue(s){we().$$.on_mount.push(s)}function Qe(){const s=we();return(e,t,{cancelable:r=!1}={})=>{const n=s.$$.callbacks[e];if(n){const i=_e(e,t,{cancelable:r});return n.slice().forEach(l=>{l.call(s,i)}),!i.defaultPrevented}return!0}}function ye(s,e){const t=s.$$.callbacks[e.type];t&&t.slice().forEach(r=>r.call(this,e))}const F=[],Ie=[];let _=[];const Ne=[],Xe=Promise.resolve();let le=!1;function Ve(){le||(le=!0,Xe.then(Ce))}function ce(s){_.push(s)}const se=new Set;let D=0;function Ce(){if(D!==0)return;const s=V;do{try{for(;D<F.length;){const e=F[D];D++,X(e),qe(e.$$)}}catch(e){throw F.length=0,D=0,e}for(X(null),F.length=0,D=0;Ie.length;)Ie.pop()();for(let e=0;e<_.length;e+=1){const t=_[e];se.has(t)||(se.add(t),t())}_.length=0}while(F.length);for(;Ne.length;)Ne.pop()();le=!1,se.clear(),X(s)}function qe(s){if(s.fragment!==null){s.update(),v(s.before_update);const e=s.dirty;s.dirty=[-1],s.fragment&&s.fragment.p(s.ctx,e),s.after_update.forEach(ce)}}function xe(s){const e=[],t=[];_.forEach(r=>s.indexOf(r)===-1?e.push(r):t.push(r)),t.forEach(r=>r()),_=e}const z=new Set;let k;function Z(){k={r:0,c:[],p:k}}function ee(){k.r||v(k.c),k=k.p}function $(s,e){s&&s.i&&(z.delete(s),s.i(e))}function w(s,e,t,r){if(s&&s.o){if(z.has(s))return;z.add(s),k.c.push(()=>{z.delete(s),r&&(t&&s.d(1),r())}),s.o(e)}else r&&r()}function j(s){return(s==null?void 0:s.length)!==void 0?s:Array.from(s)}function te(s){s&&s.c()}function q(s,e,t){const{fragment:r,after_update:n}=s.$$;r&&r.m(e,t),ce(()=>{const i=s.$$.on_mount.map(Ae).filter(Pe);s.$$.on_destroy?s.$$.on_destroy.push(...i):v(i),s.$$.on_mount=[]}),n.forEach(ce)}function x(s,e){const t=s.$$;t.fragment!==null&&(xe(t.after_update),v(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function Ke(s,e){s.$$.dirty[0]===-1&&(F.push(s),Ve(),s.$$.dirty.fill(0)),s.$$.dirty[e/31|0]|=1<<e%31}function K(s,e,t,r,n,i,l=null,o=[-1]){const c=V;X(s);const a=s.$$={fragment:null,ctx:[],props:i,update:E,not_equal:n,bound:de(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:de(),dirty:o,skip_bound:!1,root:e.target||c.$$.root};l&&l(a.root);let h=!1;if(a.ctx=t?t(s,e.props||{},(O,T,...N)=>{const f=N.length?N[0]:T;return a.ctx&&n(a.ctx[O],a.ctx[O]=f)&&(!a.skip_bound&&a.bound[O]&&a.bound[O](f),h&&Ke(s,O)),T}):[],a.update(),h=!0,v(a.before_update),a.fragment=r?r(a.ctx):!1,e.target){if(e.hydrate){const O=Me(e.target);a.fragment&&a.fragment.l(O),O.forEach(P)}else a.fragment&&a.fragment.c();e.intro&&$(s.$$.fragment),q(s,e.target,e.anchor),Ce()}X(c)}class Y{constructor(){R(this,"$$");R(this,"$$set")}$destroy(){x(this,1),this.$destroy=E}$on(e,t){if(!Pe(t))return E;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(t),()=>{const n=r.indexOf(t);n!==-1&&r.splice(n,1)}}$set(e){this.$$set&&!Be(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Ye="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Ye);const B=[];function Je(s,e=E){let t;const r=new Set;function n(o){if(U(s,o)&&(s=o,t)){const c=!B.length;for(const a of r)a[1](),B.push(a,s);if(c){for(let a=0;a<B.length;a+=2)B[a][0](B[a+1]);B.length=0}}}function i(o){n(o(s))}function l(o,c=E){const a=[o,c];return r.add(a),r.size===1&&(t=e(n,i)||E),o(s),()=>{r.delete(a),r.size===0&&t&&(t(),t=null)}}return{set:n,update:i,subscribe:l}}const W=40,M=24;function Se(){return Array.from({length:M},()=>Array.from({length:W},()=>" "))}function He(){return{buffer:Se(),cursorX:0,cursorY:0,cursorVisible:!0}}class ze{constructor(e){R(this,"state");R(this,"onUpdate");this.state=He(),this.onUpdate=e}notify(){this.onUpdate({...this.state,buffer:this.state.buffer.map(e=>[...e])})}getState(){return this.state}home(){this.state.buffer=Se(),this.state.cursorX=0,this.state.cursorY=0,this.notify()}vtab(e){this.state.cursorY=Math.max(0,Math.min(M-1,e-1)),this.notify()}htab(e){this.state.cursorX=Math.max(0,Math.min(W-1,e-1)),this.notify()}printChar(e){if(e===`
`){this.newLine();return}const t=e.toUpperCase();this.state.cursorX>=W&&this.newLine(),this.state.buffer[this.state.cursorY][this.state.cursorX]=t,this.state.cursorX++,this.notify()}print(e){for(const t of e)this.printChar(t)}println(e=""){this.print(e),this.newLine()}newLine(){this.state.cursorX=0,this.state.cursorY++,this.state.cursorY>=M&&(this.scroll(),this.state.cursorY=M-1),this.notify()}scroll(){this.state.buffer.shift(),this.state.buffer.push(Array.from({length:W},()=>" "))}clearLine(e){e>=0&&e<M&&(this.state.buffer[e]=Array.from({length:W},()=>" "),this.notify())}setChar(e,t,r){e>=0&&e<M&&t>=0&&t<W&&(this.state.buffer[e][t]=r.toUpperCase(),this.notify())}getCursor(){return{x:this.state.cursorX,y:this.state.cursorY}}setCursorVisible(e){this.state.cursorVisible=e,this.notify()}deleteChar(){this.state.cursorX>0&&(this.state.cursorX--,this.state.buffer[this.state.cursorY][this.state.cursorX]=" ",this.notify())}}const ke=Je(He());function je(s){ke.set(s)}function Ze(s){let e;return{c(){e=I("span"),e.textContent=" ",d(e,"class","cursor-hidden svelte-138op7u")},m(t,r){b(t,e,r)},d(t){t&&P(e)}}}function et(s){let e;return{c(){e=I("span"),e.textContent="█",d(e,"class","cursor svelte-138op7u")},m(t,r){b(t,e,r)},d(t){t&&P(e)}}}function tt(s){let e;function t(i,l){return i[0]?et:Ze}let r=t(s),n=r(s);return{c(){n.c(),e=Te()},m(i,l){n.m(i,l),b(i,e,l)},p(i,[l]){r!==(r=t(i))&&(n.d(1),n=r(i),n&&(n.c(),n.m(e.parentNode,e)))},i:E,o:E,d(i){i&&P(e),n.d(i)}}}function st(s,e,t){let{visible:r=!0}=e;return s.$$set=n=>{"visible"in n&&t(0,r=n.visible)},[r]}class rt extends Y{constructor(e){super(),K(this,e,st,tt,U,{visible:0})}}function nt(s){let e;return{c(){e=I("div"),d(e,"class","scanlines svelte-azb01k"),fe(e,"--scanline-opacity",s[0])},m(t,r){b(t,e,r)},p(t,[r]){r&1&&fe(e,"--scanline-opacity",t[0])},i:E,o:E,d(t){t&&P(e)}}}function it(s,e,t){let{intensity:r=.25}=e;return s.$$set=n=>{"intensity"in n&&t(0,r=n.intensity)},[r]}class at extends Y{constructor(e){super(),K(this,e,it,nt,U,{intensity:0})}}function Re(s,e,t){const r=s.slice();return r[5]=e[t],r[7]=t,r}function me(s,e,t){const r=s.slice();return r[8]=e[t],r[10]=t,r}function ot(s){let e,t=s[8]+"",r;return{c(){e=I("span"),r=he(t),d(e,"class","char svelte-7ef20d")},m(n,i){b(n,e,i),u(e,r)},p(n,i){i&8&&t!==(t=n[8]+"")&&Ge(r,t)},i:E,o:E,d(n){n&&P(e)}}}function lt(s){let e,t;return e=new rt({props:{visible:!0}}),{c(){te(e.$$.fragment)},m(r,n){q(e,r,n),t=!0},p:E,i(r){t||($(e.$$.fragment,r),t=!0)},o(r){w(e.$$.fragment,r),t=!1},d(r){x(e,r)}}}function Oe(s){let e,t,r,n;const i=[lt,ot],l=[];function o(c,a){return c[7]===c[1]&&c[10]===c[2]&&c[0]?0:1}return e=o(s),t=l[e]=i[e](s),{c(){t.c(),r=Te()},m(c,a){l[e].m(c,a),b(c,r,a),n=!0},p(c,a){let h=e;e=o(c),e===h?l[e].p(c,a):(Z(),w(l[h],1,1,()=>{l[h]=null}),ee(),t=l[e],t?t.p(c,a):(t=l[e]=i[e](c),t.c()),$(t,1),t.m(r.parentNode,r))},i(c){n||($(t),n=!0)},o(c){w(t),n=!1},d(c){c&&P(r),l[e].d(c)}}}function Ee(s){let e,t,r,n=j(s[5]),i=[];for(let o=0;o<n.length;o+=1)i[o]=Oe(me(s,n,o));const l=o=>w(i[o],1,1,()=>{i[o]=null});return{c(){e=I("div");for(let o=0;o<i.length;o+=1)i[o].c();t=A(),d(e,"class","screen-row svelte-7ef20d")},m(o,c){b(o,e,c);for(let a=0;a<i.length;a+=1)i[a]&&i[a].m(e,null);u(e,t),r=!0},p(o,c){if(c&15){n=j(o[5]);let a;for(a=0;a<n.length;a+=1){const h=me(o,n,a);i[a]?(i[a].p(h,c),$(i[a],1)):(i[a]=Oe(h),i[a].c(),$(i[a],1),i[a].m(e,t))}for(Z(),a=n.length;a<i.length;a+=1)l(a);ee()}},i(o){if(!r){for(let c=0;c<n.length;c+=1)$(i[c]);r=!0}},o(o){i=i.filter(Boolean);for(let c=0;c<i.length;c+=1)w(i[c]);r=!1},d(o){o&&P(e),Le(i,o)}}}function ct(s){let e,t,r,n,i,l,o,c,a=j(s[3]),h=[];for(let T=0;T<a.length;T+=1)h[T]=Ee(Re(s,a,T));const O=T=>w(h[T],1,1,()=>{h[T]=null});return i=new at({props:{intensity:.2}}),{c(){e=I("div"),t=I("div"),r=I("div");for(let T=0;T<h.length;T+=1)h[T].c();n=A(),te(i.$$.fragment),l=A(),o=I("div"),d(r,"class","screen-content svelte-7ef20d"),d(o,"class","vignette svelte-7ef20d"),d(t,"class","crt-screen svelte-7ef20d"),d(e,"class","crt-monitor svelte-7ef20d")},m(T,N){b(T,e,N),u(e,t),u(t,r);for(let f=0;f<h.length;f+=1)h[f]&&h[f].m(r,null);u(t,n),q(i,t,null),u(t,l),u(t,o),c=!0},p(T,[N]){if(N&15){a=j(T[3]);let f;for(f=0;f<a.length;f+=1){const L=Re(T,a,f);h[f]?(h[f].p(L,N),$(h[f],1)):(h[f]=Ee(L),h[f].c(),$(h[f],1),h[f].m(r,null))}for(Z(),f=a.length;f<h.length;f+=1)O(f);ee()}},i(T){if(!c){for(let N=0;N<a.length;N+=1)$(h[N]);$(i.$$.fragment,T),c=!0}},o(T){h=h.filter(Boolean);for(let N=0;N<h.length;N+=1)w(h[N]);w(i.$$.fragment,T),c=!1},d(T){T&&P(e),Le(h,T),x(i)}}}function ht(s,e,t){let r,n,i,l,o;return We(s,ke,c=>t(4,o=c)),s.$$.update=()=>{s.$$.dirty&16&&t(3,r=o.buffer),s.$$.dirty&16&&t(2,n=o.cursorX),s.$$.dirty&16&&t(1,i=o.cursorY),s.$$.dirty&16&&t(0,l=o.cursorVisible)},[l,i,n,r,o]}class Tt extends Y{constructor(e){super(),K(this,e,ht,ct,U,{})}}function ut(s){let e,t,r,n,i,l,o,c,a,h,O,T,N,f,L,y,S,Q;return{c(){e=I("div"),t=I("div"),r=I("button"),r.textContent="✕",n=A(),i=I("h1"),i.textContent="Original AppleSoft BASIC Code",l=A(),o=I("p"),o.textContent="XWORD.TXT - Crossword Solving Aid by C.A. Small (April 1988)",c=A(),a=I("div"),h=I("section"),h.innerHTML=`<h2 class="svelte-1olhtmq">How It Works</h2> <h3 class="svelte-1olhtmq">Overview</h3> <p class="svelte-1olhtmq">This program is a crossword puzzle solving aid written in AppleSoft BASIC for the Apple II computer.
          It maintains a dictionary of words organized by length (3-16 characters) and first-letter groups,
          allowing users to search for partial words and find anagrams.</p> <h3 class="svelte-1olhtmq">Key Features</h3> <ul class="svelte-1olhtmq"><li class="svelte-1olhtmq"><strong class="svelte-1olhtmq">Dictionary Management:</strong> Add and remove words from a persistent dictionary stored on floppy disk (or RAM disk).</li> <li class="svelte-1olhtmq"><strong class="svelte-1olhtmq">Wildcard Search:</strong> Find words matching a pattern where unknown letters are marked with spaces. For example, &quot;C_T&quot; would match CAT, COT, CUT, etc.</li> <li class="svelte-1olhtmq"><strong class="svelte-1olhtmq">Anagram Solver:</strong> Find all dictionary words that are anagrams of given letters.</li></ul> <h3 class="svelte-1olhtmq">The Anagram Algorithm</h3> <p class="svelte-1olhtmq">The cleverest part of this code is the anagram detection algorithm (lines 150-190, 25080-25130).
          Instead of sorting letters and comparing, it uses a mathematical hash:</p> <ol class="svelte-1olhtmq"><li class="svelte-1olhtmq">Each letter A-Z is assigned a prime number (A=2, B=3, C=5, D=7, ...)</li> <li class="svelte-1olhtmq">The hash of a word is the sum of LOG values of each letter&#39;s prime</li> <li class="svelte-1olhtmq">Two words are anagrams if and only if their hashes match</li></ol> <p class="svelte-1olhtmq">This is elegant because LOG(a) + LOG(b) = LOG(a×b), and prime factorization is unique.
          So &quot;CAT&quot; and &quot;ACT&quot; produce the same hash since 5×2×71 = 2×5×71.</p> <h3 class="svelte-1olhtmq">Data Organization</h3> <p class="svelte-1olhtmq">Words are stored in files named L{length}.{bucket} where:</p> <ul class="svelte-1olhtmq"><li class="svelte-1olhtmq">Length = 3 to 16 characters</li> <li class="svelte-1olhtmq">Bucket 1-8 based on first letter: (a-b, c-d, e-g, h-k, l-o, p-r, s, t-z)</li></ul> <p class="svelte-1olhtmq">This organization speeds up searches by limiting which files need to be scanned.</p> <h3 class="svelte-1olhtmq">BASIC Commands Used</h3> <ul class="svelte-1olhtmq"><li class="svelte-1olhtmq"><code class="svelte-1olhtmq">HOME</code> - Clear screen</li> <li class="svelte-1olhtmq"><code class="svelte-1olhtmq">VTAB n / HTAB n</code> - Position cursor</li> <li class="svelte-1olhtmq"><code class="svelte-1olhtmq">PRINT</code> - Output text</li> <li class="svelte-1olhtmq"><code class="svelte-1olhtmq">INPUT</code> - Get user input with prompt</li> <li class="svelte-1olhtmq"><code class="svelte-1olhtmq">GET</code> - Get single keypress (no Enter needed)</li> <li class="svelte-1olhtmq"><code class="svelte-1olhtmq">CHR$(4)</code> - ProDOS disk commands prefix</li> <li class="svelte-1olhtmq"><code class="svelte-1olhtmq">PEEK / POKE</code> - Direct memory access</li></ul>`,O=A(),T=I("section"),N=I("h2"),N.textContent="Complete Source Code",f=A(),L=I("pre"),y=I("code"),y.textContent=`${s[1]}`,d(r,"class","close-btn svelte-1olhtmq"),d(i,"class","svelte-1olhtmq"),d(o,"class","subtitle svelte-1olhtmq"),d(h,"class","description svelte-1olhtmq"),d(N,"class","svelte-1olhtmq"),d(y,"class","svelte-1olhtmq"),d(L,"class","svelte-1olhtmq"),d(T,"class","code-section svelte-1olhtmq"),d(a,"class","content svelte-1olhtmq"),d(t,"class","modal svelte-1olhtmq"),d(t,"role","document"),d(e,"class","overlay svelte-1olhtmq"),d(e,"role","dialog"),d(e,"tabindex","-1")},m(p,m){b(p,e,m),u(e,t),u(t,r),u(t,n),u(t,i),u(t,l),u(t,o),u(t,c),u(t,a),u(a,h),u(a,O),u(a,T),u(T,N),u(T,f),u(T,L),u(L,y),S||(Q=[G(r,"click",s[0]),G(t,"click",be(s[2])),G(e,"click",s[0]),G(e,"keydown",s[3])],S=!0)},p:E,i:E,o:E,d(p){p&&P(e),S=!1,v(Q)}}}function dt(s){const e=Qe();function t(){e("close")}const r=` 100  CLEAR
 110  ONERR  GOTO 50000
 120 D$ =  CHR$ (4)
 130  PRINT D$;"PR#3"
 140  DIM A$(16,8,25),B$(3000),C$(16),P$(16),W$(16),WW$(16),A(16),B(26),J(16,8),CC(16)
 150  DATA 1,2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97
 160  FOR I = 1 TO 26
 170  READ B(I)
 180 B(I) =  INT ( LOG (B(I)) * 1E8 + .5)
 190  NEXT
 200  PRINT D$;"CREATE/RAM5/DATA"
 210  VTAB 12
 220  GOSUB 45000
 230  PRINT D$;"CLOSE"
 240  HOME :M$ = "CROSSWORD SOLVING AID":MM$ = "BY C.A. SMALL ... APRIL 1988"
 250 M =  LEN (M$):MM =  LEN (MM$)
 260  VTAB 2: HTAB (79 - M) / 2: PRINT M$
 270  VTAB 4: HTAB (79 - MM) / 2: PRINT MM$
 280  VTAB 8: HTAB (20): PRINT "ENTER NEW WORDS IN DICTIONARY ........A"
 290  VTAB 10: HTAB (20): PRINT "REMOVE DICTIONARY ENTRIES ............B"
 300  VTAB 12: HTAB (20): PRINT "RECALL - PART WORD ...................C"
 310  VTAB 14: HTAB (20): PRINT "SOLVE ANAGRAM ........................D"
 330  VTAB 16: HTAB (20): PRINT "SORT AND QUIT ........................E"
 350  VTAB 20: HTAB (26): PRINT "ENTER LETTER OF YOUR CHOICE"
 360  GET R$
 370  IF  ASC (R$) > 64 AND  ASC (R$) < 71 THEN R$ =  CHR$ ( ASC (R$) + 32)
 380  IF  ASC (R$) < 97 OR  ASC (R$) > 102 THEN 350
 390 C =  ASC (R$) - 96
 400  HOME
 410  IF C >  < 1 GOTO 440
 420  GOSUB 1000
 430  GOTO 240
 440  IF C >  < 2 GOTO 470
 450  GOSUB 30420
 460  GOTO 240
 470  IF C >  < 3 GOTO 500
 480  GOSUB 30000
 490  GOTO 240
 500  IF C >  < 4 GOTO 550
 510  GOSUB 25000
 550  IF C >  < 5 GOTO 240
 552  HOME : VTAB 10: HTAB (20)
 554  PRINT "DISPLAY WORDS ? ...... Y(es) or N(o) "
 555  PRINT : HTAB (20)
 556  GET W$: IF W$ = "N" OR W$ = "n" THEN MK = 1
 560  GOSUB 20000
 570  END

1000  INPUT "Enter WORD (3 to 16 characters)                     ";W$
1010  IF W$ = "" GOTO 1000
1020 L =  LEN (W$)
1030  IF L < 3 OR L > 16 GOTO 1000
1040  GOSUB 2000
1050  IF P$ = "" GOTO 1000
1060  IF  ASC (P$) > 96 AND  ASC (P$) < 99 THEN LM = 1
1065  IF  ASC (P$) > 98 AND  ASC (P$) < 101 THEN LM = 2
1070  IF  ASC (P$) > 100 AND  ASC (P$) < 104 THEN LM = 3
1075  IF  ASC (P$) > 103 AND  ASC (P$) < 108 THEN LM = 4
1080  IF  ASC (P$) > 107 AND  ASC (P$) < 112 THEN LM = 5
1082  IF  ASC (P$) > 111 AND  ASC (P$) < 115 THEN LM = 6
1084  IF  ASC (P$) = 115 THEN LM = 7
1086  IF  ASC (P$) > 115 AND  ASC (P$) < 123 THEN LM = 8
1090  IF J(L,LM) = 0 GOTO 1130
1100  FOR I = 1 TO J(L,LM)
1110  IF P$ = A$(L,LM,I) THEN  GOTO 1170
1120  NEXT I
1130 J(0,0) = J(0,0) + 1
1140 J(L,LM) = J(L,LM) + 1
1150 A$(L,LM,J(L,LM)) = P$
1160  IF J(L,LM) = 25 THEN  GOTO 1230
1170  PRINT "Do you wish to enter another word ? "
1180  PRINT "Y(es) or N(o) "
1190  GET W$
1200  IF W$ = "Y" OR W$ = "y" GOTO 1000
1210  IF W$ = "N" OR W$ = "n" GOTO 1230
1220  PRINT  CHR$ (7): GOTO 1190
1230  GOSUB 5000
1240  RETURN

2000 P$ = ""
2010  FOR I = 1 TO L
2020 T% =  ASC ( MID$ (W$,I,1))
2030  IF T% < 65 OR T% > 122 THEN P$ = "": RETURN
2040  IF T% > 90 AND T% < 97 THEN P$ = "": RETURN
2050  IF T% > 90 THEN 2070
2060 T% = T% + 32
2070 P$(I) =  CHR$ (T%)
2080 P$ = P$ + P$(I)
2090  NEXT I
2100  RETURN

5000  FOR BL = 1 TO 2: PRINT  CHR$ (7): NEXT
5010  PRINT : HTAB 24: PRINT "WORDS BEING PROCESSED   --   PLEASE WAIT": PRINT
5020  PRINT D$;"PREFIX/RAM5/DATA"
5030  IF J(0,0) = 0 THEN  GOTO 5390
5040  FOR L = 3 TO 16
5050  FOR Q = 1 TO 8
5060  IF J(L,Q) = 0 GOTO 5320
5070  PRINT D$;"OPEN L";L;".";Q
5080  PRINT D$;"READ L";L;".";Q
5100  INPUT T
5110  IF T = 1000 GOTO 5150
5120  FOR K = 1 TO (T - 1000)
5130  INPUT B$(K)
5140  NEXT K
5150  PRINT D$;"CLOSE L";L;".";Q
5160 HI = 0
5170  FOR K = 1 TO T - 1000
5180  FOR H = 1 TO J(L,Q)
5190  IF B$(K) = A$(L,Q,H) THEN A$(L,Q,H) = "":HI = HI + 1
5200  NEXT H
5210  NEXT K
5220 T = T + J(L,Q) - HI
5230  PRINT D$;"OPEN L";L;".";Q
5240  PRINT D$;"WRITE L";L;".";Q
5250  PRINT T
5260  FOR G = 1 TO J(L,Q)
5270  IF A$(L,Q,G) = "" THEN  GOTO 5300
5280  PRINT D$;"APPEND L";L;".";Q
5290  PRINT A$(L,Q,G)
5300  NEXT G
5310  PRINT D$;"CLOSE L";L;".";Q
5320  NEXT Q
5330  NEXT L
5340  FOR BL = 1 TO 4: PRINT  CHR$ (7): NEXT
5350  IF W$ = "N" OR W$ = "n" GOTO 5390
5370  GOTO 1000
5390  RETURN

15000  HOME : VTAB 12: HTAB (35)
15010  PRINT "FILE L";L;".";Q
15020  PRINT D$;"CLOSE"
15040  PRINT D$;"PREFIX/XWORD/DATA"
15050  PRINT D$;"OPEN L";L;".";Q
15060  PRINT D$;"READ L";L;".";Q
15070  INPUT TX
15080  PRINT D$;"CLOSE L";L;".";Q
15090  PRINT D$;"PREFIX/RAM5/DATA"
15100  PRINT D$;"OPEN L";L;".";Q
15110  PRINT D$;"READ L";L;".";Q
15120  INPUT T
15130  IF TX = T THEN  POP : GOTO 20175
15140  HTAB 24: PRINT "THERE ARE ";T - 1000;" WORDS IN FILE L";L;".";Q
15150  FOR W = 1 TO 15000: NEXT
15160  FOR I = 1 TO T - 1000
15170 I$ =  STR$ (I)
15180  INPUT B$(I)
15190  IF MK THEN  GOTO 15250
15200  PRINT  SPC( 4 -  LEN (I$));I;" ";B$(I);
15210 U =  PEEK (1403)
15220 U = U + 3
15230  IF U > 75 - L THEN U = 0: PRINT
15240  POKE 1403,U
15250  NEXT I
15260  PRINT D$;"CLOSE L";L;".";Q
15280  PRINT : PRINT : HTAB 30: PRINT "SORTING IN PROGRESS": PRINT : PRINT
15290 N = T - 1000
15300 M = N
15310 S = M / 2
15320 M =  INT (S)
15330  IF M = 0 THEN 15470
15340 K = N - M
15350 J = 1
15360 I = J
15370 G = I + M
15380  IF B$(I) <  = B$(G) THEN 15440
15390 T$ = B$(I)
15400 B$(I) = B$(G)
15410 B$(G) = T$
15420 I = I - M
15430  IF I >  = 1 THEN 15370
15440 J = J + 1
15450  IF J > K THEN 15310
15460  GOTO 15360
15470  PRINT D$;"OPEN L";L;".";Q
15480  PRINT D$;"WRITE L";L;".";Q
15490  PRINT T
15500  FOR I = 1 TO T - 1000
15510  PRINT B$(I)
15520  NEXT I
15530  PRINT D$;"CLOSE L";L;".";Q
15540  RETURN

20000  VTAB 12: HTAB (20): PRINT "DO YOU WISH TO QUIT ?  (Y/N)"
20010  GET R$
20020  IF R$ = "Y" OR R$ = "y" THEN  GOTO 20040
20030  POP : GOTO 240
20040 TT = 0
20050  FOR L = 3 TO 16
20060  FOR Q = 1 TO 8
20070  PRINT D$;"PREFIX/RAM5/DATA"
20080  GOSUB 15000
20085  PRINT : PRINT : HTAB 32: PRINT "STORING TO DISC"
20090  PRINT D$;"PREFIX/XWORD/DATA"
20100  PRINT D$;"OPEN L";L;".";Q
20110  PRINT D$;"WRITE L";L;".";Q
20120  PRINT T
20140  FOR I = 1 TO T - 1000
20150  PRINT B$(I)
20160  NEXT I
20170  PRINT D$;"CLOSE L";L;".";Q
20175 TT = TT + T - 1000
20180  NEXT Q
20190  NEXT L
20200  PRINT "Total words stored is ";TT
20210  FOR BL = 1 TO 4: PRINT  CHR$ (7): NEXT
20230  RETURN

25000  REM === ANAGRAM SOLVER ===
25010  PRINT D$;"PREFIX/RAM5/DATA"
25020  HOME :J1 = 0:X = 0
25030  FOR I = 0 TO 16:W$(I) = "":WW$(I) = "":A(I) = 0: NEXT I
25040  VTAB 12: INPUT "Enter ANAGRAM letters        ";W$
25050 L =  LEN (W$): IF L < 3 OR L > 16 THEN 25030
25060  GOSUB 2000: REM  CONVERT TO LOWER CASE LETTERS
25070  IF P$ = "" GOTO 25000
25080  FOR I = 1 TO L
25090 A(I) =  ASC ( MID$ (P$,I,1))
25100 X = B(A(I) - 96) + X
25110 W$(I) =  CHR$ (A(I))
25120  NEXT I
25130 A = X
25140  FOR II = 1 TO L
25150  FOR I = 2 TO L
25160  IF W$(I - 1) > W$(I) THEN W$(0) = W$(I - 1):W$(I - 1) = W$(I):W$(I) = W$(0)
25170  NEXT I
25180  NEXT II
25190  FOR I = 1 TO 8:Q$(I) = "": NEXT I
25200  FOR I = 1 TO L
25210  IF W$(I) <  CHR$ (99) AND W$(I) > Q$(1) THEN Q$(1) = W$(I): GOTO 25260
25220  IF W$(I) <  CHR$ (101) AND W$(I) >  CHR$ (98) AND W$(I) > Q$(2) THEN Q$(2) = W$(I): GOTO 25260
25230  IF W$(I) <  CHR$ (104) AND W$(I) >  CHR$ (100) AND W$(I) > Q$(3) THEN Q$(3) = W$(I): GOTO 25260
25240  IF W$(I) <  CHR$ (108) AND W$(I) >  CHR$ (103) AND W$(I) > Q$(4) THEN Q$(4) = W$(I): GOTO 25260
25242  IF W$(I) <  CHR$ (112) AND W$(I) >  CHR$ (107) AND W$(I) > Q$(5) THEN Q$(5) = W$(I): GOTO 25260
25244  IF W$(I) <  CHR$ (115) AND W$(I) >  CHR$ (111) AND W$(I) > Q$(6) THEN Q$(6) = W$(I): GOTO 25260
25246  IF W$(I) <  CHR$ (116) AND W$(I) >  CHR$ (114) AND W$(I) > Q$(7) THEN Q$(7) = W$(I): GOTO 25260
25250  IF W$(I) > Q$(8) AND W$(I) >  CHR$ (115) THEN Q$(8) = W$(I)
25260  NEXT I
25270  PRINT : PRINT "SEARCHING  --  PLEASE WAIT": PRINT
25280  FOR Q = 1 TO 8
25290  IF Q$(Q) = "" THEN  GOTO 25440
25300  PRINT D$;"OPEN L";L;".";Q
25310  PRINT D$;"READ L";L;".";Q
25320  INPUT J1
25330  IF J1 = 1000 THEN  PRINT "NO WORDS OF ";L;" CHARACTERS": GOTO 25440
25340  FOR N = 1 TO J1 - 1000
25350  INPUT C$(0)
25360  IF  MID$ (C$(0),1,1) > Q$(Q) THEN  GOTO 25440
25370 X = 0
25380  FOR I = 1 TO L
25390 A(I) =  ASC ( MID$ (C$(0),I,1))
25400 X = B(A(I) - 96) + X
25410  NEXT I
25420  IF A = X THEN  PRINT C$(0)
25430  NEXT N
25440  PRINT D$;"CLOSE L";L;".";Q
25450  NEXT Q
25460  PRINT
25470  PRINT "Do you wish to search for other anagrams ?"
25480  PRINT "Y(es) or N(o)"
25490  GET W$
25500  IF W$ = "Y" OR W$ = "y" THEN  HOME : GOTO 25010
25510  IF W$ = "N" OR W$ = "n" THEN  GOTO 25530
25520  GOTO 25490
25530  RETURN

30000  REM === WILDCARD SEARCH ===
30010  PRINT D$;"PREFIX/RAM5/DATA"
30020  HOME : PRINT "NUMBER of CHARACTERS = ";: GET K$
30025  IF  ASC (K$) < 48 OR  ASC (K$) > 57 THEN  GOTO 30020
30027  PRINT K$;
30030  IF  VAL (K$) > 1 THEN  PRINT : GOTO 30050
30040  GET KK$
30042  IF  ASC (KK$) < 48 OR  ASC (KK$) > 54 THEN  GOTO 30040
30045  PRINT KK$:K$ = K$ + KK$
30050 L =  VAL (K$)
30060  IF L < 3 OR L > 16 GOTO 30020
30070  PRINT : PRINT "ENTER CHARACTER AGAINST POSITION NUMBER": PRINT
30080  PRINT "     USE 'SPACEBAR' FOR NULL": PRINT
30090  FOR I = 1 TO L
30100  PRINT "   ";I;" = ";
30102  GET C$(I)
30104  IF  ASC (C$(I)) = 32 THEN  GOTO 30138
30106  IF  ASC (C$(I)) < 97 THEN C$(I) =  CHR$ ( ASC (C$(I)) + 32)
30108  IF  ASC (C$(I)) > 122 THEN  GOTO 30102
30110  IF  ASC (C$(I)) < 97 THEN  GOTO 30102
30138  PRINT C$(I)
30140  NEXT I
30141  IF  ASC (C$(1)) = 32 GOTO 30150
30142  IF  ASC (C$(1)) < 99 THEN Z(0) = 1:Z(1) = 1: GOTO 30155
30143  IF  ASC (C$(1)) < 101 THEN Z(0) = 2:Z(1) = 2: GOTO 30155
30144  IF  ASC (C$(1)) < 104 THEN Z(0) = 3:Z(1) = 3: GOTO 30155
30145  IF  ASC (C$(1)) < 108 THEN Z(0) = 4:Z(1) = 4: GOTO 30155
30146  IF  ASC (C$(1)) < 112 THEN Z(0) = 5:Z(1) = 5: GOTO 30155
30147  IF  ASC (C$(1)) < 115 THEN Z(0) = 6:Z(1) = 6: GOTO 30155
30148  IF  ASC (C$(1)) < 116 THEN Z(0) = 7:Z(1) = 7: GOTO 30155
30149 Z(0) = 8:Z(1) = 8: GOTO 30155
30150 Z(0) = 1:Z(1) = 8
30155  FOR Q = Z(0) TO Z(1)
30160  PRINT D$;"OPEN L";L;".";Q
30170  PRINT D$;"READ L";L;".";Q
30180  INPUT J1
30190  IF J1 = 1000 THEN  PRINT "NO WORDS OF ";L;" CHARACTERS": GOTO 30340
30195  IF  ASC (C$(1)) > 99 THEN  GOTO 30210
30200  IF Q > 1 GOTO 30220
30210  PRINT : PRINT "SEARCHING  --  PLEASE WAIT": PRINT
30220  FOR N = 1 TO J1 - 1000
30230  INPUT B$(0)
30240  FOR I = 1 TO L
30250  IF C$(I) = " " THEN 30270
30255  IF  MID$ (B$(0),1,1) > C$(1) AND  ASC (C$(1)) > 32 THEN 30340
30260  IF C$(I) >  <  MID$ (B$(0),I,1) THEN 30330
30270  NEXT I
30280  PRINT B$(0);
30290 U =  PEEK (1403)
30300 U = U + 3
30310  IF U > 80 - L THEN U = 0: PRINT
30320  POKE 1403,U
30330  NEXT N
30340  PRINT D$;"CLOSE L";L;".";Q
30350  NEXT Q
30360  PRINT
30370  HTAB 12: PRINT "Do you wish to SEARCH for another WORD ?  Y(es) or N(o)";
30380  GET W$
30390  IF W$ = "Y" OR W$ = "y" THEN  HOME : GOTO 30020
30400  IF W$ = "N" OR W$ = "n" GOTO 30420
30410  GOTO 30380
30420  RETURN

30430  REM === REMOVE WORDS ===
30440  PRINT D$;"PREFIX/RAM5/DATA"
35000 P$ = "": HOME
35010  VTAB 10: HTAB 21: INPUT "WHAT LENGTH OF WORD FOR REMOVAL ? ";K$
35012  IF  VAL (K$) < 3 AND  VAL (K$) > 16 THEN  GOTO 35010
35015  VTAB 15: HTAB 21: PRINT "USE 'CONTROL-S' TO HALT WORD LISTING"
35016  FOR D = 1 TO 20000: NEXT D
35040 L =  VAL (K$)
35050  IF L < 3 OR L > 16 GOTO 35000
35055  HOME : VTAB 10: HTAB 21: PRINT "WHICH SECTION CONTAINS FIRST LETTER"
35057  PRINT : HTAB (24): PRINT "a to b ...................... 1"
35058  PRINT : HTAB (24): PRINT "c to d ...................... 2"
35059  PRINT : HTAB (24): PRINT "e to g ...................... 3"
35060  PRINT : HTAB (24): PRINT "h to k ...................... 4"
35061  PRINT : HTAB (24): PRINT "l to o ...................... 5"
35062  PRINT : HTAB (24): PRINT "p to r ...................... 6"
35063  PRINT : HTAB (24): PRINT "s ........................... 7"
35064  PRINT : HTAB (24): PRINT "t to z ...................... 8"
35067  GET Q
35068  IF Q < 1 OR Q > 8 GOTO 35067
35080  PRINT D$;"OPEN L";L;".";Q
35090  PRINT D$;"READ L";L;".";Q
35100  INPUT T:TT = T
35110  IF T = 1000 THEN  GOTO 35130
35120  GOTO 35140
35130  PRINT "NO WORDS OF ";L;" CHARACTERS EXIST": GOTO 35230
35140  FOR I = 1 TO T - 1000
35150 I$ =  STR$ (I)
35160  INPUT B$(I)
35170  PRINT  SPC( 4 -  LEN (I$));I;" ";B$(I);
35180 U =  PEEK (1403)
35190 U = U + 3
35200  IF U > 75 - L THEN U = 0: PRINT
35210  POKE 1403,U
35220  NEXT I
35230  PRINT D$;"CLOSE L";L;".";Q
35240  PRINT
35250  PRINT : INPUT "WHICH NUMBER WORD IS TO BE REMOVED (0 FOR NONE) ";R
35260  IF R = 0 GOTO 35420
35265  IF R > T - 1000 GOTO 35250
35270  PRINT : INPUT "ARE YOU SURE YOU WANT TO REMOVE THAT ENTRY ? Y(es) or N(o) ";W$
35280  IF W$ = "" GOTO 35270
35290  IF W$ = "Y" OR W$ = "y" THEN TT = TT - 1:P$ = W$: GOTO 35310
35300  GOTO 35420
35310 B$(R) = P$
35320  PRINT D$;"DELETE L";L;".";Q
35330  PRINT D$;"OPEN L";L;".";Q
35340  PRINT D$;"WRITE L";L;".";Q
35341  FOR JJ = 1 TO 2
35342  IF JJ = 2 THEN  PRINT D$;"OPEN/XWORD/DATA/L";L;".";Q: PRINT D$;"WRITE/XWORD/DATA/L";L;".";Q
35350  PRINT TT
35360  FOR I = 1 TO T - 1000
35370  IF B$(I) = "Y" OR B$(I) = "y" GOTO 35390
35380  PRINT B$(I)
35390  NEXT I
35391  IF JJ = 2 THEN  PRINT D$;"CLOSE/XWORD/DATA/L";L;".";Q
35392  NEXT JJ
35400  PRINT D$;"CLOSE L";L;".";Q
35420  PRINT : PRINT : PRINT : PRINT "Do you wish to make other corrections ?"
35430  PRINT : PRINT "  Y(es) or N(o)"
35440  GET W$
35450  IF W$ = "Y" OR W$ = "y" GOTO 35000
35460  IF W$ = "N" OR W$ = "n" GOTO 35480
35470  GOTO 35440
35480  RETURN

39999  REM === CLEAR REGISTERS ===
40000  FOR I = 0 TO 16
40010  FOR IJ = 1 TO 8
40020 J(I,IJ) = 0
40030  FOR II = 0 TO 25
40040 A$(I,IJ,II) = ""
40050  NEXT II
40060  NEXT IJ
40070  NEXT I
40080  FOR I = 1 TO 3000
40090 B$(I) = ""
40100  NEXT I
40110  RETURN

44999  REM === LOAD RAM WITH WORDS FROM DATA FILES ON DISK ===
45000  FOR L = 3 TO 16
45010  FOR Q = 1 TO 8
45020  HOME : VTAB 12: PRINT "LOADING FILE L";L;".";Q;" INTO RAM"
45030  PRINT D$;"PREFIX/XWORD/DATA"
45050  PRINT D$;"OPEN L";L;".";Q
45060  PRINT D$;"READ L";L;".";Q
45070  INPUT T
45080  FOR I = 1 TO T - 1000
45090  INPUT B$(I)
45100  NEXT I
45110  PRINT D$;"CLOSE L";L;".";Q
45120  PRINT D$;"PREFIX/RAM5/DATA"
45130  PRINT D$;"OPEN L";L;".";Q
45140  PRINT D$;"WRITE L";L;".";Q
45150  PRINT T
45160  FOR I = 1 TO T - 1000
45170  PRINT B$(I)
45180  NEXT I
45190  PRINT D$;"CLOSE L";L;".";Q
45210  NEXT Q
45220  NEXT L
45230  RETURN

50000  REM === ERROR HANDLER ===
50010 E =  PEEK (222)
50020  PRINT "ERROR CODE ";E
50030  IF E = 19 THEN  GOTO 230
50040  IF E = 8 THEN  PRINT "I/O ERROR"
50050  IF E = 77 THEN  PRINT "OUT OF MEMORY"
50060  END`;function n(l){ye.call(this,s,l)}return[t,r,n,l=>l.key==="Escape"&&t()]}class ft extends Y{constructor(e){super(),K(this,e,dt,ut,U,{})}}class It{constructor(){R(this,"screen");R(this,"inputMode","none");R(this,"inputBuffer","");R(this,"inputPrompt","");R(this,"inputMaxLength",40);R(this,"inputResolver",null);R(this,"keyHandler",null);R(this,"audioContext",null);this.screen=new ze(je)}HOME(){this.screen.home()}VTAB(e){this.screen.vtab(e)}HTAB(e){this.screen.htab(e)}PRINT(e){this.screen.print(e)}PRINTLN(e=""){this.screen.println(e)}BEEP(){try{this.audioContext||(this.audioContext=new AudioContext);const e=this.audioContext.createOscillator(),t=this.audioContext.createGain();e.connect(t),t.connect(this.audioContext.destination),e.frequency.value=1e3,e.type="square",t.gain.value=.1,e.start(),e.stop(this.audioContext.currentTime+.1)}catch{}}async INPUT(e="",t=40){return new Promise(r=>{this.PRINT(e),this.inputMode="input",this.inputBuffer="",this.inputPrompt=e,this.inputMaxLength=t,this.inputResolver=r,this.screen.setCursorVisible(!0),this.setupKeyHandler()})}async GET(){return new Promise(e=>{this.inputMode="get",this.inputResolver=e,this.screen.setCursorVisible(!0),this.setupKeyHandler()})}setupKeyHandler(){this.keyHandler&&document.removeEventListener("keydown",this.keyHandler),this.keyHandler=e=>{this.handleKeyDown(e)},document.addEventListener("keydown",this.keyHandler)}handleKeyDown(e){if(this.inputResolver){if(e.preventDefault(),this.inputMode==="get"){let t=e.key;t.length===1?(t=t.toUpperCase(),this.finishInput(t)):e.key==="Enter"?this.finishInput(`
`):e.key==="Escape"&&this.finishInput("\x1B")}else if(this.inputMode==="input")if(e.key==="Enter")this.PRINTLN(),this.finishInput(this.inputBuffer);else if(e.key==="Backspace")this.inputBuffer.length>0?(this.inputBuffer=this.inputBuffer.slice(0,-1),this.screen.deleteChar()):this.BEEP();else if(e.key.length===1&&this.inputBuffer.length<this.inputMaxLength){const t=e.key.toUpperCase();this.inputBuffer+=t,this.screen.printChar(t)}else e.key.length===1&&this.BEEP()}}finishInput(e){this.keyHandler&&(document.removeEventListener("keydown",this.keyHandler),this.keyHandler=null),this.inputMode="none",this.screen.setCursorVisible(!1),this.inputResolver&&(this.inputResolver(e),this.inputResolver=null)}printCentered(e,t){const r=Math.floor((40-e.length)/2)+1;this.VTAB(t),this.HTAB(r),this.PRINT(e)}clear(){this.HOME()}wait(e){return new Promise(t=>setTimeout(t,e))}getScreen(){return this.screen}}let re=null;function Nt(){return re||(re=new It),re}const pe="xword_dictionary";class C{constructor(){R(this,"words",new Map);this.load()}static getBucket(e){const t=e.toLowerCase().charCodeAt(0);return t<=98?1:t<=100?2:t<=103?3:t<=107?4:t<=111?5:t<=114?6:t===115?7:8}static getKey(e){const t=e.length,r=C.getBucket(e);return`L${t}.${r}`}addWord(e){const t=e.toLowerCase().trim();if(t.length<3||t.length>16||!/^[a-z]+$/.test(t))return!1;const r=C.getKey(t),n=this.words.get(r)||[];return n.includes(t)?!1:(n.push(t),n.sort(),this.words.set(r,n),this.save(),!0)}removeWord(e){const t=e.toLowerCase().trim(),r=C.getKey(t),n=this.words.get(r);if(!n)return!1;const i=n.indexOf(t);return i===-1?!1:(n.splice(i,1),this.save(),!0)}getWords(e,t){const r=`L${e}.${t}`;return this.words.get(r)||[]}getWordsByLength(e){const t=[];for(let r=1;r<=8;r++)t.push(...this.getWords(e,r));return t.sort()}getTotalCount(){let e=0;return this.words.forEach(t=>{e+=t.length}),e}getFileCount(e,t){return this.getWords(e,t).length}save(){try{const e={};this.words.forEach((t,r)=>{e[r]=t}),localStorage.setItem(pe,JSON.stringify(e))}catch(e){console.error("Failed to save dictionary:",e)}}load(){try{const e=localStorage.getItem(pe);if(e){const t=JSON.parse(e);this.words=new Map(Object.entries(t))}else this.loadSampleWords()}catch(e){console.error("Failed to load dictionary:",e),this.loadSampleWords()}}loadSampleWords(){const e=["ace","add","age","aid","aim","air","all","and","ant","any","ape","arc","are","ark","arm","art","ash","ask","ate","awe","axe","bad","bag","ban","bar","bat","bay","bed","bee","bet","bid","big","bin","bit","bow","box","boy","bud","bug","bus","but","buy","cab","can","cap","car","cat","cop","cow","cry","cub","cup","cut","dad","dam","day","den","dew","did","die","dig","dim","dip","dog","dot","dry","dub","due","dug","dye","ear","eat","eel","egg","ego","elk","elm","emu","end","era","eve","eye","fad","fan","far","fat","fax","fed","fee","few","fig","fin","fir","fit","fix","fly","foe","fog","for","fox","fry","fun","fur","gap","gas","get","gin","got","gum","gun","gut","guy","gym","had","ham","has","hat","hay","hen","her","hid","him","hip","his","hit","hog","hop","hot","how","hub","hue","hug","hut","ice","icy","ill","imp","ink","inn","ion","its","ivy","jab","jam","jar","jaw","jay","jet","jig","job","jog","joy","jug","key","kid","kin","kit","lab","lad","lag","lap","law","lay","lea","led","leg","let","lid","lie","lip","lit","log","lot","low","lug","mad","man","map","mat","may","men","met","mid","mix","mob","mom","mop","mud","mug","nab","nag","nap","net","new","nil","nip","nod","nor","not","now","nut","oak","oar","oat","odd","ode","off","oft","oil","old","one","opt","orb","ore","our","out","owe","owl","own","pad","pal","pan","par","pat","paw","pay","pea","peg","pen","pep","per","pet","pie","pig","pin","pit","ply","pod","pop","pot","pro","pry","pub","pun","pup","put","rag","ram","ran","rap","rat","raw","ray","red","ref","rib","rid","rig","rim","rip","rob","rod","rot","row","rub","rug","run","rut","rye","sad","sag","sap","sat","saw","say","sea","set","sew","she","shy","sin","sip","sir","sis","sit","six","ski","sky","sly","sob","sod","son","sop","sot","sow","soy","spa","spy","sub","sue","sum","sun","tab","tad","tag","tan","tap","tar","tax","tea","ten","the","thy","tic","tie","tin","tip","toe","ton","too","top","tow","toy","try","tub","tug","two","urn","use","van","vat","vet","via","vie","vow","wad","wag","war","was","wax","way","web","wed","wet","who","why","wig","win","wit","woe","wok","won","woo","wow","yak","yam","yap","yaw","yea","yes","yet","yew","yin","you","zap","zed","zen","zip","zoo","able","ache","acid","aged","aide","also","area","army","away","baby","back","bake","ball","band","bank","bare","barn","base","bath","beam","bean","bear","beat","beef","been","beer","bell","belt","bend","bent","best","bill","bind","bird","bite","blow","blue","boat","body","bold","bomb","bond","bone","book","boom","boot","bore","born","boss","both","bowl","bulk","burn","bush","busy","cafe","cage","cake","call","calm","came","camp","card","care","case","cash","cast","cave","cell","chip","city","clay","club","clue","coal","coat","code","coin","cold","come","cook","cool","cope","copy","core","corn","cost","crop","cure","dark","data","date","dawn","days","dead","deal","dean","dear","debt","deck","deep","deer","deny","desk","dial","diet","dirt","dish","disk","dock","does","done","door","dose","down","draw","drew","drop","drug","drum","dual","duck","dull","dust","duty","each","earn","ease","east","easy","edge","edit","else","even","ever","evil","exam","exit","face","fact","fade","fail","fair","fake","fall","fame","farm","fast","fate","fear","feat","feed","feel","feet","fell","felt","file","fill","film","find","fine","fire","firm","fish","five","flag","flat","fled","flew","flip","flow","fold","folk","food","fool","foot","ford","form","fort","foul","four","free","from","fuel","full","fund","gain","game","gang","gate","gave","gear","gene","gift","girl","give","glad","glow","goal","goat","goes","gold","golf","gone","good","grab","gray","grew","grey","grid","grin","grip","grow","gulf","hair","half","hall","hand","hang","hard","harm","hate","have","head","heal","hear","heat","heel","held","hell","help","here","hero","hide","high","hill","hint","hire","hold","hole","holy","home","hope","horn","host","hour","huge","hung","hunt","hurt","icon","idea","inch","into","iron","item","jack","jail","jane","jean","jobs","john","join","joke","josh","jump","june","jury","just","keen","keep","kent","kept","kick","kill","kind","king","knee","knew","knit","know","lack","lady","laid","lake","lamp","land","lane","last","late","lawn","lead","leaf","lean","leap","left","lend","lens","less","life","lift","like","limb","lime","line","link","lion","list","live","load","loan","lock","logo","long","look","loop","lord","lose","loss","lost","lots","loud","love","luck","made","mail","main","make","male","mall","many","mark","mars","mask","mass","mate","math","meal","mean","meat","meet","menu","mere","mess","mild","mile","milk","mill","mind","mine","mint","miss","mode","mood","moon","more","most","move","much","must","myth","nail","name","navy","near","neat","neck","need","nest","news","next","nice","nick","nine","node","none","noon","nose","note","noun","odds","okay","once","ones","only","onto","open","oral","oven","over","pace","pack","page","paid","pain","pair","pale","palm","park","part","pass","past","path","peak","peer","pick","pile","pine","pink","pipe","pity","plan","play","plea","plot","plug","plus","poem","poet","pole","poll","pond","pool","poor","pope","pork","port","pose","post","pour","pray","pull","pump","pure","push","quit","race","rack","rage","raid","rail","rain","rank","rare","rate","read","real","rear","rely","rent","rest","rice","rich","ride","ring","riot","rise","risk","road","rock","rode","role","roll","roof","room","root","rope","rose","rule","rush","safe","saga","sage","said","sail","sake","sale","salt","same","sand","sang","save","scan","seal","seat","seed","seek","seem","seen","self","sell","send","sent","sept","ship","shop","shot","show","shut","sick","side","sigh","sign","silk","sing","sink","site","size","skin","slip","slow","snap","snow","soft","soil","sold","sole","some","song","soon","sort","soul","span","spin","spot","star","stay","stem","step","stir","stop","such","suit","sure","swim","tail","take","tale","talk","tall","tank","tape","task","team","tear","tech","tell","temp","tend","tent","term","test","text","than","that","them","then","they","thin","this","thus","tide","tile","till","time","tiny","tire","to","told","toll","tone","took","tool","tops","tore","torn","tour","town","trap","tree","trim","trip","true","tube","tune","turn","twin","type","unit","upon","used","user","vary","vast","very","vice","view","vote","wage","wait","wake","walk","wall","want","ward","warm","warn","wash","wave","weak","wear","week","well","went","were","west","what","when","whom","wide","wife","wild","will","wind","wine","wing","wire","wise","wish","with","woke","wolf","wood","wool","word","wore","work","worn","wrap","yard","yeah","year","yoga","your","zero","zone","zoom","about","above","abuse","actor","acute","admit","adopt","adult","after","again","agent","agree","ahead","alarm","album","alert","alien","align","alike","alive","alley","allow","alloy","alone","along","alter","among","angel","anger","angle","angry","anime","apart","apple","apply","arena","argue","arise","armor","array","arrow","aside","asset","atlas","audio","audit","avoid","award","aware","awful","bacon","badge","basic","basin","basis","beach","beard","beast","begin","being","belly","below","bench","berry","birth","black","blade","blame","blank","blast","blaze","bleed","blend","bless","blind","blink","block","blond","blood","bloom","blown","blues","blunt","blush","board","boast","bonus","booth","bored","bound","brain","brake","brand","brass","brave","bread","break","breed","brick","bride","brief","bring","broad","broke","brook","broom","brown","brush","build","built","bunch","burst","buyer","cabin","cable","cache","camel","canal","candy","cargo","carry","carve","catch","cause","chain","chair","charm","chart","chase","cheap","cheat","check","cheek","cheer","chess","chest","chief","child","china","choir","chord","chose","chunk","civic","civil","claim","clash","class","clean","clear","clerk","click","cliff","climb","cling","clock","close","cloth","cloud","clown","coach","coast","color","colon","comet","coral","couch","cough","could","count","court","cover","crack","craft","crane","crash","crawl","crazy","cream","creek","creep","crest","crime","crisp","cross","crowd","crown","crude","cruel","crush","curve","cycle","daily","dairy","dance","dated","dealt","death","debut","decay","decor","delay","demon","dense","depot","depth","derby","desk","devil","diary","digit","dirty","disco","ditch","diver","dizzy","dodge","doing","donor","doubt","dough","dozen","draft","drain","drama","drank","drawn","dread","dream","dress","dried","drift","drill","drink","drive","drown","drunk","dying","eager","eagle","early","earth","eaten","eater","edge","eight","elbow","elder","elect","elite","email","ember","empty","ended","enemy","enjoy","enter","entry","equal","equip","erase","error","essay","ethos","event","every","exact","exert","exist","extra","fable","faced","facet","faith","false","famed","fancy","fault","favor","feast","fence","ferry","fetch","fever","fiber","field","fiery","fifth","fifty","fight","final","first","fixed","flame","flash","flask","fleet","flesh","float","flock","flood","floor","flora","flour","flown","fluid","flush","flute","focus","foggy","force","forge","forth","forty","forum","found","frame","frank","fraud","freak","fresh","fried","front","frost","fruit","fully","funny","fuzzy","ghost","giant","given","gland","glare","glass","gleam","glide","globe","glory","gloss","glove","going","golden","goods","goose","grace","grade","grain","grand","grant","grape","graph","grasp","grass","grave","great","greed","greek","green","greet","grief","grill","grind","groan","groom","gross","group","grove","growl","grown","guard","guess","guest","guide","guild","guilt","guise"];for(const t of e)this.addWord(t)}clear(){this.words.clear(),this.save()}getAllWords(){const e=[];return this.words.forEach(t=>{e.push(...t)}),e.sort()}}let ne=null;function ue(){return ne||(ne=new C),ne}class Rt{constructor(){R(this,"dictionary");this.dictionary=ue()}search(e,t){const r=e.toLowerCase(),n=[],i=[];let l;r.length>0&&r[0]!==" "?l=[C.getBucket(r[0])]:l=[1,2,3,4,5,6,7,8];for(const o of l){i.push(o);const c=this.dictionary.getWords(t,o);for(const a of c)this.matchesPattern(a,r)&&n.push(a)}return{words:n,searchedBuckets:i}}matchesPattern(e,t){if(e.length!==t.length)return!1;for(let r=0;r<t.length;r++){const n=t[r],i=e[r];if(n!==" "&&n!==i)return!1}return!0}formatResults(e,t=5){const r=[];let n="",i=0;for(const l of e)i>0&&i%t===0&&(r.push(n.trim()),n=""),n+=l.padEnd(l.length+2),i++;return n.trim()&&r.push(n.trim()),r}}let ie=null;function mt(){return ie||(ie=new Rt),ie}const Ot=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101],Et=Ot.map(s=>Math.round(Math.log(s)*1e8));class pt{constructor(){R(this,"dictionary");this.dictionary=ue()}calculateHash(e){let t=0;const r=e.toLowerCase();for(let n=0;n<r.length;n++){const i=r.charCodeAt(n);i>=97&&i<=122&&(t+=Et[i-97])}return t}findAnagrams(e){const t=e.toLowerCase().replace(/[^a-z]/g,""),r=t.length;if(r<3||r>16)return[];const n=this.calculateHash(t),i=t.split("").sort(),l=this.getBucketsFromLetters(i),o=[];for(const c of l){const a=this.dictionary.getWords(r,c);for(const h of a)this.calculateHash(h)===n&&o.push(h)}return o}getBucketsFromLetters(e){const t=new Set;for(const r of e)t.add(C.getBucket(r));return Array.from(t).sort((r,n)=>r-n)}getMaxLettersPerBucket(e){const t=new Map;for(const r of e){const n=C.getBucket(r),i=t.get(n);(!i||r>i)&&t.set(n,r)}return t}formatResults(e){return e.map((t,r)=>`${r+1}. ${t.toUpperCase()}`)}}let ae=null;function gt(){return ae||(ae=new pt),ae}function J(s){return s.toUpperCase()==="Y"||s.toUpperCase()==="YES"}function $t(s){return s.toUpperCase()==="N"||s.toUpperCase()==="NO"}class At{constructor(){R(this,"terminal");R(this,"dictionary");R(this,"wordSearch");R(this,"anagramSolver");R(this,"state",0);R(this,"running",!1);this.terminal=Nt(),this.dictionary=ue(),this.wordSearch=mt(),this.anagramSolver=gt()}async start(){for(this.running=!0,this.state=1,await this.runLoadingSequence();this.running;)switch(this.state){case 2:await this.showMainMenu();break;case 3:await this.addWordsMode();break;case 4:await this.removeWordsMode();break;case 5:await this.wordSearchMode();break;case 7:await this.anagramMode();break;case 8:await this.quitConfirm();break;case 9:this.running=!1;break;default:this.state=2}}async runLoadingSequence(){for(let e=3;e<=8;e++)for(let t=1;t<=8;t++)this.terminal.HOME(),this.terminal.VTAB(12),this.terminal.PRINT(`        LOADING FILE L${e}.${t} INTO RAM`),await this.terminal.wait(30);await this.terminal.wait(200),this.state=2}async showMainMenu(){this.terminal.HOME();const e="CROSSWORD SOLVING AID",t="BY C.A. SMALL ... APRIL 1988";switch(this.terminal.VTAB(2),this.terminal.HTAB(Math.floor((40-e.length)/2)+1),this.terminal.PRINT(e),this.terminal.VTAB(4),this.terminal.HTAB(Math.floor((40-t.length)/2)+1),this.terminal.PRINT(t),this.terminal.VTAB(8),this.terminal.HTAB(3),this.terminal.PRINT("ENTER NEW WORDS IN DICTIONARY ......A"),this.terminal.VTAB(10),this.terminal.HTAB(3),this.terminal.PRINT("REMOVE DICTIONARY ENTRIES ..........B"),this.terminal.VTAB(12),this.terminal.HTAB(3),this.terminal.PRINT("RECALL - PART WORD .................C"),this.terminal.VTAB(14),this.terminal.HTAB(3),this.terminal.PRINT("SOLVE ANAGRAM ......................D"),this.terminal.VTAB(16),this.terminal.HTAB(3),this.terminal.PRINT("QUIT ...............................E"),this.terminal.VTAB(18),this.terminal.HTAB(3),this.terminal.PRINT(`DICTIONARY CONTAINS ${this.dictionary.getTotalCount()} WORDS`),this.terminal.VTAB(20),this.terminal.HTAB(7),this.terminal.PRINT("ENTER LETTER OF YOUR CHOICE"),(await this.terminal.GET()).toUpperCase()){case"A":this.state=3;break;case"B":this.state=4;break;case"C":this.state=5;break;case"D":this.state=7;break;case"E":this.state=8;break;default:this.terminal.BEEP()}}async addWordsMode(){for(this.terminal.HOME();;){this.terminal.VTAB(1),this.terminal.HTAB(1);const e=await this.terminal.INPUT("ENTER WORD (3 TO 16 CHARACTERS): ");if(e===""){this.state=2;return}if(e.length<3||e.length>16){this.terminal.PRINTLN(),this.terminal.PRINTLN("WORD MUST BE 3 TO 16 CHARACTERS"),this.terminal.BEEP(),await this.terminal.wait(1e3),this.terminal.HOME();continue}if(!/^[A-Za-z]+$/.test(e)){this.terminal.PRINTLN(),this.terminal.PRINTLN("LETTERS ONLY PLEASE"),this.terminal.BEEP(),await this.terminal.wait(1e3),this.terminal.HOME();continue}const t=this.dictionary.addWord(e);this.terminal.PRINTLN(),t?this.terminal.PRINTLN(`"${e.toUpperCase()}" ADDED TO DICTIONARY`):this.terminal.PRINTLN(`"${e.toUpperCase()}" ALREADY EXISTS`),this.terminal.PRINTLN(),this.terminal.PRINT("ADD ANOTHER WORD? Y(ES) OR N(O) ");const r=await this.terminal.GET();if($t(r)){this.state=2;return}this.terminal.HOME()}}async removeWordsMode(){this.terminal.HOME(),this.terminal.VTAB(10),this.terminal.HTAB(5);const e=await this.terminal.INPUT("WORD LENGTH TO REMOVE (3-16): "),t=parseInt(e,10);if(isNaN(t)||t<3||t>16){this.terminal.PRINTLN(),this.terminal.PRINTLN("INVALID LENGTH"),this.terminal.BEEP(),await this.terminal.wait(1500),this.state=2;return}this.terminal.HOME(),this.terminal.VTAB(2),this.terminal.HTAB(5),this.terminal.PRINTLN("WHICH SECTION CONTAINS FIRST LETTER"),this.terminal.PRINTLN(),this.terminal.HTAB(8),this.terminal.PRINTLN("A TO B ...................... 1"),this.terminal.HTAB(8),this.terminal.PRINTLN("C TO D ...................... 2"),this.terminal.HTAB(8),this.terminal.PRINTLN("E TO G ...................... 3"),this.terminal.HTAB(8),this.terminal.PRINTLN("H TO K ...................... 4"),this.terminal.HTAB(8),this.terminal.PRINTLN("L TO O ...................... 5"),this.terminal.HTAB(8),this.terminal.PRINTLN("P TO R ...................... 6"),this.terminal.HTAB(8),this.terminal.PRINTLN("S ........................... 7"),this.terminal.HTAB(8),this.terminal.PRINTLN("T TO Z ...................... 8"),this.terminal.PRINTLN();const r=await this.terminal.GET(),n=parseInt(r,10);if(isNaN(n)||n<1||n>8){this.terminal.BEEP(),this.state=2;return}const i=this.dictionary.getWords(t,n);if(this.terminal.HOME(),i.length===0){this.terminal.PRINTLN(`NO ${t}-LETTER WORDS IN SECTION ${n}`),await this.terminal.wait(1500),this.state=2;return}this.terminal.PRINTLN(`${i.length} WORDS IN FILE L${t}.${n}:`),this.terminal.PRINTLN();for(let h=0;h<i.length;h++)this.terminal.PRINT(`${(h+1).toString().padStart(3)} ${i[h].toUpperCase()}  `),(h+1)%4===0&&this.terminal.PRINTLN();this.terminal.PRINTLN(),this.terminal.PRINTLN();const l=await this.terminal.INPUT("NUMBER TO REMOVE (0 FOR NONE): "),o=parseInt(l,10);if(isNaN(o)||o===0){this.state=2;return}if(o<1||o>i.length){this.terminal.PRINTLN("INVALID NUMBER"),this.terminal.BEEP(),await this.terminal.wait(1e3),this.state=2;return}const c=i[o-1];this.terminal.PRINTLN(),this.terminal.PRINT(`REMOVE "${c.toUpperCase()}"? Y(ES) OR N(O) `);const a=await this.terminal.GET();J(a)&&(this.dictionary.removeWord(c),this.terminal.PRINTLN(),this.terminal.PRINTLN("WORD REMOVED")),await this.terminal.wait(1e3),this.state=2}async wordSearchMode(){this.terminal.HOME(),this.terminal.PRINT("NUMBER OF CHARACTERS = ");const e=await this.terminal.INPUT(""),t=parseInt(e,10);if(isNaN(t)||t<3||t>16){this.terminal.PRINTLN(),this.terminal.PRINTLN("LENGTH MUST BE 3 TO 16"),this.terminal.BEEP(),await this.terminal.wait(1500),this.state=2;return}this.terminal.PRINTLN(),this.terminal.PRINTLN("ENTER CHARACTER AGAINST POSITION NUMBER"),this.terminal.PRINTLN(),this.terminal.PRINTLN("     USE 'SPACEBAR' FOR UNKNOWN LETTERS"),this.terminal.PRINTLN();let r="";for(let l=1;l<=t;l++){this.terminal.PRINT(`   ${l} = `);const o=await this.terminal.GET();this.terminal.PRINTLN(o===" "?"_":o),r+=o}this.terminal.PRINTLN(),this.terminal.PRINTLN("SEARCHING -- PLEASE WAIT"),this.terminal.PRINTLN();const n=this.wordSearch.search(r,t);if(n.words.length===0)this.terminal.PRINTLN("NO MATCHING WORDS FOUND");else{this.terminal.PRINTLN(`FOUND ${n.words.length} MATCHES:`),this.terminal.PRINTLN();let l=0;for(const o of n.words){const c=o.toUpperCase()+"  ";l+c.length>38&&(this.terminal.PRINTLN(),l=0),this.terminal.PRINT(c),l+=c.length}this.terminal.PRINTLN()}this.terminal.PRINTLN(),this.terminal.PRINT("SEARCH FOR ANOTHER WORD? Y(ES) OR N(O) ");const i=await this.terminal.GET();J(i)||(this.state=2)}async anagramMode(){this.terminal.HOME(),this.terminal.VTAB(12);const e=await this.terminal.INPUT("ENTER ANAGRAM LETTERS: ");if(e.length<3||e.length>16){this.terminal.PRINTLN(),this.terminal.PRINTLN("ENTER 3 TO 16 LETTERS"),this.terminal.BEEP(),await this.terminal.wait(1500),this.state=2;return}if(!/^[A-Za-z]+$/.test(e)){this.terminal.PRINTLN(),this.terminal.PRINTLN("LETTERS ONLY PLEASE"),this.terminal.BEEP(),await this.terminal.wait(1500),this.state=2;return}this.terminal.PRINTLN(),this.terminal.PRINTLN("SEARCHING -- PLEASE WAIT"),this.terminal.PRINTLN();const t=this.anagramSolver.findAnagrams(e);if(t.length===0)this.terminal.PRINTLN("NO ANAGRAMS FOUND");else{this.terminal.PRINTLN(`FOUND ${t.length} ANAGRAM(S):`),this.terminal.PRINTLN();for(const n of t)this.terminal.PRINTLN(`  ${n.toUpperCase()}`)}this.terminal.PRINTLN(),this.terminal.PRINT("SEARCH FOR OTHER ANAGRAMS? Y(ES) OR N(O) ");const r=await this.terminal.GET();J(r)||(this.state=2)}async quitConfirm(){this.terminal.HOME(),this.terminal.VTAB(12),this.terminal.HTAB(8),this.terminal.PRINT("DO YOU WISH TO QUIT? (Y/N) ");const e=await this.terminal.GET();J(e)?(this.terminal.HOME(),this.terminal.VTAB(12),this.terminal.HTAB(10),this.terminal.PRINTLN("THANK YOU FOR USING"),this.terminal.HTAB(10),this.terminal.PRINTLN("CROSSWORD SOLVING AID"),this.terminal.PRINTLN(),this.terminal.HTAB(10),this.terminal.PRINTLN(`${this.dictionary.getTotalCount()} WORDS STORED`),this.state=9):this.state=2}stop(){this.running=!1}}let oe=null;function Pt(){return oe||(oe=new At),oe}function ge(s){let e;return{c(){e=I("div"),e.innerHTML="<p>Click anywhere to start...</p>",d(e,"class","loading-overlay svelte-w3860l")},m(t,r){b(t,e,r)},d(t){t&&P(e)}}}function $e(s){let e,t;return e=new ft({}),e.$on("close",s[4]),{c(){te(e.$$.fragment)},m(r,n){q(e,r,n),t=!0},p:E,i(r){t||($(e.$$.fragment,r),t=!0)},o(r){w(e.$$.fragment,r),t=!1},d(r){x(e,r)}}}function Lt(s){let e,t,r,n,i,l,o,c,a,h,O,T,N,f,L,y,S,Q;r=new Tt({});let p=!s[0]&&ge(),m=s[1]&&$e(s);return{c(){e=I("main"),t=I("div"),te(r.$$.fragment),n=A(),p&&p.c(),i=A(),l=I("footer"),o=I("p"),o.textContent="xWord - Crossword Solving Aid",c=A(),a=I("p"),a.textContent="By C.A.SMALL (1988)",h=A(),O=I("p"),O.textContent="Press keys A-E to select menu options",T=A(),N=I("button"),N.textContent="View Original BASIC Code",f=A(),m&&m.c(),L=Te(),d(t,"class","container svelte-w3860l"),d(o,"class","svelte-w3860l"),d(a,"class","svelte-w3860l"),d(O,"class","hint svelte-w3860l"),d(N,"class","code-btn svelte-w3860l"),d(l,"class","svelte-w3860l"),d(e,"class","svelte-w3860l")},m(g,H){b(g,e,H),u(e,t),q(r,t,null),u(t,n),p&&p.m(t,null),u(e,i),u(e,l),u(l,o),u(l,c),u(l,a),u(l,h),u(l,O),u(l,T),u(l,N),b(g,f,H),m&&m.m(g,H),b(g,L,H),y=!0,S||(Q=[G(N,"click",s[2]),G(N,"mousedown",be(s[3]))],S=!0)},p(g,[H]){g[0]?p&&(p.d(1),p=null):p||(p=ge(),p.c(),p.m(t,null)),g[1]?m?(m.p(g,H),H&2&&$(m,1)):(m=$e(g),m.c(),$(m,1),m.m(L.parentNode,L)):m&&(Z(),w(m,1,1,()=>{m=null}),ee())},i(g){y||($(r.$$.fragment,g),$(m),y=!0)},o(g){w(r.$$.fragment,g),w(m),y=!1},d(g){g&&(P(e),P(f),P(L)),x(r),p&&p.d(),m&&m.d(g),S=!1,v(Q)}}}function bt(s,e,t){let r=!1,n=!1;function i(c){c.stopPropagation(),c.preventDefault(),console.log("Button clicked, opening code viewer"),t(1,n=!0)}Ue(()=>{setTimeout(()=>{t(0,r=!0),Pt().start()},500)});function l(c){ye.call(this,s,c)}return[r,n,i,l,()=>t(1,n=!1)]}class wt extends Y{constructor(e){super(),K(this,e,bt,Lt,U,{})}}new wt({target:document.getElementById("app")});
