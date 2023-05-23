import React from "react";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import style from "./UserList.module.scss";
import axios from "axios";
import IconContacts from "./IconContacts/IconContact";
import ConfirmDialogDelete from "./ConfirmDialogDelete/ConfirmDialogDelete";
import EditCreateCard from "./EditCreateCard/EditCreateCard";
import { InputText } from "primereact/inputtext";
import Image from "next/image";

type TConfirmDialogDeleteState = {
  show: any;
  userId?: any;
  onHide: () => void;
};
type TEditCreateCard = {
  show: any;
  userId?: any;
  onHide: () => void;
};

const UserList = () => {
  const [confirmDialogDelete, setConfirmDialogDelete] = useState<TConfirmDialogDeleteState | any>({ show: false });
  const [editCreateCard, setEditCreateCard] = useState<TEditCreateCard | any>({show: false });
  const [inputSearch, setInputSearch] = useState<any>("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/clients", {})
      .then((response: any) => {
        setData(response.data);
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [confirmDialogDelete.userId, editCreateCard, editCreateCard.userId]);

  const searchInput = (e: any) => {
    const value = e.target.value;
    axios
      .get(`http://localhost:3001/api/clients`, { params: { search: value } })
      .then((response) => {
          console.log(response)
          setData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
    setInputSearch(value);
  };

  const bodyForName = (rowData: any) =>
    `${rowData.surname} ${rowData.name} ${rowData.lastName}`;
  const bodyForDateCreate = (rowData: any) => {
    let dateNumber = new Date(rowData.createdAt).toLocaleString().split(",")[0];
    let dateHours = new Date(rowData.createdAt)
      .toLocaleString()
      .split(",")
      .pop();

    return (
      <div>
        <span>{dateNumber}</span>
        <span style={{ color: "#B0B0B0", paddingLeft: "10px" }}>
          {dateHours}
        </span>
      </div>
    );
  };
  const bodyForDateUpdate = (rowData: any) => {
    let dateNumber = new Date(rowData.updatedAt).toLocaleString().split(",")[0];
    let dateHours = new Date(rowData.updatedAt)
      .toLocaleString()
      .split(",")
      .pop();

    return (
      <div>
        <span>{dateNumber}</span>
        <span style={{ color: "#B0B0B0", paddingLeft: "10px" }}>
          {dateHours}
        </span>
      </div>
    );
  };

  const bodyForContacts = (rowData: any) => {
    return rowData.contacts.map((contact: any) => (
      <IconContacts key={contact.id} contact={contact} />
    ));
  };

  const bodyForAction = (rowData: any) => {
    return (
      <div>
        <Button
          label="Изменить"
          style={{ color: "#9873FF" }}
          icon="pi pi-pencil"
          className="p-button-text"
          text
          onClick={() =>
            onClickConfirmDialogDelete("editCreateCard", {
              userId: rowData.id,
            })
          }
        />
        <Button
          label="Удалить"
          style={{ color: "#F06A4D" }}
          icon="pi pi-times"
          className="p-button-text"
          text
          onClick={() =>
            onClickConfirmDialogDelete("confirmDialogDelete", {
              userId: rowData.id,
            })
          }
        />
      </div>
    );
  };

  const onClickConfirmDialogDelete = (name: string, params?: any) => {
    if (name === "confirmDialogDelete") {
      setConfirmDialogDelete({ show: true, userId: params?.userId });
    }
    if (name === "editCreateCard") {
      setEditCreateCard({ show: true, userId: params?.userId });
    }
  };

  const onHide = (name: any) => {
    if (name === "confirmDialogDelete") {
      setConfirmDialogDelete({ show: false });
    }
    if (name === "editCreateCard") {
      setEditCreateCard({ show: false });
    }
  };

  return (
    <>
      <div className={style.searchBar}>
        <div className={style.navBar}>
          <Image className={style.logo} alt="label" src={"/label.svg"} width={50} height={50} />
          <InputText
            placeholder="Введите запрос"
            type="text"
            value={inputSearch}
            onChange={searchInput}
            className={style.inputNavBar}
          />
        </div>
      </div>
      <div className={style.header}>
        <h3>Клиенты</h3>
      </div>
      <div className="card">
        <DataTable
          className={style.table}
          value={data}
          dataKey="id"
          responsiveLayout="scroll"
        >
          <Column
            field="id"
            header="ID"
            sortable
            style={{ maxWidth: "5rem", color: "#B0B0B0" }}
          />
          <Column
            body={bodyForName}
            sortable
            header="Фамилия Имя Отчество"
            style={{ maxWidth: "9rem" }}
          />
          <Column
            body={bodyForDateCreate}
            header="Дата и время создания"
            sortable
            style={{ maxWidth: "6rem" }}
          />
          <Column
            body={bodyForDateUpdate}
            sortable
            header="Последние изменения"
            style={{ maxWidth: "5rem" }}
          />
          <Column
            body={bodyForContacts}
            header="Контакты"
            //style={{ maxWidth: "9rem" }}
          />
          <Column
            body={bodyForAction}
            header="Действия"
            exportable={false}
            style={{
              maxWidth: "10rem",
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
          />
        </DataTable>
        <div className={style.button}>
          <Button
            className={style.buttonCreate}
            outlined
            onClick={() => onClickConfirmDialogDelete("editCreateCard")}
          >
            <img
              className={style.iconButton}
              src="/addUser.svg"
              alt="addUser"
            />
            <span className={style.labelButton}>Добавить клиента</span>
          </Button>
        </div>
      </div>
      {confirmDialogDelete.show && (
        <ConfirmDialogDelete
          userId={confirmDialogDelete.userId}
          onHide={() => onHide("confirmDialogDelete")}
        />
      )}
      {editCreateCard.show && (
        <EditCreateCard
          userId={editCreateCard.userId}
          onHide={() => onHide("editCreateCard")}
        />
      )}
    </>
  );
};

export default UserList;
