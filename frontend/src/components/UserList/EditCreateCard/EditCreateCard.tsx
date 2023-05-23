import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import style from "./EditCreateCard.module.scss";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const EditCreateCard = ({
  onHide,
  userId,
}: {
  onHide: any;
  userId: number;
}) => {
  const [form, setForm] = useState<any>(undefined);
  const [contactType, setContactsType] = useState<any>();
  const [contactValue, setContactsValue] = useState<any>();
  const [addInput, setAddInput] = useState<Array<React.ReactNode>>([]);


  useEffect(() => {
    if (userId) {
    axios
      .get(`http://localhost:3001/api/clients/${userId}`)
      .then((response) => {
        setForm({
          ...response.data,
        });
        setContactsType(response.data.contacts)
        setContactsValue(response.data.contacts)
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }, [userId]);


  console.log(contactType)
  const type = [
    { name: "Телефон", type: "Phone" },
    { name: "Email", type: "Email" },
    { name: "VK", type: "VK" },
    { name: "Facebook", type: "Facebook" },
    { name: "Доп.телефон", type: "Other" },
  ];

  const updateUser = () => {
    axios
      .patch(`http://localhost:3001/api/clients/${userId}`, {
        name: form.name,
        surname: form.surname,
        lastName: form.lastName,
        contacts: [
          {
            type: contactType,
            value: contactValue,
          },
        ],
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    onHide();
  };

  const createUser = () => {
    axios
      .post(`http://localhost:3001/api/clients`, {
        ...form,
        name: form.name,
        surname: form.surname,
        lastName: form.lastName,
        contacts: [
          {
            type: contactType,
            value: contactValue,
          },
        ],
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    onHide();
  };

  const addInputContact = () => {
    let arr = [...addInput];
    arr.push(<div className="p-inputgroup" style={{ margin: "25px auto 25px auto" }}>
    <Dropdown
      className={style.dropdown}
      value={contactType.type}
      onChange={(evt: any) => setContactsType(evt.value)}
      options={type}
      optionLabel="name"
      optionValue="type"
    />
    <InputText
      placeholder="Введите данные"
      type="text"
      name="value"
      value={contactValue}
      onChange={(evt: any) => setContactsValue(evt.currentTarget.value)}
    />
    <Button
      icon="pi pi-times-circle"
      outlined
      style={{ color: "#C8C5D1" }}
      className={style.buttonDel}
    />
  </div>);
  setAddInput(arr);
  };

  return (
    <>
      <Dialog
        header={`Изменить данные клиента`}
        onHide={onHide}
        visible={true}
        className={style.dialog}
      >
        <div className={style.inputDiv}>
          <label className={style.labelInput} htmlFor="surname">
            Фамилия*
          </label>
          <InputText
            className={style.input}
            type="text"
            name="surname"
            value={form?.surname ?? ""}
            onChange={(evt: any) =>
              setForm({
                ...form,
                surname: evt.currentTarget.value,
              })
            }
          />
        </div>
        <div className={style.inputDiv}>
          <label className={style.labelInput} htmlFor="name">
            Имя*
          </label>
          <InputText
            className={style.input}
            type="text"
            name="name"
            value={form?.name ?? ""}
            onChange={(evt: any) =>
              setForm({
                ...form,
                name: evt.currentTarget.value,
              })
            }
          />
        </div>
        <div className={style.inputDiv}>
          <label className={style.labelInput} htmlFor="lastName">
            Отчество*
          </label>
          <InputText
            className={style.input}
            type="text"
            name="lastName"
            value={form?.lastName ?? ""}
            onChange={(evt: any) =>
              setForm({
                ...form,
                lastName: evt.currentTarget.value,
              })
            }
          />
        </div>

        <div>{addInput.map(elem => elem)}</div>

        <div className="p-inputgroup" style={{ margin: "25px auto 25px auto" }}>
    <Dropdown
      className={style.dropdown}
      value={contactType}
      onChange={(evt: any) => setContactsType(evt.value)} 
      options={type}
      optionLabel="name"
      optionValue="type"
    />
    <InputText
      placeholder="Введите данные"
      type="text"
      name="value"
      value={contactValue}
      onChange={(evt: any) => setContactsValue(evt.currentTarget.value)}
    />
    <Button
      icon="pi pi-times-circle"
      outlined
      style={{ color: "#C8C5D1" }}
      className={style.buttonDel}
    />
  </div>

        <div className={style.buttonsConfirm}>
          <div className={style.buttonInput}>
            <Button
              icon="pi pi-plus-circle"
              text
              className={style.buttonAddInput}
              label="Добавить контакт"
              onClick={addInputContact}
            />
          </div>
          <div className={style.buttons}>
            <Button
              className={style.buttonConfirm}
              label="Сохранить"
              onClick={Number(userId) ? updateUser : createUser}
            />
          </div>
          <div className={style.buttons}>
            <Button
              label="Отмена"
              text
              className={style.buttonCancel}
              onClick={onHide}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditCreateCard;
