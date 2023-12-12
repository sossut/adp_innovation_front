const registerButton = document.getElementById("register-button");
const errorP = document.getElementById("password-error");
let password, password2;
addEventListener("keyup", (e) => {
  password = document.getElementById("password").value;
  password2 = document.getElementById("password2").value;
  if (password !== password2 || password === "" || password2 === "") {
    registerButton.disabled = true;
    errorP.style.display = "block";
  }
  if (password === password2 && password !== "" && password2 !== "") {
    registerButton.disabled = false;
    errorP.style.display = "none";
  }
});
const register = async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  password2 = document.getElementById("password2").value;
  if (password !== password2) {
    alert("Salasanat eivät täsmää");
    return;
  }
  const data = {
    username: username,
    password: password,
    email: email,
  };
  try {
    const response = await fetch("https://shtsvr.mooo.com/adp/api/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    // Vois olla hyvä että pitää kirjautua sisään heti rekisteröitymisen jälkeen

    // window.location.href = "TÄHÄN KIRJAUTUMISSIVU";
  } catch (error) {
    console.log(error);
  }
};

registerButton.addEventListener("click", register);
