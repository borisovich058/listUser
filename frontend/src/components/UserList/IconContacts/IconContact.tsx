import { Tooltip } from "primereact/tooltip";
import style from "./IconContacts.module.scss";
import "primeicons/primeicons.css";

const IconContacts = (props: { contact: any }) => {
  const contact = props.contact;

  if (contact.type === "Phone") {
    return (
      <span style={{ paddingLeft: "8px" }}>
        <Tooltip target=".custom-target-icon" />
        <i
          className="custom-target-icon pi pi-phone p-text-secondary p-overlay-badge"
          data-pr-tooltip={contact.value}
          style={{
            width: "16px",
            height: "16px",
            cursor: "pointer",
            color: "#9873FF",
          }}
        ></i>
      </span>
    );
  }
  if (contact.type === "Twitter") {
    return (
      <span style={{ paddingLeft: "8px" }}>
        <Tooltip target=".custom-target-icon" />
        <i
          className="custom-target-icon pi pi-twitter p-text-secondary p-overlay-badge"
          data-pr-tooltip={`Twitter: ${contact.value}`}
          style={{
            width: "16px",
            height: "16px",
            cursor: "pointer",
            color: "#9873FF",
          }}
        ></i>
      </span>
    );
  } else if (contact.type === "Email") {
    return (
      <span style={{ paddingLeft: "8px" }}>
        <Tooltip target=".custom-target-icon" />
        <i
          className="custom-target-icon pi pi-envelope p-text-secondary p-overlay-badge"
          data-pr-tooltip={`Email: ${contact.value}`}
          style={{
            width: "16px",
            height: "16px",
            cursor: "pointer",
            color: "#9873FF",
          }}
        ></i>
      </span>
    );
  } else if (contact.type === "Facebook") {
    return (
      <span style={{ paddingLeft: "8px" }}>
        <Tooltip target=".custom-target-icon" />
        <i
          className="custom-target-icon pi pi-facebook p-text-secondary p-overlay-badge"
          data-pr-tooltip={`Email: ${contact.value}`}
          style={{
            width: "16px",
            height: "16px",
            cursor: "pointer",
            color: "#9873FF",
          }}
        ></i>
      </span>
    );
  } else {
    return (
      <span style={{ paddingLeft: "8px" }}>
        <Tooltip target=".custom-target-icon" />
        <i
          className="custom-target-icon pi pi-user p-text-secondary p-overlay-badge"
          data-pr-tooltip={`${contact.value}`}
          style={{
            width: "16px",
            height: "16px",
            cursor: "pointer",
            color: "#9873FF",
          }}
        ></i>
      </span>
    );
  }
};
export default IconContacts;
