import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../AxiosConfig";

const InvitationMsg = ({ invitationList, fetchInvitation }) => {
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleAcceptInvitation = (invitationId) => {
    if (!window.confirm("초대를 수락합니다.")) {
      return;
    }
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .put(
        `${BASE_URL}/team/invitation/${invitationId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        if (response.status === 400) {
          console.log(400);
          const responseData = response.data;
          const errorMessages = Object.values(responseData.error).join("\n");
          alert(errorMessages);
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        fetchInvitation();
      })
      .catch((error) => {});
  };

  const handleRejectInvitation = (invitationId) => {
    if (!window.confirm("초대를 거절합니다.")) {
      return;
    }
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .put(
        `${BASE_URL}/team/invitation/${invitationId}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        if (response.status === 400) {
          console.log(400);
          const responseData = response.data;
          const errorMessages = Object.values(responseData.error).join("\n");
          alert(errorMessages);
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        fetchInvitation();
      })
      .catch((error) => {});
  };

  const handleDeleteInvitation = (invitationId) => {
    if (!window.confirm("초대장을 삭제합니다")) {
      return;
    }
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .delete(`${BASE_URL}/team/invitation/${invitationId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        if (response.status === 400) {
          console.log(400);
          const responseData = response.data;
          const errorMessages = Object.values(responseData.error).join("\n");
          alert(errorMessages);
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        fetchInvitation();
      })
      .catch((error) => {});
  };

  const showErrorMessages = (jsonData) => {
    const errorMessages = Object.values(jsonData.error).join("\n");

    // 메시지들을 결합하여 alert 창에 보여줍니다.
    return errorMessages;
  };
  return (
    <div
      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
      aria-labelledby="alertsDropdown"
      style={{ display: "block" }}
    >
      {invitationList.length > 0 ? (
        <div style={{ maxHeight: "200px", width: "400px", overflowY: "auto" }}>
          <ul className="list-group">
            {invitationList.map((invitation, index) => (
              <li
                key={index}
                className="d-flex justify-content-between align-items-center ml-3 mr-3 pt-1 pb-1 border-bottom"
              >
                <span>
                  {invitation.leaderName}님이 {invitation.teamName}팀에
                  초대하셨습니다.
                </span>
                <div className="btn-group">
                  {invitation.isAccepted === "null" && (
                    <>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{
                          width: "50%",
                          backgroundColor: "#fc9a9d",
                          border: "none"
                        }}
                        role="button"
                        onClick={() => {
                          handleAcceptInvitation(invitation.invitationId);
                        }}
                      >
                        수락
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{
                          width: "50%",
                          backgroundColor: "#9abbfc",
                          border: "none"
                        }}
                        role="button"
                        onClick={() => {
                          handleRejectInvitation(invitation.invitationId);
                        }}
                      >
                        거절
                      </button>
                    </>
                  )}
                  {invitation.isAccepted === "false" && (
                    <>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{
                          width: "50%",
                          backgroundColor: "#969696",
                          border: "none"
                        }}
                        role="button"
                        disabled
                      >
                        거절
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{
                          width: "50%",
                          backgroundColor: "#9abbfc",
                          border: "none"
                        }}
                        role="button"
                        onClick={() => {
                          handleDeleteInvitation(invitation.invitationId);
                        }}
                      >
                        삭제
                      </button>
                    </>
                  )}
                  {invitation.isAccepted === "true" && (
                    <>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{
                          width: "50%",
                          backgroundColor: "#969696",
                          border: "none",
                          pointerEvents: "none"
                        }}
                        disabled
                      >
                        수락
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{
                          width: "50%",
                          backgroundColor: "#9abbfc",
                          border: "none"
                        }}
                        role="button"
                        onClick={() => {
                          handleDeleteInvitation(invitation.invitationId);
                        }}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <div style={{ maxHeight: "200px", width: "400px" }}>
            <h5 className="d-flex justify-content-center mb-0">
              초대 정보가 존재하지 않습니다.
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitationMsg;
