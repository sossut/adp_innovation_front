const questionsDiv = document.querySelector(".questions");

const renderQuestion = async (elem, question, i) => {
  try {
    elem.innerHTML = "";
    const questionText = document.createElement("p");
    if (i < 10) {
      questionText.innerHTML = `<button class="buttons">${i}</button>${question.question.question}`;
    } else {
      questionText.innerHTML = `<button class="buttons-2">${i}</button>${question.question.question}`;
    }
    if (question.question.active === "false") {
      const hidden = document.createElement("p");
      hidden.innerHTML = "Piilotettu";
      hidden.classList.add("hidden");
      elem.appendChild(hidden);
    }

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
    const div = document.createElement("div");
    const ball = document.createElement("div");
    ball.classList.add("ball");
    const questionAnswer1 = document.createElement("p");
    questionAnswer1.classList.add("question-answer");
    questionAnswer1.innerHTML = `${question.choices[0].choice_text}`;
    questionAnswer1.setAttribute("id", `q${question.question.question_id}yes`);
    questionAnswer1.setAttribute("value", question.choices[0].choice_value);
    questionAnswer1.setAttribute(
      "data-question-id",
      question.question.question_id
    );
    questionAnswer1.setAttribute(
      "data-choice-id",
      question.choices[0].choices_id
    );
    const div2 = document.createElement("div");
    const ball2 = document.createElement("div");
    const questionAnswer2 = document.createElement("p");
    questionAnswer2.classList.add("question-answer");
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
    const div3 = document.createElement("div");
    const ball3 = document.createElement("div");
    const questionAnswer3 = document.createElement("p");
    questionAnswer3.classList.add("question-answer");
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
            `https://shtsvr.mooo.com/adp/api/v1/choice`,
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
      console.log(choices);
      const yesAnswer = choices.filter((choice) => choice.choice_value === 1);
      const maybeAnswer = choices.filter((choice) => choice.choice_value === 0);
      const noAnswer = choices.filter((choice) => choice.choice_value === -1);

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
      sliderValue.innerHTML = question.question.weight;
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

      const changeSectionDiv = document.createElement("div");
      const changeSectionLabel = document.createElement("label");
      changeSectionLabel.innerHTML = "Vaihda osaa";
      const changeSectionSelect = document.createElement("select");
      changeSectionSelect.classList.add("change-section-select");
      changeSectionSelect.name = "changeSection";
      changeSectionSelect.setAttribute("id", "changeSection");

      const getSections = async () => {
        try {
          const response = await fetch(
            `https://shtsvr.mooo.com/adp/api/v1/section`,
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
      const sections = await getSections();
      sections.forEach((section) => {
        const option = document.createElement("option");
        option.value = section.id;
        option.innerHTML = section.section_text;
        if (section.id === question.question.section_id) {
          option.selected = true;
        }
        changeSectionSelect.appendChild(option);
      });
      changeSectionDiv.appendChild(changeSectionLabel);
      changeSectionDiv.appendChild(changeSectionSelect);
      const oldSectionId = question.question.section_id;
      let newSectionId;
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
        const sectionId = changeSectionSelect.value;
        newSectionId = sectionId;
        const body = {
          question: questionText,
          weight: weight,
          active: string,
          choices: [
            { choice_id: choiceYes },
            { choice_id: choiceMaybe },
            { choice_id: choiceNo },
          ],
          section_id: sectionId,
        };

        try {
          const response = await fetch(
            `https://shtsvr.mooo.com/adp/api/v1/question/${questionId}`,
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
            try {
              const id = modalQuestion.getAttribute("data-question-id");
              const response = await fetch(
                `https://shtsvr.mooo.com/adp/api/v1/question/${id}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const result = await response.json();

              alert("Kysymys päivitetty");
              const j = elem.getAttribute("data-question-number");
              const div = document.querySelector(`#question-id-${questionId}`);
              const choices = JSON.parse(result.choices.toString());

              const question = {
                question: result.question,
                choices: choices,
              };
              if (newSectionId != oldSectionId) {
                await getAndRenderQuestions();
              } else {
                renderQuestion(div, question, j);
              }
            } catch (error) {
              console.log(error);
            }
          }
          modal.remove();
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
      modalForm.appendChild(changeSectionDiv);
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

    elem.appendChild(questionText);
    elem.appendChild(modifyQuestionButton);
    div.appendChild(ball);
    div.appendChild(questionAnswer1);
    div2.appendChild(ball2);
    div2.appendChild(questionAnswer2);
    div3.appendChild(ball3);
    div3.appendChild(questionAnswer3);
    answersDiv.appendChild(div);

    answersDiv.appendChild(div2);

    answersDiv.appendChild(div3);

    elem.appendChild(answersDiv);
  } catch (error) {
    console.log(error);
  }
};

const getAndRenderQuestions = async () => {
  questionsDiv.innerHTML = "";
  const getQuestions = async () => {
    try {
      const response = await fetch(
        "https://shtsvr.mooo.com/adp/api/v1/question",
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

      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const getSections = async () => {
    try {
      const response = await fetch(
        "https://shtsvr.mooo.com/adp/api/v1/section",
        {
          headers: {
            "Content-Type": "application/json",
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
    //haetaan kaikki kysymykset
    const questions = await getQuestions();
    const sections = await getSections();
    let k = 1;
    sections.forEach((section) => {
      const sectionDiv = document.createElement("div");
      sectionDiv.classList.add("section");
      const sectionTitle = document.createElement("h2");
      sectionTitle.innerHTML = `Osa ${k}: ${section.section_text}`;
      const sectionDescription = document.createElement("h4");
      sectionDescription.innerHTML = section.description;

      k++;

      sectionDiv.appendChild(sectionTitle);
      sectionDiv.appendChild(sectionDescription);
      let i = 1;
      questions.forEach((question) => {
        //luodaan kysymysdivi
        if (question.question.section_id === section.id) {
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
          questionDiv.setAttribute("data-section-id", section.id);
          questionDiv.classList.add("question");
          renderQuestion(questionDiv, question, i);

          sectionDiv.appendChild(questionDiv);
        }
        i++;
      });
      questionsDiv.appendChild(sectionDiv);
    });
  } catch (error) {
    console.log(error);
  }
};
getAndRenderQuestions();
