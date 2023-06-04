import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import TeamList from "../components/TeamList.js";
import TeamInfo from "../components/TeamInfo.js";
import Notice from "../components/Notice.js";
import FileStorage from "../components/FileStorage.js";
import InviteModal from "../components/InviteModal.js";
import FileUploadModal from "../components/FileUploadModal.js";
import VersionUploadModal from "../components/VersionUploadModal.js";
import FileHistory from "../components/FileHistoryModal.js";
import InvitationNav from "../components/InvitationNav.js";
import DropdownButton from "../components/DropdownButton.js";
import handleRefreshToken from "../components/HandleRefreshToken.js";

const Team = () => {
  const [userInfo, setUserInfo] = useState({});
  const [teamId, setTeamId] = useState(0);
  const [fileId, setFileId] = useState(0);
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [uploadModalShow, setUploadModalShow] = useState(false);
  const [versionUploadModalShow, setVersionUploadModalShow] = useState(false);
  const [historyModalShow, setHistoryModalShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      navigate("/"); // 토큰이 없을 경우 리디렉션할 경로
    }
  }, []);

  useEffect(() => {
    console.log(teamId);
  }, [teamId]);

  const handleTeamIdFromChild = (data) => {
    setTeamId(data);
  };

  useEffect(() => {
    console.log(inviteModalShow);
  }, [inviteModalShow]);

  useEffect(() => {
    console.log(uploadModalShow);
  }, [uploadModalShow]);

  useEffect(() => {
    console.log(historyModalShow);
  }, [historyModalShow]);

  const handleInviteModalShow = (data) => {
    setInviteModalShow(data);
  };

  const handleUploadModalShow = (data) => {
    setUploadModalShow(data);
  };

  const handleVersionUploadModalShow = (data) => {
    setVersionUploadModalShow(data);
  };

  const handleHistoryModalShow = (data) => {
    setHistoryModalShow(data);
  };
  const handleFileIdFromStorage = (data) => {
    setFileId(data);
  };


  const getUserInfo = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    fetch(`${BASE_URL}/user`, {
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
              getUserInfo();
            } else {
              sessionStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              setIsLogin(false);
            }
          });
        }
      })
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const showErrorMessages = (jsonData) => {
    const errorMessages = Object.values(jsonData.error).join("\n");
    // 메시지들을 결합하여 alert 창에 보여줍니다.
    return errorMessages;
  };
  const handleLogout = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    fetch("http://localhost:8080/user/signout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          alert("로그아웃 되었습니다.");
          return;
        }
        if (response.status === 400 || response.status === 403) {
          return response.json().then((jsonData) => {
            // `showErrorMessages` 함수를 호출하여 메시지를 보여줍니다.
            // 에러를 throw 하여 다음 catch 블록으로 이동합니다.
            throw new Error(showErrorMessages(jsonData));
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLogin(false);
      });
    navigate("/login");
  };

  return (
    <div id="wrapper">
      {/*<!-- Sidebar -->*/}
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/select"
        >
          <img
            className="login-dongguk-logo"
            src={`${process.env.PUBLIC_URL}/dongguk_logo.png`}
          />
        </a>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - 메인 페이지 -->*/}
        <li className="nav-item active">
          <li className="nav-item dropdown no-arrow mx-1">
            <a className="nav-link collapsed dropdown-button">
              {/*<!--<i className="fas fa-fw fa-tachometer-alt"></i>-->*/}
              <div style={{ textAlign: "center" }}>
                <span>메인 페이지</span>
              </div>
            </a>
          </li>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - 팀 활동 페이지 -->*/}
        <li className="nav-item active">
          <li className="nav-item dropdown no-arrow mx-1">
            <DropdownButton
              label={
                <div style={{ textAlign: "center" }}>
                  <i className="fas fa-fw fa-cog"></i>
                  <span>팀 활동 페이지</span>
                </div>
              }
              content={
                <div className="collapse" style={{ display: "block" }}>
                  <TeamList handleTeamIdFromChild={handleTeamIdFromChild} />
                </div>
              }
              style="nav-link collapsed"
            />
          </li>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/*<!-- End of Sidebar -->*/}

      {/*<!-- Content Wrapper -->*/}
      <div id="content-wrapper" className="d-flex flex-column">
        {/*<!-- Main Content -->*/}
        <div id="content">
          {/*<!-- Topbar -->*/}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/*<!-- Sidebar Toggle (Topbar) -->*/}
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>

            {/*<!-- Topbar Search -->*/}
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <h1 className="h4 mb-0 text-gray-800">
                  오픈소스소프트웨어프로젝트
                </h1>
              </div>
            </form>

            {/*<!-- Topbar Navbar -->*/}
            <ul className="navbar-nav ml-auto">
              {/*<!-- Nav Item - Alerts -->*/}
              <InvitationNav />
              {/*<!-- Nav Item - User Information -->*/}
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                    {userInfo ? `${userInfo.name} (${userInfo.studentId})` : ""}
                  </span>
                  {/*<!-- <span style="padding-right: 5px"> -->*/}
                  <div className="btn btn-primary btn-user">My Page</div>
                  <div
                    className="btn btn-primary btn-user"
                    style={{ marginLeft: "5px" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </a>
              </li>
            </ul>
          </nav>
          {/*<!-- End of Topbar -->*/}

          {/*<!-- Begin Page Content -->*/}
          <div className="container-fluid">
            {/*<!-- Page Heading -->*/}
            <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>

            {/*<!-- Content Row -->*/}

            <div className="row">
              {/*<!-- 파일 스토리지 섹션 -->*/}
              <FileStorage
                teamId={{ id: teamId }}
                handleUploadModalShow={handleUploadModalShow}
                handleHistoryModalShow={handleHistoryModalShow}
                handleFileIdFromStorage={handleFileIdFromStorage}
                handleVersionUploadModalShow={handleVersionUploadModalShow}
              />
              <div className="col-xl-4 mb-4">
                {/*<!-- 팀 구성 정보 -->*/}
                {/* {useEffect(() => {
              <TeamInfo teamId={teamId} />;
            }, [teamId])} */}
                <TeamInfo
                  teamId={{ id: teamId }}
                  handleInviteModalShow={handleInviteModalShow}
                />
                {/*<!--공지사항-->*/}
                <Notice teamId={{ id: teamId }} />
              </div>
              {/*<!-- /.container-fluid -->*/}
            </div>
            {/*<!-- End of Main Content -->*/}

            {/*<!-- Footer -->*/}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  <span>Copyright &copy; Your Website 2021</span>
                </div>
              </div>
            </footer>
            {/*<!-- End of Footer -->*/}
          </div>

          {/*<!-- End of Content Wrapper -->*/}
        </div>
      </div>
      {/* 팀원 초대 모달 */}
      {inviteModalShow && (
        <InviteModal
          userInfo={userInfo}
          teamId={{ id: teamId }}
          inviteModalShow={inviteModalShow}
          handleInviteModalShow={handleInviteModalShow}
        />
      )}
      {/* 파일 등록 모달 */}
      {uploadModalShow && (
        <FileUploadModal
          userInfo={userInfo}
          teamId={{ id: teamId }}
          uploadModalShow={uploadModalShow}
          handleUploadModalShow={handleUploadModalShow}
        />
      )}
      {/* 파일 버전별 등록 모달 */}
      {versionUploadModalShow && (
        <VersionUploadModal
          userInfo={userInfo}
          teamId={{ id: teamId }}
          fileId={{ id: fileId }}
          versionUploadModalShow={versionUploadModalShow}
          handleVersionUploadModalShow={handleVersionUploadModalShow}
        />
      )}
      {/* 파일 이력 조회 모달 */}
      {historyModalShow && (
        <FileHistory
          userInfo={userInfo}
          teamId={{ id: teamId }}
          fileId={{ id: fileId }}
          historyModalShow={historyModalShow}
          handleHistoryModalShow={handleHistoryModalShow}
        />
      )}
    </div>
  );
};

export default Team;
