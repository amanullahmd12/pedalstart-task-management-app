import React from "react";
import "./Footer.css";
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year}. Designed and Developed by Mohammad Amanullah</p>
    </footer>
  );
}

export default Footer;
