import React, { useState } from "react";
import { Button, Avatar } from "antd";
import moment from "moment";
import { RiDeleteBin2Fill, RiEditBoxFill } from "react-icons/ri";
//* Components
import { Table } from "../../../../components";

export default function DataTable({ items = [], onDelete, onEdit }) {
  const columns = [
    {
      title: "",
      dataIndex: "admin_id",
      key: "admin_id",
      width: 56,
      fixed: "left",
      render: (p, r) => (
        <small>
          <Button className="btn btn-danger p-2" onClick={() => onDelete(p)}>
            <RiDeleteBin2Fill size={20} className="text-white" />
          </Button>
        </small>
      ),
    },
    {
      title: "Profil",
      dataIndex: "name",
      key: "name",
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
      title: "E-Posta",
      dataIndex: "email",
      key: "email",
      render: (p) => <small>{p}</small>,
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
