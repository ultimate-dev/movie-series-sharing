import React, { useState } from "react";
import { Button } from "antd";
import moment from "moment";
import Avatar from "antd/lib/avatar/avatar";
import {
  RiAddCircleFill,
  RiDeleteBin2Fill,
  RiEditBoxFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { Table } from "../../../../../components";

export default function DataTable({
  items = [],
  onDelete,
  onDeleteDirector,
  onEdit,
  onEditDirector,
  onAddDirector,
}) {
  const columns = [
    {
      title: "",
      dataIndex: "director_role_id",
      key: "director_role_id",
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
      title: "Rol",
      dataIndex: "name",
      key: "name",
      render: (p) => <b className="text-dark">{p}</b>,
      filter: true,
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
        expandable={{
          defaultExpandAllRows: true,
          expandedRowRender: (data) =>
            expDataTable(data, onAddDirector, onEditDirector, onDeleteDirector),
        }}
      />
    </>
  );
}

function expDataTable(data, onAddDirector, onEditDirector, onDeleteDirector) {
  const columns = [
    {
      title: "",
      dataIndex: "director_id",
      key: "director_id",
      width: 90,
      fixed: "left",
      render: (p, r) => (
        <small>
          <Button
            className="btn btn-danger btn-sm"
            onClick={() => onDeleteDirector(p)}
          >
            <RiDeleteBin2Fill size={16} className="text-white" />
          </Button>
          <Button
            className="btn btn-primary ml-2 btn-sm"
            onClick={() => onEditDirector(r)}
          >
            <RiEditBoxFill size={16} className="text-white" />
          </Button>
        </small>
      ),
    },
    {
      title: "Yonetici Fotografi",
      dataIndex: "image",
      key: "image",
      width: 200,
      render: (p) => (
        <div className="w-100">
          <img src={p} width="150px" />
        </div>
      ),
      filter: true,
      order: true,
    },
    {
      title: "Yonetici Isim-Soyisim",
      dataIndex: "name",
      key: "naame",
      render: (p) => <small className="text-primary">{p}</small>,
      filter: true,
      order: true,
    },
  ];

  return (
    <React.Fragment>
      <div className="w-100 text-right">
        <Button
          className="btn btn-primary btn-sm m-1 text-white"
          onClick={() => onAddDirector(data.director_role_id)}
        >
          <RiAddCircleFill className="mr-2" size={16} /> Yeni Yonetici Ekle
        </Button>
      </div>
      <Table
        className="mt-2 ml-5"
        dataSource={data.directors ? data.directors : []}
        columns={columns}
        pagination={false}
        size="middle"
        scroll={{ x: 991 }}
      />
    </React.Fragment>
  );
}
