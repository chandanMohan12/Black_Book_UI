import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import StandardEquipmentList from "./Component/StandardEquipmentList/StandardEquipmentList";
import DataComparison from "./Component/DataComparison/DataComparison";

function App() {
  // useEffect(() => {
  //   const handleMessage = (event) => {
  //     if (event.origin !== 'http://localhost:3000') {
  //       console.log('Origin:', event.origin);
  //       return;
  //     }  
  //     else{
  //       console.log('Origin:', event.origin);
  //     }
  //     if (event.data.type === 'AUTH_TOKEN') {
  //       const { token, userId } = event.data;
  //       console.log('Received token:', token);
  //       console.log('Received userId:', userId);

  //       fetch('https://your-okta-domain.com/oauth2/v1/introspect', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded',
  //           'Authorization': 'Basic ' + btoa('client_id:client_secret')
  //         },
  //         body: new URLSearchParams({
  //           token: token,
  //           token_type_hint: 'access_token'
  //         })
  //       })
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.active) {
  //           console.log('Token is valid for user:', data.sub);
  //         } else {
  //           console.warn('Invalid token');
  //         }
  //       })
  //       .catch(err => console.error('Token validation error:', err));
  //     }
  //   };

  //   window.addEventListener('message', handleMessage);
  //   return () => window.removeEventListener('message', handleMessage); 
  // }, []);

  return (
    <div>
      <Header />
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<StandardEquipmentList />} />
        <Route path="/comparison" element={<DataComparison />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
