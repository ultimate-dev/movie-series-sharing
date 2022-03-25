import React from "react";

export default function Footer() {
  const footer = { link: "https://www.cyberistanbul.com/" };

  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <nav className="pull-left"></nav>
          <div className="copyright ml-auto text-center">
            Copyright © <a href={footer.link}>Cyberistanbul</a> 2020. Tüm
            hakları saklıdır.
          </div>
        </div>
      </footer>
    </>
  );
}
