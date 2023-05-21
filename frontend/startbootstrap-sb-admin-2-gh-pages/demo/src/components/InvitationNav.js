import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import InviteMsg from "./InvitationMsg";
import DropdownButton from "./DropdownButton";

const InvitationNav = () => {
  const [alertCount, setAlertCount] = useState(0);

  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <DropdownButton
        label={
          <div>
            <FontAwesomeIcon icon={faMessage} />
            {/* Counter - Alerts */}
            <span className="badge badge-danger badge-counter">
              {alertCount > 0 ? alertCount : "3+"}
            </span>
          </div>
        }
        content={<InviteMsg />}
        style="nav-link dropdown-toggle"
      />
    </li>
  );
};

export default InvitationNav;
