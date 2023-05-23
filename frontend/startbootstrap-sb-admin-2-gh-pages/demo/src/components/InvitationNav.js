import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import InviteMsg from "./InvitationMsg";
import DropdownButton from "./DropdownButton";

const InvitationNav = () => {
  const [alertCount, setAlertCount] = useState(0);

  const fetchInvitation = () => {
    const token = sessionStorage.getItem("token");
    fetch("http://localhost:8080/team/invitation", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.get_invitations)) {
          setAlertCount(data.get_invitations.length);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchInvitation();
  }, []);

  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <DropdownButton
        label={
          <div>
            <FontAwesomeIcon icon={faMessage} />
            {/* Counter - Alerts */}
            <span className="badge badge-danger badge-counter">
              {alertCount > 0 ? alertCount : 0}
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
