import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import style from './ConfirmDialogDelete.module.scss';
import { error } from 'console';
import axios from 'axios';


const ConfirmDialogDelete = ({onHide, userId}: {
    onHide: any;
    userId: number;
}) => {
    const deleteUser = () => {
        axios.delete(`http://localhost:3001/api/clients/${userId}`).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        })
        onHide();
    }

    return (
        <>
      <Dialog
        header="Удалить клиента"
        onHide={onHide}
        visible={true}
        className={style.dialog}
      >
        <h4>Вы действительно хотите удалить данного клиента?</h4>
        <div className={style.buttonsConfirm}>
          <div className={style.buttons}>
            <Button
            className={style.buttonConfirm}
              label="Удалить"
              onClick={deleteUser}
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

export default ConfirmDialogDelete;