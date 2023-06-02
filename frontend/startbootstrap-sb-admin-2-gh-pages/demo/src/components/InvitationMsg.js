import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InvitationMsg = ({ invitationList, fetchInvitation }) => {
  const navigate = useNavigate();
  const handleAcceptInvitation = (invitationId) => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/invitation/${invitationId}/accept`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((jsonData) => {
            // `showErrorMessages` 함수를 호출하여 메시지를 보여줍니다.
            // 에러를 throw 하여 다음 catch 블록으로 이동합니다.
            throw new Error(showErrorMessages(jsonData));
          });
        }
      })
      .then((data) => {
        console.log(data);
        fetchInvitation();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        navigate("/");
      });
  };

  const handleRejectInvitation = (invitationId) => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/invitation/${invitationId}/reject`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((jsonData) => {
            // `showErrorMessages` 함수를 호출하여 메시지를 보여줍니다.
            // 에러를 throw 하여 다음 catch 블록으로 이동합니다.
            throw new Error(showErrorMessages(jsonData));
          });
        }
      })
      .then((data) => {
        console.log(data);
        fetchInvitation();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        navigate("/");
      });
  };

  const handleDeleteInvitation = (invitationId) => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/invitation/${invitationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((jsonData) => {
            // `showErrorMessages` 함수를 호출하여 메시지를 보여줍니다.
            // 에러를 throw 하여 다음 catch 블록으로 이동합니다.
            throw new Error(showErrorMessages(jsonData));
          });
        }
      })
      .then((data) => {
        console.log(data);
        fetchInvitation();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
        navigate("/");
      });
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
                  {invitation.isAccepted === false && (
                    <>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{
                          width: "50%",
                          backgroundColor: "#fc9a9d",
                          border: "none",
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
                          border: "none",
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
                  {invitation.isAccepted === true && (
                    <>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{
                          width: "50%",
                          backgroundColor: "#969696",
                          border: "none",
                          pointerEvents: "none",
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
                          border: "none",
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
