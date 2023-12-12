const login = async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const data = {
    username: username,
    password: password,
  };
  console.log(JSON.stringify(data));
  try {
    const response = await fetch(
      "https://shtsvr.mooo.com/adp/api/v1/auth/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    console.log(result);
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
    // window.location.href = "http://localhost:3000/kysymykset.html";
  } catch (error) {
    console.log(error);
  }
};
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", login);
