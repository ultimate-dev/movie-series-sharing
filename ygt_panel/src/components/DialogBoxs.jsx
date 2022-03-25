import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Divider } from "antd";
//Actions
import { showDialog, hideDialog } from "../redux/actions";

export default function DialogBox() {
  const dialog = useSelector((state) => state.dialogReducer);
  if (dialog.name !== "")
    return (
      <>
        <Modal
          className="app-modal"
          title={false}
          visible={dialog.name == "ok"}
          onCancel={hideDialog}
          footer={false}
          zIndex={9999}
        >
          <div className="w-100 text-muted text-center mt-3">
            {dialog.data?.message}
          </div>
          <div className="text-right mt-4">
            <Button
              className="btn btn-outline-primary mr-3"
              onClick={hideDialog}
            >
              HAYIR
            </Button>
            <Button
              className="btn btn-primary text-white"
              onClick={() => {
                dialog.data?.onOk();
                hideDialog();
              }}
            >
              EVET
            </Button>
          </div>
        </Modal>
      </>
    );
  else return null;
}
