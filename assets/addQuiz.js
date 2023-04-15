const getQuestions = () => JSON.parse(localStorage.getItem("questions")) ?? []

const handleOnChangeInput = () => {
    const title = document.getElementById("title")
    const desc = document.getElementById("desc")
}

const View = document.getElementsByClassName("view-container")[0];

// const MultiChoiceView = document.getElementById("multichoice-view"); 
// const ShortQuestionView = document.getElementById("short-question-view"); 
// const MatchingView = document.getElementById("match-matching-question-view");
const Question = document.getElementsByClassName("question")[0]

const selectorOnChange = (view, multiView, shortView, matchingView) => {
    multiView.classList.add("hidden")
    shortView.classList.add("hidden")
    matchingView.classList.add("hidden")

    switch (view) {
        case "multiple":
            multiView.classList.remove("hidden");
            return;
        case "short":
            shortView.classList.remove("hidden");
            return;
        case "matching":
            matchingView.classList.remove("hidden");
            return;
    }
}

const onAddMoreAnswer = (view, row) => {
    row = row.cloneNode(true);
    row.classList.remove("hidden")
    const del = row.getElementsByTagName("span")[0]
    del.onclick = () => view.removeChild(row)
    view.appendChild(row)
}



const addMoreQuestion = () => {
    node = View.cloneNode(true)
    node.classList.remove("hidden")
    const QuestionSelector = node.getElementsByClassName("question-type")[0]
    const multiView = node.getElementsByClassName("multichoice-view")[0]
    const shortView = node.getElementsByClassName("short-question-view")[0]
    const matchingView = node.getElementsByClassName("match-matching-question-view")[0]
    QuestionSelector.onchange = () => selectorOnChange(QuestionSelector.value, multiView, shortView, matchingView)

    const addMoreMulti = multiView.getElementsByClassName("add-answer")[0]
    const addMoreMatching = matchingView.getElementsByClassName("add-answer")[0]

    const rowMulti = multiView.getElementsByClassName("multi-row")[0]
    const rowMatch = matchingView.getElementsByClassName("match-row")[0]

    const answerMulti = rowMulti.getElementsByTagName("div")[0]
    const answerMatch = rowMatch.getElementsByTagName("div")[0]

    addMoreMulti.onclick = () => onAddMoreAnswer(rowMulti, answerMulti)
    addMoreMatching.onclick = () => onAddMoreAnswer(rowMatch, answerMatch)

    Question.appendChild(node)
}

const onSave = (e) => {
    // e.preventDefault()

    const existed = getQuestions();
    const title = document.getElementById("quiz-title").value
    const desc = document.getElementById("quiz-desc").value

    const view = Array.from(document.getElementsByClassName("view-container")).slice(1)
    const questions = view.map(element => {
        const q = element.getElementsByClassName("question")[0].value
        const t = element.getElementsByClassName("question-type")[0].value

        const multiView = element.getElementsByClassName("multichoice-view")[0]
        const shortView = element.getElementsByClassName("short-question-view")[0]
        const matchingView = element.getElementsByClassName("match-matching-question-view")[0]

        const multiAnswer = Array.from(multiView.getElementsByClassName("multi-row")[0].getElementsByTagName("div")).slice(1).map(e => {
            const a = Array.from(e.getElementsByTagName("input")).map((i, index) => index === 0 ? i.checked : i.value)
            return { isTrue: a[0], text: a[1] }
        })
        const shortAnswer = ""

        const matchingAnswer = Array.from(matchingView.getElementsByClassName("match-row")[0].getElementsByTagName("div")).slice(1).map(e => {
            const a = Array.from(e.getElementsByTagName("input")).map((i) => i.value)
            return { text1: a[0], text2: a[1] }
        })


        const a = t === "matching" ? matchingAnswer : t === "multiple" ? multiAnswer : shortAnswer;

        return { question: q, type: t, answer: [...a] }
    });



    console.log({ title, desc, questions });

    localStorage.setItem("questions", JSON.stringify([...existed, { title, desc, questions }]))
    location.href = "/"
}