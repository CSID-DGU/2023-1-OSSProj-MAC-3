import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../AxiosConfig";

const Notice = ({ teamId }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editNoticeId, setEditNoticeId] = useState(0);
  const [editNoticeContent, setEditNoticeContent] = useState("");
  const [noticeList, setNoticeList] = useState([]);

  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (teamId.id === 0) return;
    fetchNotice();
  }, [teamId]);

  const fetchNotice = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .get(`${BASE_URL}/team/${teamId.id}/notice`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        if (response.status === 400) {
          throw new Error(showErrorMessages(response.data));
        }
      })
      .then((data) => {
        setNoticeList(data.get_notices.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showErrorMessages = (jsonData) => {
    const errorMessages = Object.values(jsonData.error).join("\n");

    // 메시지들을 결합하여 alert 창에 보여줍니다.
    return errorMessages;
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddNotice = () => {
    if (inputValue === "") {
      alert("공지사항을 입력해주세요.");
      return;
    }
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .post(
        `${BASE_URL}/team/${teamId.id}/notice`,
        {
          content: inputValue
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
          console.log(400);
          const responseData = response.data;
          const errorMessages = Object.values(responseData.error).join("\n");
          alert(errorMessages);
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        fetchNotice();
        setInputValue("");
        setShowInput(false);
      })
      .catch((error) => {});
  };

  const handleDeleteNotice = (noticeId) => {
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .delete(`${BASE_URL}/team/${teamId.id}/notice/${noticeId}`, {
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
        fetchNotice();
      })
      .catch((error) => {});
  };

  const handleEditNotice = (noticeId, content) => {
    if (content === "") {
      alert("수정사항을 입력해주세요.");
      return;
    }
    const accessToken = sessionStorage.getItem("accessToken");
    axios
      .put(
        `${BASE_URL}/team/${teamId.id}/notice/${noticeId}`,
        {
          content: content
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
          console.log(400);
          const responseData = response.data;
          const errorMessages = Object.values(responseData.error).join("\n");
          alert(errorMessages);
          throw new Error();
        }
      })
      .then((data) => {
        console.log(data);
        fetchNotice();
        setEditMode(false);
        setEditNoticeId(0);
        setEditNoticeContent("");
      })
      .catch((error) => {});
  };

  const handleEditMode = (noticeId, content) => {
    setEditMode(true);
    setEditNoticeId(noticeId);
    setEditNoticeContent(content);
  };

  const handleOnKeyPressAdd = (e) => {
    if (e.key === "Enter") {
      handleAddNotice();
    }
  };

  const handleOnKeyPressEdit = (e) => {
    if (e.key === "Enter") {
      handleEditNotice(editNoticeId, editNoticeContent);
    }
  };

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">공지 사항</h6>
          <div className="dropdown no-arrow">
            <a
              className="dropdown-toggle mr-3"
              role="button"
              onClick={() => {
                if (teamId.id > 0) {
                  fetchNotice();
                } else {
                  window.alert("팀을 선택해주세요.");
                }
              }}
            >
              <FontAwesomeIcon icon={faRefresh} />
            </a>
            <a
              className="dropdown-toggle"
              role="button"
              onClick={() => setShowInput(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </a>
          </div>
        </div>
        <div className="card-body">
          <ul
            className="list-group"
            style={{ height: "120px", overflowY: "auto" }}
          >
            {showInput && (
              <li className="list-group-item p-0 border-0 d-flex align-items-center">
                <span className="flex-grow-1 p-1 border-bottom">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small flex-grow-1"
                    placeholder="공지사항"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleOnKeyPressAdd}
                  />
                </span>
                <span className="btn-group p-1">
                  <button
                    className="btn btn-sm bg-primary text-white"
                    onClick={handleAddNotice}
                  >
                    등록
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setShowInput(false)}
                  >
                    취소
                  </button>
                </span>
              </li>
            )}
            {noticeList.map((notice, index) => (
              <li
                key={index}
                className="list-group-item p-0 border-0 d-flex align-items-center"
              >
                {editMode && editNoticeId === notice.noticeId ? (
                  <>
                    <span className="flex-grow-1 p-1 border-bottom">
                      <input
                        type="text"
                        className="form-control bg-light border-0 small flex-grow-1"
                        value={editNoticeContent}
                        onKeyDown={(e) =>
                          handleOnKeyPressEdit(
                            e,
                            notice.noticeId,
                            editNoticeContent
                          )
                        }
                        onChange={(event) =>
                          setEditNoticeContent(event.target.value)
                        }
                      />
                    </span>
                    <span className="btn-group p-1">
                      <button
                        className="btn btn-sm bg-primary text-white"
                        onClick={() =>
                          handleEditNotice(notice.noticeId, editNoticeContent)
                        }
                      >
                        등록
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setEditMode(false);
                          setEditNoticeId(0);
                          setEditNoticeContent("");
                        }}
                      >
                        취소
                      </button>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex-grow-1 p-1 border-bottom">
                      {notice.noticeContent}
                    </span>
                    <span className="btn-group p-1">
                      <button
                        className="btn btn-sm bg-primary text-white"
                        onClick={() =>
                          handleEditMode(notice.noticeId, notice.noticeContent)
                        }
                      >
                        수정
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleDeleteNotice(notice.noticeId)}
                      >
                        삭제
                      </button>
                    </span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notice;
