var params = {};
location.search.slice(1).split("&").forEach(function (pair) {
    pair = pair.split("=");
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
});

const question = (JSON.parse(localStorage.getItem("questions")) ?? [])[params['index']]

const view = document.getElementById("question")
document.title = question.title
console.log(question);



question.questions.forEach((q, i) => {
    const tempView = view.cloneNode(true)
    tempView.classList.remove("hidden")
    console.log(q);
    tempView.getElementsByClassName("question-question")[0].innerText = q.question
    tempView.getElementsByClassName("question-number")[0].innerText = `Question: ${i + 1}`

    const multiView = tempView.getElementsByClassName("multichoice-view")[0]
    const multiRow = multiView.getElementsByClassName("mult-row")[0]
    const shortView = tempView.getElementsByClassName("short-question-view")[0]
    const matchingView = tempView.getElementsByClassName("match-matching-question-view")[0]

    switch (q.type) {
        case "multiple":
            multiView.classList.remove("hidden")
            break;
        case "short":
            shortView.classList.remove("hidden")

            break;
        case "matching":
            matchingView.classList.remove("hidden")

            break;

        default:
            break;
    }

    document.getElementsByTagName("BODY")[0].appendChild(tempView)
})