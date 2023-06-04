import "../bootstrap.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      navigate("/select"); // 토큰이 없을 경우 리디렉션할 경로
    }
  }, []);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!studentId || !password) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const data = {
      studentId,
      password,
      rememberMe,
    };
    
    // const accessToken = sessionStorage.getItem("accessToken");
    // console.log("before login token:\n" + accessToken);
    fetch(`${BASE_URL}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((jsonData) => {
            // `showErrorMessages` 함수를 호출하여 메시지 출력
            // 에러를 throw 하여 다음 catch 블록으로 이동
            throw new Error(showErrorMessages(jsonData));
          });
        }
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        goSelect();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const showErrorMessages = (jsonData) => {
    const errorMessages = Object.values(jsonData.error).join("\n");
    // 메시지들을 결합하여 alert 창에 보여줍니다.
    return errorMessages;
  };

  const movePage = useNavigate();

  function goSelect() {
    movePage("/Select");
  }
  function goJoin() {
    movePage("/join");
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div>
                      <img
                        className="login-dongguk-logo mb-4"
                        src={`${process.env.PUBLIC_URL}/dongguk_logo.jpg`}
                        alt="..."
                      />
                    </div>
                    <h1 className="h5 text-gray-900 mb-4">
                      동국대학교 이클래스
                    </h1>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="loginInputID"
                          aria-describedby="idHelp"
                          placeholder="student ID"
                          autoComplete="off"
                          value={studentId}
                          onChange={(event) => setStudentId(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="loginInputPassword"
                          placeholder="Password"
                          autoComplete="off"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                            checked={rememberMe}
                            onChange={(event) =>
                              setRememberMe(event.target.checked)
                            }
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button
                        id="loginButton"
                        className="btn btn-primary btn-user btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                      <hr />
                      <button
                        id="joinButton"
                        className="btn btn-user btn-block"
                        onClick={goJoin}
                      >
                        회원가입
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
