
window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#addCategoryBtn").onclick = addCategory;
    getExpenses();
});

const getExpensese = async() => {
    document.querySelector('#res').value = "some text";

    await $.ajax({
        async: true,
        url: `https://expense-tracker-springboot-api.herokuapp.com/spend/${sessionStorage.getItem("userId")}`,
        type: 'GET',
        success: function(data, responseText, jqXHR){
           document.querySelector('#res').textContent = data;
        }, 
        error: function(error){
            console.log('user not inserted')
            console.log(error)
            

        }
    })
}
const addCategory = async () => {
    let name = document.querySelector("#categoryNameInput").value;
    let sevenDayLimit = document.querySelector("#sevenDayLimitInput").value;
    let body = {
        userId: sessionStorage.getItem("userId"),
        name: name,
        sevenDayLimit: sevenDayLimit
    };
    

    $.ajax({
        async: true,
        url:'https://expense-tracker-springboot-api.herokuapp.com/category',
        contentType: 'application/json',
        data: JSON.stringify(body),
        type: 'POST',
        success: function(data){
            console.log(data)
            window.location.replace('./spend.html');
        }, 
        error: function(error){
            console.log('user not inserted')
            console.log(error)

        }
    });
}

