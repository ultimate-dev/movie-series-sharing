import React, { useState } from "react";
import { Table as AntdTable, Input as AntdInput } from "antd";
import { orderBy } from "lodash";
import { RiArrowDownSLine, RiArrowUpSLine, RiSearchLine } from "react-icons/ri";

export default function Table(props) {
  const [filterValues, setFilterValues] = useState({});
  const [orderStatus, setOrderStatus] = useState({});
  function renderColumns(items = []) {
    return items.map((item) => {
      let filterProps = {};
      let orderProps = {};

      if (item.filter) {
        filterProps = {
          filterDropdown: () => (
            <AntdInput
              autoFocus
              value={filterValues[item.key] ? filterValues[item.key] : ""}
              onChange={(e) =>
                setFilterValues({
                  ...filterValues,
                  [item.key]: e.target.value,
                })
              }
            />
          ),
          filterIcon: (filtered) => (
            <div
              className={
                "d-flex align-items-center justify-content-center h-100 w-100" +
                (filtered ? " text-primary" : "text-muted")
              }
            >
              <RiSearchLine size={16} />
            </div>
          ),
        };
      }

      if (item.order) {
        orderProps = {
          title: (
            <div
              style={{
                cursor: "pointer",
                position: "relative",
                userSelect: "none",
              }}
              onClick={() => {
                let _orderStatus = { ...orderStatus };
                if (orderStatus[item.key]) {
                  delete _orderStatus[item.key];
                }
                setOrderStatus({
                  [item.key]: orderStatus[item.key]
                    ? orderStatus[item.key] == "asc"
                      ? "desc"
                      : "asc"
                    : "asc",
                  ..._orderStatus,
                });
              }}
            >
              <span
                className={
                  Object.keys(orderStatus)[0] == item.key ? "text-primary" : ""
                }
              >
                {item.title}
              </span>
              <span
                className={
                  Object.keys(orderStatus)[0] == item.key
                    ? "text-primary"
                    : "text-muted"
                }
                style={{ position: "absolute", right: 0, top: 0 }}
              >
                {orderStatus[item.key] == "asc" ? (
                  <RiArrowDownSLine size={18} />
                ) : (
                  <RiArrowUpSLine size={18} />
                )}
              </span>
            </div>
          ),
        };
      }

      return {
        ...item,
        ...filterProps,
        ...orderProps,
      };
    });
  }

  function renderDataSource(items = []) {
    return items
      .filter((item) => {
        let status = true;
        Object.keys(filterValues).map((name) => {
          let itemValue = item[name];
          if (!itemValue) {
            let _item = item;
            String(name)
              .split(".")
              .map((p) => {
                _item = _item[p];
              });
            if (typeof _item == "string") {
              itemValue = _item;
            }
          }

          if (
            status !== false &&
            String(itemValue).toLowerCase().indexOf(filterValues[name]) >= 0
          ) {
            status = true;
          } else {
            status = false;
          }
        });
        return status;
      })
      .map((item, index) => {
        return {
          ...item,
          key: index,
        };
      });
  }

  return (
    <AntdTable
      {...props}
      columns={renderColumns(props.columns)}
      dataSource={orderBy(
        renderDataSource(props.dataSource, props.columns),
        Object.keys(orderStatus),
        Object.values(orderStatus)
      )}
    />
  );
}
