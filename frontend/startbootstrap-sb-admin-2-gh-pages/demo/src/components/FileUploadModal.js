import React, { useState, useEffect } from "react";
import "./Modal.css";

const UploadModal = ({
  userInfo,
  teamId,
  uploadModalShow,
  handleUploadModalShow,
}) => {
  const [userList, setUserList] = useState([]);
  const [newFileName, setFileName] = useState("");

  const fetchFileList = () => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/${teamId.id}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserList(data.get_user_list); /*수정*/
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchFileList();
  }, []);

  return (
    <div className={uploadModalShow ? "modal-wrapper" : "modal-wrapper hidden"}>
      <div className="modal-inner">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">파일 등록</h6>
        </div>
        <div className="card-body">
          <form
            id="form1"
            action="uploadFile"
            method="post"
            encType="multipart/form-data"
            target="repacatFrame"
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-user"
                id="loginInputID"
                aria-describedby="idHelp"
                placeholder="파일명"
                autoComplete="off"
                value={newFileName}
                onChange={(event) => setFileName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="formFile" className="form-label">
                파일 업로드
              </label>
              <input className="form-control" type="file" id="formFile"></input>
            </div>
          </form>
        </div>
        <div className="modal-footer flex-row justify-content-around">
          <button className="btn btn-primary col-5">등록</button>
          <button
            className="btn btn-secondary col-5"
            onClick={() => handleUploadModalShow(false)}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
