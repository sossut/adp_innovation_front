const renderQuestion = async (elem) => {
  elem.innerHTML = "";
};

// try {
//   const response = await fetch(
//     `https://adp2.onrender.com/api/v1/question/${id}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const result = await response.json();
//   console.log(result);
//   const question = result.question;
//   const choices = result.choices;
//   div.innerHTML = "Kukkuu";
// } catch (error) {
//   console.log(error);
// }

const getAndRenderQuestions = async () => {
  const getQuestions = async () => {
    try {
      const response = await fetch(
        "https://adp2.onrender.com/api/v1/question",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.message === "No questions found") {
        return [];
      }
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  try {
    //haetaan kaikki kysymykset
    const questions = await getQuestions();
    const questionsDiv = document.querySelector(".questions");
    let i = 1;
    questions.forEach((question) => {
      //luodaan kysymysdivi
      const questionDiv = document.createElement("div");
      questionDiv.setAttribute(
        "id",
        `question-id-${question.question.question_id}`
      );
      questionDiv.setAttribute(
        "data-question-id",
        question.question.question_id
      );
      questionDiv.setAttribute("data-question-number", i);
      questionDiv.classList.add("question");
      const questionText = document.createElement("p");
      questionText.innerHTML = `<button class="buttons-2">${i}</button>${question.question.question}`;

      const modifyQuestionButton = document.createElement("button");
      modifyQuestionButton.classList.add("modify-question-button");
      modifyQuestionButton.setAttribute(
        "data-question-id",
        question.question.question_id
      );
      modifyQuestionButton.innerHTML = "Muokkaa";

      //luodaaa vastausdivi ja siihen kolme vastausvaihteoa: Kyllä, Ei osaa sanoa, Ei
      const answersDiv = document.createElement("div");
      answersDiv.classList.add("answers");
      const questionAnswer1 = document.createElement("p");
      questionAnswer1.innerHTML = `${question.choices[0].choice_text}`;
      questionAnswer1.setAttribute(
        "id",
        `q${question.question.question_id}yes`
      );
      questionAnswer1.setAttribute("value", question.choices[0].choice_value);
      questionAnswer1.setAttribute(
        "data-question-id",
        question.question.question_id
      );
      questionAnswer1.setAttribute(
        "data-choice-id",
        question.choices[0].choices_id
      );
      const questionAnswer2 = document.createElement("p");
      questionAnswer2.innerHTML = `${question.choices[1].choice_text}`;
      questionAnswer2.setAttribute(
        "id",
        `q${question.question.question_id}maybe`
      );
      questionAnswer2.setAttribute("value", question.choices[1].choice_value);
      questionAnswer2.setAttribute(
        "data-question-id",
        question.question.question_id
      );
      questionAnswer2.setAttribute(
        "data-choice-id",
        question.choices[1].choices_id
      );
      const questionAnswer3 = document.createElement("p");
      questionAnswer3.innerHTML = `${question.choices[2].choice_text}`;
      questionAnswer3.setAttribute("id", `q${question.question.question_id}no`);

      questionAnswer3.setAttribute("value", question.choices[2].choice_value);
      questionAnswer3.setAttribute(
        "data-question-id",
        question.question.question_id
      );
      questionAnswer3.setAttribute(
        "data-choice-id",
        question.choices[2].choices_id
      );

      //avataan modaali muokkaa napista
      modifyQuestionButton.addEventListener("click", async () => {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");
        const modalHeader = document.createElement("div");
        modalHeader.classList.add("modal-header");
        const modalTitle = document.createElement("h2");
        modalTitle.innerHTML = "Muokkaa kysymystä";

        const closeButton = document.createElement("button");
        closeButton.classList.add("close-modal");
        closeButton.innerHTML = "&times;";
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        const modalBody = document.createElement("div");
        modalBody.classList.add("modal-body");

        //tehdään formi, johon kysymys- ja vastausvaihtoehdot
        const modalForm = document.createElement("form");
        modalForm.classList.add("modal-form");
        const modalQuestion = document.createElement("textarea");

        modalQuestion.classList.add("modal-question");
        modalQuestion.value = question.question.question;
        modalQuestion.setAttribute(
          "data-question-id",
          question.question.question_id
        );
        modalForm.appendChild(modalQuestion);
        const modalAnswers = document.createElement("div");
        modalAnswers.classList.add("modal-answers");

        const answerHeader = document.createElement("h3");
        answerHeader.innerHTML = "Muokkaa vastausvaihtoehtoja";

        const getChoices = async () => {
          try {
            const response = await fetch(
              `https://adp2.onrender.com/api/v1/choice`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            const result = await response.json();
            return result;
          } catch (error) {
            console.log(error);
          }
        };
        const choices = await getChoices();
        const yesAnswer = choices.filter((choice) => choice.choice_value === 3);
        const maybeAnswer = choices.filter(
          (choice) => choice.choice_value === 2
        );
        const noAnswer = choices.filter((choice) => choice.choice_value === 1);

        modalAnswers.appendChild(answerHeader);

        //tehdään selectit jokaiselle vastausvaihtoehdolle vastausvaihtoehdon valitsemista varten
        const modalAnswer1 = document.createElement("div");
        const modalAnswer1Select = document.createElement("select");
        modalAnswer1Select.classList.add("modal-answer-select");
        modalAnswer1Select.name = "answerYes";
        modalAnswer1.classList.add("modal-answer");
        const modalAnswer1Label = document.createElement("label");
        modalAnswer1Label.innerHTML = "Kyllä: ";
        yesAnswer.forEach((answer) => {
          const option = document.createElement("option");
          option.value = answer.choice_value;
          option.setAttribute("data-choice-id", answer.id);
          option.innerHTML = answer.choice_text;
          if (questionAnswer1.getAttribute("data-choice-id") == answer.id) {
            option.selected = true;
          }
          modalAnswer1Select.appendChild(option);
        });

        modalAnswer1.appendChild(modalAnswer1Label);
        modalAnswer1.appendChild(modalAnswer1Select);
        modalAnswers.appendChild(modalAnswer1);

        const modalAnswer2 = document.createElement("div");
        const modalAnswer2Select = document.createElement("select");
        modalAnswer2Select.classList.add("modal-answer-select");
        modalAnswer2Select.name = "answerMaybe";
        modalAnswer2.classList.add("modal-answer");
        const modalAnswer2Label = document.createElement("label");
        modalAnswer2Label.innerHTML = "Ei osaa sanoa: ";
        maybeAnswer.forEach((answer) => {
          const option = document.createElement("option");
          option.value = answer.choice_value;
          option.setAttribute("data-choice-id", answer.id);
          option.innerHTML = answer.choice_text;
          if (questionAnswer2.getAttribute("data-choice-id") == answer.id) {
            option.selected = true;
          }
          modalAnswer2Select.appendChild(option);
        });
        modalAnswer2.appendChild(modalAnswer2Label);
        modalAnswer2.appendChild(modalAnswer2Select);
        modalAnswers.appendChild(modalAnswer2);

        const modalAnswer3 = document.createElement("div");
        const modalAnswer3Select = document.createElement("select");
        modalAnswer3Select.classList.add("modal-answer-select");
        modalAnswer3Select.name = "answerYes";
        modalAnswer3.classList.add("modal-answer");
        const modalAnswer3Label = document.createElement("label");
        modalAnswer3Label.innerHTML = "Ei: ";
        noAnswer.forEach((answer) => {
          const option = document.createElement("option");
          option.value = answer.choice_value;
          option.setAttribute("data-choice-id", answer.id);
          option.innerHTML = answer.choice_text;
          if (questionAnswer3.getAttribute("data-choice-id") == answer.id) {
            option.selected = true;
          }
          modalAnswer3Select.appendChild(option);
        });
        modalAnswer3.appendChild(modalAnswer3Label);
        modalAnswer3.appendChild(modalAnswer3Select);
        modalAnswers.appendChild(modalAnswer3);

        modalForm.appendChild(modalAnswers);
        const modalFooter = document.createElement("div");
        modalFooter.classList.add("modal-footer");

        //tallennusnappi
        const modalSaveButton = document.createElement("button");
        modalSaveButton.classList.add("modal-save-button");
        modalSaveButton.innerHTML = "Tallenna";

        //slider kysymyksen tärkeyden valitsemista varten
        const sliderDiv = document.createElement("div");
        const sliderHeader = document.createElement("h3");
        sliderHeader.innerHTML = "Valitse kysymyksen tärkeys";
        sliderDiv.classList.add("slider-container");
        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "1";
        slider.max = "5";
        slider.value = question.question.weight;
        slider.classList.add("slider");
        slider.setAttribute("id", `q${question.question.question_id}slider`);
        slider.setAttribute("data-question-id", question.question.question_id);
        slider.setAttribute("step", "1");
        const sliderValue = document.createElement("p");
        sliderValue.innerHTML = "1";
        sliderValue.classList.add("slider-value");

        slider.addEventListener("input", () => {
          sliderValue.innerHTML = slider.value;
          sliderValue.setAttribute("value", slider.value);
          slider.setAttribute("value", slider.value);
        });

        //piiloita kysymys checkbox. Jos piiloitettu ei näy surveyssä
        const hideQuestionDiv = document.createElement("div");
        const hideQuestionCheckbox = document.createElement("input");
        hideQuestionCheckbox.type = "checkbox";
        hideQuestionCheckbox.classList.add("hide-question-checkbox");
        hideQuestionCheckbox.setAttribute(
          "data-question-id",
          question.question.question_id
        );
        hideQuestionCheckbox.setAttribute(
          "id",
          `${question.question.question_id}-hide`
        );
        const hideQuestionLabel = document.createElement("label");
        hideQuestionLabel.setAttribute(
          "for",
          `${question.question.question_id}-hide`
        );
        hideQuestionLabel.innerHTML = "Piilota kysymys";
        if (question.question.active === "true") {
          hideQuestionCheckbox.checked = false;
        } else {
          hideQuestionCheckbox.checked = true;
        }

        //tallennetaan muokattu kysymys
        modalSaveButton.addEventListener("click", async () => {
          const questionId = modalQuestion.getAttribute("data-question-id");
          const questionText = modalQuestion.value;
          const choiceYes =
            modalAnswer1Select.options[
              modalAnswer1Select.selectedIndex
            ].getAttribute("data-choice-id");
          const choiceMaybe =
            modalAnswer2Select.options[
              modalAnswer2Select.selectedIndex
            ].getAttribute("data-choice-id");
          const choiceNo =
            modalAnswer3Select.options[
              modalAnswer3Select.selectedIndex
            ].getAttribute("data-choice-id");
          const weight = slider.value;
          const hidden = hideQuestionCheckbox.checked;
          let string = "";
          if (hidden === true) {
            string = "false";
          } else {
            string = "true";
          }
          const body = {
            question: questionText,
            weight: weight,
            active: string,
            choices: [
              { choice_id: choiceYes },
              { choice_id: choiceMaybe },
              { choice_id: choiceNo },
            ],
          };
          try {
            const response = await fetch(
              `https://adp2.onrender.com/api/v1/question/${questionId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(body),
              }
            );
            const result = await response.json();
            if (result.message === "question updated") {
              // tähän joku parempi kuin alert
              alert("Kysymys päivitetty");
              renderQuestion(questionId, questionDiv);
            }
          } catch (error) {
            console.log(error);
          }
        });

        modalFooter.appendChild(modalSaveButton);
        modalContent.appendChild(modalHeader);
        sliderDiv.appendChild(sliderHeader);
        sliderDiv.appendChild(slider);
        sliderDiv.appendChild(sliderValue);
        modalForm.appendChild(sliderDiv);
        hideQuestionDiv.appendChild(hideQuestionCheckbox);
        hideQuestionDiv.appendChild(hideQuestionLabel);
        modalForm.appendChild(hideQuestionDiv);
        modalBody.appendChild(modalForm);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        modal.style.display = "block";
        closeButton.addEventListener("click", () => {
          modal.remove();
        });
        window.addEventListener("click", (event) => {
          if (event.target == modal) {
            modal.remove();
          }
        });
      });

      questionDiv.appendChild(questionText);
      questionDiv.appendChild(modifyQuestionButton);
      answersDiv.appendChild(questionAnswer1);

      answersDiv.appendChild(questionAnswer2);

      answersDiv.appendChild(questionAnswer3);
      questionDiv.appendChild(answersDiv);

      questionsDiv.appendChild(questionDiv);
      i++;
    });
  } catch (error) {
    console.log(error);
  }
};
getAndRenderQuestions();
