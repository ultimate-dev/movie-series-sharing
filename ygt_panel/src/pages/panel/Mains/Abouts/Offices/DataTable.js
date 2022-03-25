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
  onDeleteOffice,
  onEdit,
  onEditOffice,
  onAddOffice,
}) {
  const columns = [
    {
      title: "",
      dataIndex: "office_country_id",
      key: "office_country_id",
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
      title: "Ulke Ismi",
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
            expDataTable(data, onAddOffice, onEditOffice, onDeleteOffice),
        }}
      />
    </>
  );
}

function expDataTable(data, onAddOffice, onEditOffice, onDeleteOffice) {
  const columns = [
    {
      title: "",
      dataIndex: "office_id",
      key: "office_id",
      width: 90,
      fixed: "left",
      render: (p, r) => (
        <small>
          <Button
            className="btn btn-danger btn-sm"
            onClick={() => onDeleteOffice(p)}
          >
            <RiDeleteBin2Fill size={16} className="text-white" />
          </Button>
          <Button
            className="btn btn-primary ml-2 btn-sm"
            onClick={() => onEditOffice(r)}
          >
            <RiEditBoxFill size={16} className="text-white" />
          </Button>
        </small>
      ),
    },
    {
      title: "Sehir",
      dataIndex: "city",
      key: "city",
      width: 200,
      render: (p) => <small className="text-primary">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "Adres",
      dataIndex: "adress",
      key: "adress",
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "Tel 1",
      dataIndex: "tel_1",
      key: "tel_1",
      width: 150,
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "Tel 2",
      dataIndex: "tel_2",
      key: "tel_2",
      width: 150,
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "E-Posta 2",
      dataIndex: "email_1",
      key: "tel_2",
      width: 200,
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "E-Posta 2",
      dataIndex: "email_2",
      key: "tel_2",
      width: 150,
      render: (p) => <small className="text-muted">{p}</small>,
      filter: true,
      order: true,
    },
    {
      title: "Konum",
      dataIndex: "latitude",
      key: "latitude",
      width: 250,
      render: (p, r) => (
        <small className="text-muted">
          <a
            className="btn btn-secondary btn-block mb-2"
            href={`https://www.google.com.tr/maps/@${r.latitude},${r.longitude},14z`}
            target="blank"
          >
            Haritada Gor
          </a>
          <div>
            <small>
              <span className="text-secondary">enlem =</span>
              <span className="ml-2">{r.latitude}</span>
            </small>
          </div>
          <div>
            <small>
              <span className="text-secondary">boylam =</span>
              <span className="ml-2">{r.longitude}</span>
            </small>
          </div>
        </small>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="w-100 text-right">
        <Button
          className="btn btn-primary btn-sm m-1 text-white"
          onClick={() => onAddOffice(data.office_country_id)}
        >
          <RiAddCircleFill className="mr-2" size={16} /> Yeni Ofis Ekle
        </Button>
      </div>
      <Table
        className="mt-2 ml-5"
        dataSource={data.offices ? data.offices : []}
        columns={columns}
        pagination={false}
        size="middle"
        scroll={{ x: 1400 }}
      />
    </React.Fragment>
  );
}
