import React, { useState } from "react";
import { Button } from "antd";
import moment from "moment";
import Avatar from "antd/lib/avatar/avatar";
import { RiDeleteBin2Fill, RiEditBoxFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Table } from "../../../../components";

export default function DataTable({ items = [], onDelete, onEdit }) {
  const columns = [
    {
      title: "",
      dataIndex: "affiliate_id",
      key: "affiliate_id",
      width: 112,
      fixed: "left",
      render: (p, r) => (
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
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: 250,
      render: (p) => (
        <div className="text-center">
          <img
            className="text-muted"
            src={p}
            style={{ minWidth: 180, width: 180, objectFit: "contain" }}
          />
        </div>
      ),
    },
    {
      title: "İştirak İsmi",
      dataIndex: "name",
      key: "name",
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "URL",
      dataIndex: "link",
      key: "link",
      align: "right",
      width: 150,
      render: (p) => (
        <a target="blank" href={p}>
          Siteye Git
        </a>
      ),
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
