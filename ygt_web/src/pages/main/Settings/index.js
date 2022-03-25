import { Breadcrumb, Button } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function Page() {
  let history = useHistory();
  return (
    <div className="w-100">
      <div className="card" data-aos="fade-up">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <Link className="pe-2 me-2" onClick={() => history.goBack()}>
              <MdChevronLeft size={32} className=" text-muted" />
            </Link>
            <h6 className="m-0">Ayarlar</h6>
          </div>

          <div className="w-100">
            <Link
              className="d-block w-100 border-bottom px-4 py-3 text-muted d-flex justify-content-between"
              to="/main/settings/account"
            >
              <div>Hesap Ayarlari</div>
              <div>
                <MdChevronRight size={20} className="ms-2" />
              </div>
            </Link>
            <Link
              className="d-block w-100 border-bottom px-4 py-3 text-muted d-flex justify-content-between"
              to="/main/settings/email"
            >
              <div>E-Posta Degistir</div>
              <div>
             
                <MdChevronRight size={20} className="ms-2" />
              </div>
            </Link>
            <Link
              className="d-block w-100 border-bottom px-4 py-3 text-muted d-flex justify-content-between"
              to="/main/settings/password"
            >
              <div>Sifre Degistir</div>
              <div>
                <MdChevronRight size={20} className="ms-2" />
              </div>
            </Link>
            <Link
              className="d-block w-100 px-4 py-3 text-muted d-flex justify-content-between"
              to="/main/settings/privacy"
            >
              <div>Gizlilik Ayarlari</div>
              <div>
                <MdChevronRight size={20} className="ms-2" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
