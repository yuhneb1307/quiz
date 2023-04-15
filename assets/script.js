const getQuestions = () => JSON.parse(localStorage.getItem("questions")) ?? []

// console.log(typeof getQuestions())
const list = document.getElementById("list")
getQuestions().forEach((element, i) => {
    node = list.getElementsByClassName("quiz-number")[0].cloneNode(true)
    node.classList.remove("hidden")
    node.getElementsByClassName("del")[0].onclick = () => removeItem(i)
    node.getElementsByClassName("quiz-title")[0].innerText = `Quiz ${i + 1}: ${element.title}`
    // node.getElementsByClassName("quiz-title")[0].onclick = () => onClickViewQuiz(i)
    node.getElementsByClassName("quiz-title")[0].href = `/viewQuiz.html?index=${i}`

    list.appendChild(node)
});

const removeItem = (id) => {
    var questions = getQuestions()

    questions.splice(id, 1);
    localStorage.setItem("questions", JSON.stringify(questions))
}

const onChangeCheck = (node) => {
    const editButton = Array.from(document.getElementsByClassName("edit-quiz"))

    if (node.checked) {
        editButton.forEach(e => e.classList.remove("hidden"))
        return
    };
    editButton.forEach(e => e.classList.add("hidden"))

}

