const getAndRenderQuestions = async () => {
  const getQuestions = async () => {
    try {
      const response = await fetch(
        "https://shtsvr.mooo.com/adp/api/v1/question/active",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoidGVzdGkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDAyMTY4NTYsImV4cCI6MTcwMDMwMzI1Nn0.T7ZnYBRnIyAK_6VDuPwthUVNU7DPR9rzmQ8XwGgybTM",
          },
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  try {
    const questions = await getQuestions();
    const questionsDiv = document.querySelector(".questions");
    let i = 1;
    questions.forEach((question) => {
      const questionDiv = document.createElement("form");
      questionDiv.setAttribute(
        "data-question-id",
        question.question.question_id
      );
      questionDiv.setAttribute("data-question-number", i);
      questionDiv.classList.add("question");
      const questionText = document.createElement("p");
      questionText.innerHTML = `<button class="buttons-2">${i}</button>${question.question.question}`;
      const questionAnswer1 = document.createElement("input");
      questionAnswer1.type = "radio";
      questionAnswer1.setAttribute(
        "id",
        `q${question.question.question_id}yes`
      );
      questionAnswer1.setAttribute("name", "q");
      questionAnswer1.setAttribute("value", question.choices[0].choice_value);
      questionAnswer1.setAttribute(
        "data-question-id",
        question.question.question_id
      );
      const label1 = document.createElement("label");
      label1.setAttribute("for", "q1yes");
      label1.innerHTML = `${question.choices[0].choice_text}<br>`;
      const questionAnswer2 = document.createElement("input");
      questionAnswer2.type = "radio";
      questionAnswer2.setAttribute(
        "id",
        `q${question.question.question_id}maybe`
      );
      questionAnswer2.setAttribute("name", "q");
      questionAnswer2.setAttribute("value", question.choices[1].choice_value);
      questionAnswer2.setAttribute(
        "data-question-id",
        question.question.question_id
      );
      const label2 = document.createElement("label");
      label2.setAttribute("for", "q1maybe");
      label2.innerHTML = `${question.choices[1].choice_text}<br>`;
      const questionAnswer3 = document.createElement("input");
      questionAnswer3.type = "radio";
      questionAnswer3.setAttribute("id", `q${question.question.question_id}no`);
      questionAnswer3.setAttribute("name", "q");
      questionAnswer3.setAttribute("value", question.choices[2].choice_value);
      questionAnswer3.setAttribute(
        "data-question-id",
        question.question.question_id
      );
      const label3 = document.createElement("label");
      label3.setAttribute("for", "q1no");
      label3.innerHTML = `${question.choices[2].choice_text}<br>`;
      questionDiv.appendChild(questionText);
      questionDiv.appendChild(questionAnswer1);
      questionDiv.appendChild(label1);
      questionDiv.appendChild(questionAnswer2);
      questionDiv.appendChild(label2);
      questionDiv.appendChild(questionAnswer3);
      questionDiv.appendChild(label3);
      questionsDiv.appendChild(questionDiv);
      i++;
    });
  } catch (error) {
    console.log(error);
  }
};
getAndRenderQuestions();

//take all the forms and combine them into one object to send to the backend

const submitAnswers = async () => {
  const sendObject = {};
  const data = [];
  const forms = document.querySelectorAll("form");
  const questionNumber = [];
  const questionNumberCheck = [];
  forms.forEach((form) => {
    questionNumber.push(parseInt(form.getAttribute("data-question-number")));
    const obj = {};
    form.querySelectorAll("input").forEach((input) => {
      if (input.checked) {
        obj["question_id"] = parseInt(input.getAttribute("data-question-id"));
        obj["answer"] = parseInt(input.value);
        data.push(obj);
        questionNumberCheck.push(obj.question_id);
      }
    });
  });
  sendObject["data"] = data;
  // HAE TALOYHTIÖN AVAIN TÄHÄN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  sendObject["survey_key"] = "testi";
  console.log(data);
  //Tähän vaikka joku modaali tai jotain. Joku sellainen mikä kertoo mihin kysymyksiin ei ole vastattu
  if (questionNumberCheck.length != forms.length) {
    let i = 1;
    const tempObject = {};
    questionNumberCheck.forEach((obj) => {
      tempObject[obj] = true;
    });
    const filtered = questionNumber.filter((id) => {
      return !tempObject[id];
    });
    console.log("data", questionNumberCheck);
    console.log("filtteröinnin jälkeen questionsIds", filtered);
    alert(
      "Et ole vastannut kaikkiin kysymyksiin. Vastaa kysymyksiin: " +
        filtered.join(", ")
    );
    return;
  } else {
    try {
      const response = await fetch(
        "https://shtsvr.mooo.com/adp/api/v1/answer/all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoidGVzdGkiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDAyMTY4NTYsImV4cCI6MTcwMDMwMzI1Nn0.T7ZnYBRnIyAK_6VDuPwthUVNU7DPR9rzmQ8XwGgybTM",
          },
          body: JSON.stringify(sendObject),
        }
      );
      const result = await response.json();
      console.log(result);
      //tähän myös joku parempi kuin alertti
      alert("Kiitos vastauksistasi!");
    } catch (error) {
      console.log(error);
    }
  }
};
const submitButton = document.querySelector("#submit-answers");
submitButton.addEventListener("click", submitAnswers);
