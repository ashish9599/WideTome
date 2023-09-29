import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './Component/App';
import { AuthProvider,PostsProvider } from './provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AuthProvider>
<PostsProvider>

    <App />
</PostsProvider>
   </AuthProvider>

    <ToastContainer/>
  </React.StrictMode>
);

