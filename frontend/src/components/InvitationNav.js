import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import InvitationMsg from "./InvitationMsg";
import DropdownButton from "./DropdownButton";
import { useNavigate } from "react-router-dom";
import axios from "../AxiosConfig";

const InvitationNav = () => {
  const [alertCount, setAlertCount] = useState(0);
  const [invitationList, setInvitationList] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchInvitation = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .get(`${BASE_URL}/team/invitation`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response.status === 200 || response.status === 400) {
          return response.data;
        }
      })
      .then((data) => {
        if (data && Array.isArray(data.get_invitations)) {
          const invitationList = data.get_invitations;
          setInvitationList(invitationList);
          const filteredInvitationList = invitationList.filter(
            (invitation) => invitation.isAccepted === "null"
          );
          setAlertCount(filteredInvitationList.length);
        } else if (data && data.error && data.error.get_invitations) {
          setAlertCount(0);
          setInvitationList([]);
          throw new Error(data.error.get_invitations);
        }
      })
      .catch((error) => {
        console.log(error);
        setAlertCount(0);
        setInvitationList([]);
      });
  };

  useEffect(() => {
    fetchInvitation();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchInvitation();
    }, 30000);
    return () => clearInterval(interval);
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
