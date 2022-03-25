import React, { useState } from "react";
import { Button, Avatar } from "antd";
import moment from "moment";
import { IoBan } from "react-icons/io5";
//* Components
import { Table } from "../../../../components";

export default function DataTable({ items = [], onBan }) {
  const columns = [
    {
      title: "",
      dataIndex: "user_id",
      key: "user_id",
      width: 56,
      fixed: "left",
      render: (p) => (
        <small>
          <Button className="btn btn-success p-2" onClick={() => onBan(p)}>
            <IoBan size={20} className="text-white" />
          </Button>
        </small>
      ),
    },
    {
      title: "Profil",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (p, r, i) => (
        <div className="d-flex align-items-center">
          <Avatar size={40} src={r.image}>
            {String(r.name).substring(0, 1) + String(r.surname).substring(0, 1)}
          </Avatar>
          <div className="ml-2">
            <div>
              <small>{r.name}</small>
            </div>
            <div>
              <small className="text-muted">{r.surname}</small>
            </div>
          </div>
        </div>
      ),
      filter: true,
      order: true,
    },
    {
      title: "Cinsiyet",
      dataIndex: "gender",
      key: "gender",
      width: 125,
      render: (p) => (
        <small>
          {p == "man" ? (
            <span className="text-primary">Erkek</span>
          ) : (
            <span className="text-danger">Kadın</span>
          )}
        </small>
      ),
      order: true,
    },
    {
      title: "E-Posta",
      dataIndex: "email",
      key: "email",
      width: 200,
      render: (p) => <small>{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      width: 200,
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "Ülke",
      dataIndex: "country",
      key: "country",
      width: 150,
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "Şehir",
      dataIndex: "city",
      key: "city",
      width: 150,
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "Posta Kodu",
      dataIndex: "post_code",
      key: "post_code",
      width: 150,
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "Kayıt Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 200,
      render: (p) => (
        <small className="text-muted">
          {moment(p).format("DD.MM.yyyy - HH.mm")}
        </small>
      ),
      order: true,
    },
  ];

  return (
    <>
      <div className="w-100">
        <Table
          dataSource={items}
          columns={columns}
          scroll={{ x: 991 }}
          size="middle"
        />
      </div>
    </>
  );
}
