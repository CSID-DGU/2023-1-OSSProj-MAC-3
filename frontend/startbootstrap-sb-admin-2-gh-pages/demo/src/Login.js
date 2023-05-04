import "./bootstrap.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      studentId,
      password,
      rememberMe,
    };

    fetch("http://localhost:8080/auth/signin", {
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
          throw new Error("로그인 정보가 올바르지 않습니다.");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        goJoin();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const movePage = useNavigate();

  function goSelect() {
    movePage("/");
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
