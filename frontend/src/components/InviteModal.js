import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";
import axios from "../AxiosConfig";

const InviteModal = ({
  userInfo,
  teamId,
  inviteModalShow,
  handleInviteModalShow
}) => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchUserList = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .get(`${BASE_URL}/team/${teamId.id}/user`, {
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
        setUserList(data.get_user_list);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleInvite = () => {
    if (!window.confirm("팀원을 초대합니다.")) {
      return;
    }
    const accessToken = sessionStorage.getItem("accessToken");
    const checkedList = document.querySelectorAll(
      ".modal-wrapper input[type=checkbox]:checked"
    );
    const checkedIdList = [];
    checkedList.forEach((checked) => {
      checkedIdList.push(checked.value);
    });
    axios
      .post(
        `${BASE_URL}/team/${teamId.id}/invitation`,
        {
          leaderId: userInfo.id,
          fellowIds: checkedIdList.map((id) => parseInt(id, 10))
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      )
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        if (response.status === 400) {
          handleInviteModalShow(false);
          throw new Error(showErrorMessages(response.data));
        }
      })
      .then((data) => {
        console.log(data);
        handleInviteModalShow(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const responseData = error.response.data;
          const errorMessages = Object.values(responseData.error).join("\n");
          alert(errorMessages);
        } else {
          alert(error.message);
        }
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
