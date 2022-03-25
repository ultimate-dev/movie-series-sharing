import React, { useState } from "react";
import { Button } from "antd";
import moment from "moment";
import Avatar from "antd/lib/avatar/avatar";
import { RiDeleteBin2Fill, RiCheckDoubleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Table } from "../../../../components";

export default function DataTable({ items = [], onDelete, onRead, onUnRead }) {
  const columns = [
    {
      title: "",
      dataIndex: "contact_id",
      key: "contact_id",
      width: 115,
      fixed: "left",
      render: (p, r) => (
        <small>
          <Button className="btn btn-danger p-2" onClick={() => onDelete(p)}>
            <RiDeleteBin2Fill size={20} className="text-white" />
          </Button>
          {r.read == 0 ? (
            <Button
              className="btn btn-success p-2 ml-2"
              onClick={() => onRead(p)}
            >
              <RiCheckDoubleFill size={20} className="text-white" />
            </Button>
          ) : (
            <Button
              className="btn btn-gray p-2 ml-2"
              onClick={() => onUnRead(p)}
            >
              <RiCheckDoubleFill size={20} className="text-success" />
            </Button>
          )}
        </small>
      ),
    },
    {
      title: "Kullanıcı",
      dataIndex: "user",
      key: "user.name",
      width: 250,
      render: (p, r, i) => (
        <Link
          className="d-flex align-items-center"
          to={"/panel/users/list?user=" + p?.user_id}
        >
          <Avatar size={40} src={p?.image}>
            {String(p?.name).substring(0, 1) +
              String(p?.surname).substring(0, 1)}
          </Avatar>
          <div className="ml-2">
            <div>
              <small>{p?.name}</small>
            </div>
            <div>
              <small className="text-muted">{p?.surname}</small>
            </div>
          </div>
        </Link>
      ),
      filter: true,
      order: true,
    },
    {
      title: "Mesaj Konusu",
      dataIndex: "contact_subject",
      key: "contact_subject.label",
      width: 180,
      render: (p) => <small>{p?.label}</small>,
      filter: true,
      order: true,
    },
    {
      title: "Mesaj",
      dataIndex: "message",
      key: "message",
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },

    {
      title: "Gönderim Tarihi",
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
      <Table
        dataSource={items}
        columns={columns}
        scroll={{ x: 991 }}
        size="middle"
      />
    </>
  );
}
