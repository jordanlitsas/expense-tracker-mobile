
window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#addCategoryBtn").onclick = addCategory;
});

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
        url:'http://localhost:8080/category',
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

