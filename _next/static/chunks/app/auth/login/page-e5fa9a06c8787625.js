(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[859],{2804:(e,s,a)=>{Promise.resolve().then(a.bind(a,3289))},3289:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>n});var t=a(5155),r=a(2115),l=a(8223),i=a(6046);function n(){let[e,s]=(0,r.useState)(""),[a,n]=(0,r.useState)(""),[c,u]=(0,r.useState)(""),d=(0,i.useRouter)(),o=async s=>{s.preventDefault(),u("");let{data:t,error:r}=await l.N.auth.signInWithPassword({email:e,password:a});if(r){u("Email ou senha inv\xe1lidos.");return}d.push("/dashboard")};return(0,t.jsx)("div",{className:"flex min-h-screen items-center justify-center bg-gray-100",children:(0,t.jsxs)("div",{className:"w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg",children:[(0,t.jsxs)("div",{className:"text-center",children:[(0,t.jsx)("h1",{className:"text-2xl font-bold text-gray-800",children:"My Nutrition SaaS"}),(0,t.jsx)("p",{className:"text-gray-500",children:"Fa\xe7a login para continuar"})]}),(0,t.jsxs)("form",{className:"space-y-4",onSubmit:o,children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"E-mail"}),(0,t.jsx)("input",{type:"email",id:"email",value:e,onChange:e=>s(e.target.value),className:"block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",placeholder:"Digite seu e-mail",required:!0})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Senha"}),(0,t.jsx)("input",{type:"password",id:"password",value:a,onChange:e=>n(e.target.value),className:"block w-full px-4 py-2 mt-1 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500",placeholder:"Digite sua senha",required:!0})]}),c&&(0,t.jsx)("p",{className:"text-sm text-red-600",children:c}),(0,t.jsx)("button",{type:"submit",className:"w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",children:"Entrar"})]}),(0,t.jsx)("div",{className:"text-center",children:(0,t.jsxs)("p",{className:"text-sm text-gray-600",children:["N\xe3o tem uma conta?"," ",(0,t.jsx)("a",{href:"/auth/register",className:"text-blue-600 hover:underline",children:"Cadastre-se"})]})})]})})}},8223:(e,s,a)=>{"use strict";a.d(s,{N:()=>t});let t=(0,a(5974).UU)("https://dtfcddxkcyznpnwnbcnq.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZmNkZHhrY3l6bnBud25iY25xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ4NzgxMDYsImV4cCI6MjA1MDQ1NDEwNn0.nJ7aVk6V90HHMSiS9_b3Y_oF9uFX9nzOKyozSgmBQHQ")}},e=>{var s=s=>e(e.s=s);e.O(0,[385,441,517,358],()=>s(2804)),_N_E=e.O()}]);