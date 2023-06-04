import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";
import handleRefreshToken from "./HandleRefreshToken";

const InviteModal = ({
  userInfo,
  teamId,
  inviteModalShow,
  handleInviteModalShow
}) => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const fetchUserList = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    fetch(`http://localhost:8080/team/${teamId.id}/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          return response.json().then((jsonData) => {
            // `showErrorMessages` 함수를 호출하여 메시지를 보여줍니다.
            // 에러를 throw 하여 다음 catch 블록으로 이동합니다.
            throw new Error(showErrorMessages(jsonData));
          });
        }
        if (response.status === 401) {
          handleRefreshToken().then((result) => {
            if (result) {
              fetchUserList();
            } else {
              navigate("/");
            }
          });
        }
      })
      .then((data) => {
        setUserList(data.get_user_list);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleInvite = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const checkedList = document.querySelectorAll(
      ".modal-wrapper input[type=checkbox]:checked"
    );
    const checkedIdList = [];
    checkedList.forEach((checked) => {
      checkedIdList.push(checked.value);
    });
    fetch(`http://localhost:8080/team/${teamId.id}/invitation`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        leaderId: userInfo.id,
        fellowIds: checkedIdList.map((id) => parseInt(id, 10))
      })
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 400) {
          return response.json().then((jsonData) => {
            // `showErrorMessages` 함수를 호출하여 메시지를 보여줍니다.
            // 에러를 throw 하여 다음 catch 블록으로 이동합니다.
            handleInviteModalShow(false);
            throw new Error(showErrorMessages(jsonData));
          });
        }
        if (response.status === 401) {
          handleRefreshToken().then((result) => {
            if (result) {
              handleInvite();
            } else {
              navigate("/");
            }
          });
        }
      })
      .then((data) => {
        console.log(data);
        handleInviteModalShow(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const showErrorMessages = (jsonData) => {
    const errorMessages = Object.values(jsonData.error).join("\n");

    // 메시지들을 결합하여 alert 창에 보여줍니다.
    return errorMessages;
  };

  return (
    <div className={inviteModalShow ? "modal-wrapper" : "modal-wrapper hidden"}>
      <div className="modal-inner">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">학생 초대</h6>
        </div>
        <div className="card-body">
          {userList ? (
            <div
              className="table-responsive project-list"
              style={{ maxHeight: "330px", overflowY: "auto" }}
            >
              <table className="table project-table table-centered table-nowrap">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">학번</th>
                    <th scope="col">이름</th>
                    <th scope="col">학과</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.studentId}</td>
                      <td>{user.name}</td>
                      <td>{user.dept}</td>
                      <td className="td-checkbox">
                        <input type="checkbox" value={user.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="modal-footer flex-row justify-content-around">
          <button
            className="btn btn-primary col-5"
            onClick={() => {
              handleInvite();
            }}
          >
            초대
          </button>
          <button
            className="btn btn-secondary col-5"
            onClick={() => handleInviteModalShow(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
