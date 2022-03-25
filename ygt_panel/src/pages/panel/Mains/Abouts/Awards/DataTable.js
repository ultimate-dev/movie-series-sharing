import React, { useState } from "react";
import { Button } from "antd";
import moment from "moment";
import Avatar from "antd/lib/avatar/avatar";
import {
  RiCheckboxCircleFill,
  RiDeleteBin2Fill,
  RiEditBoxFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { Table } from "../../../../../components";

export default function DataTable({ items = [], onDelete, onEdit }) {
  const columns = [
    {
      title: "",
      dataIndex: "award_id",
      key: "award_id",
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
      title: "Ö/B",
      dataIndex: "success",
      key: "success",
      width: 60,
      align: "center",
      render: (p) => (
        <div className={p == 1 ? "text-success" : "text-muted"}>
          <RiCheckboxCircleFill size={24} />
        </div>
      ),
    },
    {
      title: "Fotoğraf",
      dataIndex: "image",
      key: "image",
      width: 200,
      render: (p) => (
        <div>
          <img
            className="text-muted"
            src={p}
            style={{ minWidth: 180, width: 180, objectFit: "contain" }}
          />
        </div>
      ),
    },
    {
      title: "Başlık",
      dataIndex: "head",
      key: "head",
      width: 300,
      render: (p) => (
        <small className="text-dark">
          <b>{p}</b>
        </small>
      ),
      filter: true,
      order: true,
    },
    {
      title: "Açıklama",
      dataIndex: "desc",
      key: "desc",
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
      width: 400,
    },
    {
      title: "Tarih",
      dataIndex: "date",
      key: "date",
      render: (p) => (
        <small className="text-primary">{moment(p).format("DD.MM.YYYY")}</small>
      ),
      order: true,
      width: 150,
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
