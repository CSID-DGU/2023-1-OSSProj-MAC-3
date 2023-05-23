import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import InvitationMsg from "./InvitationMsg";
import DropdownButton from "./DropdownButton";
import { redirect } from "react-router-dom";

const InvitationNav = () => {
  const [alertCount, setAlertCount] = useState(0);
  const [invitationList, setInvitationList] = useState([]);

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
          const invitationList = data.get_invitations;
          setInvitationList(invitationList);
          const filteredInvitationList = invitationList.filter(
            (invitation) => invitation.isAccepted === false
          );
          setAlertCount(filteredInvitationList.length);
        } else if (data && data.error && data.error.get_invitations) {
          console.error(data.error.get_invitations);
          setAlertCount(0);
          setInvitationList([]);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchInvitation();
  }, []);

  return (
    <li className="nav-item dropdown no-arrow mx-1 " role="button">
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
        content={
          <InvitationMsg
            invitationList={invitationList}
            fetchInvitation={fetchInvitation}
          />
        }
        style="nav-link dropdown-toggle"
      />
    </li>
  );
};

export default InvitationNav;
