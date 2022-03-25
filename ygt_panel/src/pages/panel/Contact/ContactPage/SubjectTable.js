import React, { useState } from "react";
import { Table, Button } from "antd";
import { RiDeleteBin2Fill, RiEditBoxFill } from "react-icons/ri";

export default function DataTable({ items = [], onDelete, onEdit }) {
  const columns = [
    {
      title: "",
      dataIndex: "contact_subject_id",
      key: "contact_subject_id",
      width: 115,
      fixed: "left",
      render: (p, r, i) => (
        <small>
          <Button className="btn btn-danger p-2" onClick={() => onDelete(p)}>
            <RiDeleteBin2Fill size={20} className="text-white" />
          </Button>
          <Button
            className="btn btn-primary p-2 ml-2"
            onClick={() => onEdit(r)}
          >
            <RiEditBoxFill size={20} className="text-white" />
          </Button>
        </small>
      ),
    },
    {
      title: "Mesaj Konusu",
      dataIndex: "label",
      key: "label",
      render: (p) => <small className="text-muted">{p}</small>,
    },
  ];

  return (
    <>
      <Table
        dataSource={items}
        columns={columns}
        scroll={{ x: 300 }}
        size="small"
      />
    </>
  );
}
