// import React from 'react'

// export default function Footer() {
//   return (
//     <div><div className="container">
//     <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
//       <div className="col-md-4 d-flex align-items-center">
//         <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
//         </a>
//         <span className="text-muted">© 2023 <i>Meal Express</i>, Inc</span>
//       </div>

//       <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
//         <li className="ms-3"><a className="text-muted" href="/"><svg className="bi" width="24" height="24"><use ></use></svg></a></li>
//         <li className="ms-3"><a className="text-muted" href="/"><svg className="bi" width="24" height="24"><use ></use></svg></a></li>
//         <li className="ms-3"><a className="text-muted" href="/"><svg className="bi" width="24" height="24"><use></use></svg></a></li>
//       </ul>
//     </footer>
//   </div>
//   </div>
//   )
// }

// import React from 'react';

// export default function Footer() {
//   return (
//     <footer className="bg-light py-4">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
//             <a href="/" className="text-muted text-decoration-none">
//               <h5>Meal Express</h5>
//             </a>
//             <p className="text-muted">© 2023 Meal Express, Inc</p>
//           </div>
//           <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
//             <ul className="list-inline">
//               <li className="list-inline-item me-3">
//                 <a className="text-muted" href="/">
//                   <i className="bi bi-facebook"></i>
//                 </a>
//               </li>
//               <li className="list-inline-item me-3">
//                 <a className="text-muted" href="/">
//                   <i className="bi bi-twitter"></i>
//                 </a>
//               </li>
//               <li className="list-inline-item">
//                 <a className="text-muted" href="/">
//                   <i className="bi bi-instagram"></i>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import React from 'react';
import './styles/Footer.css'; // New CSS file for additional styling

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <a href="/" className="text-decoration-none">
              <h5 className="footer-brand">Meal Express</h5>
            </a>
            <p className="text-muted mb-0">© 2024 Meal Express, Inc. All rights reserved.</p>
          </div>
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item me-3">
                <a className="text-light social-icon" href="/">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item me-3">
                <a className="text-light social-icon" href="/">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-light social-icon" href="/">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
