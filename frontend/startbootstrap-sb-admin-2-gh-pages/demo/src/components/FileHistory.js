import React, { useState, useEffect } from "react";
import "./Modal.css";

const HistoryModal = ({
  userInfo,
  teamId,
  historyModalShow,
  handleHistoryModalShow,
}) => {
  const [userList, setUserList] = useState([]);

  const fetchUserList = () => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/${teamId.id}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserList(data.get_user_list);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleHistory = () => {
    const token = sessionStorage.getItem("token");
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leaderId: userInfo.id,
        fellowIds: checkedIdList.map((id) => parseInt(id, 10)),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.error && data.error.send_invitation) {
          console.error(data.error.send_invitation);
          window.alert(data.error.send_invitation);
          handleHistoryModalShow(false);
        } else {
          console.log(data);
          handleHistoryModalShow(false);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className={historyModalShow ? "modal-wrapper" : "modal-wrapper hidden"}
    >
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
                    <th scope="col">파일명</th>
                    <th scope="col">수정사항</th>
                    <th scope="col">수정일</th>
                    <th scope="col">작성자</th>
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
              handleHistory();
            }}
          >
            초대
          </button>
          <button
            className="btn btn-secondary col-5"
            onClick={() => handleHistoryModalShow(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
