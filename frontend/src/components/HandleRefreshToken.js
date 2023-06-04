const handleRefreshToken = () => {
  return new Promise((resolve, reject) => {
    const showErrorMessages = (jsonData) => {
      const errorMessages = Object.values(jsonData.error).join("\n");
      return errorMessages;
    };

    const refreshToken = localStorage.getItem("refreshToken");

    fetch(`http://localhost:8080/user/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refreshToken
      })
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return response.json().then((jsonData) => {
            throw new Error(showErrorMessages(jsonData));
          });
        }
      })
      .then((data) => {
        sessionStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        resolve(true); // Promise를 성공 상태로 처리하고 true 값을 전달
      })
      .catch((error) => {
        alert("로그인이 만료되었습니다.");
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        reject(error); // Promise를 실패 상태로 처리하고 오류를 전달
      });
  });
};

export default handleRefreshToken;
