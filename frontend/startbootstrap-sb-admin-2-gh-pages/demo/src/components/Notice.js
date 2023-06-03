import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Notice = ({ teamId }) => {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editNoticeId, setEditNoticeId] = useState(0);
  const [editNoticeContent, setEditNoticeContent] = useState("");
  const [noticeList, setNoticeList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (teamId.id === 0) return;
    fetchNotice();
  }, [teamId]);

  const fetchNotice = () => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/${teamId.id}/notice`, {
      headers: {
        Authorization: `Bearer ${token}`
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
        if (response.status === 403) {
          alert("로그인이 만료되었습니다.");
          navigate("/");
        }
      })
      .then((data) => {
        setNoticeList(data.get_notices.reverse());
      })
      .catch((error) => {
        {
          console.log(error);
          alert(error.message);
        }
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
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/${teamId.id}/notice`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: inputValue })
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
        if (response.status === 403) {
          alert("로그인이 만료되었습니다.");
          navigate("/");
        }
      })
      .then((data) => {
        console.log(data);
        fetchNotice();
        setInputValue("");
        setShowInput(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const handleDeleteNotice = (noticeId) => {
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/${teamId.id}/notice/${noticeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
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
        if (response.status === 403) {
          alert("로그인이 만료되었습니다.");
          navigate("/");
        }
      })
      .then((data) => {
        console.log(data);
        fetchNotice();
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  const handleEditNotice = (noticeId, content) => {
    if (content === "") {
      alert("수정사항을 입력해주세요.");
      return;
    }
    const token = sessionStorage.getItem("token");
    fetch(`http://localhost:8080/team/${teamId.id}/notice/${noticeId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: content })
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
        if (response.status === 403) {
          alert("로그인이 만료되었습니다.");
          navigate("/");
        }
      })
      .then((data) => {
        console.log(data);
        fetchNotice();
        setEditMode(false);
        setEditNoticeId(0);
        setEditNoticeContent("");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
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
