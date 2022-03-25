import React from "react";
import { RiHonourFill, RiUserStarFill } from "react-icons/ri";
import { Link } from "react-router-dom";
//Components
import { Content } from "../../../../components";

export default function Page({ Header }) {
  return (
    <div className="page-inner">
      <Header.Breadcrumb
        head="Panel Hakkında"
        desc="Bu sayfada panel hakkında bazı genel bilgiler verilmektedir."
      />
      <Content>
        <div className="row">
          <div className="col-md-12">
            <div className="card full-height">
              <div className="card-body">
                <ul className="my-3">
                  <li className="my-5">
                    Sayfaların Sol üstünde{" "}
                    <RiHonourFill className="text-primary" size={24} /> simgesi
                    bulunmaktadır. Bu Simgeye tıklayarak sayfalar hakkında daha
                    detaylı bilgiye sahip olabilirsiniz.
                  </li>
                  <li className="my-5">
                    <code>Süper Yönetici </code>
                    haricindeki yöneticiler sisteme yönetici ekleyemezler.
                    <code> Süper Yönetici </code>
                    sağ üstteki{" "}
                    <Link
                      to="/panel/managers"
                      style={{ textDecoration: "underline" }}
                    >
                      <RiUserStarFill className="text-primary" size={24} />
                    </Link>{" "}
                    simgesinden yönetici ekleyebilmektedir.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
}
