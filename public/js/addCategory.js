
window.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector("#addCategoryBtn").onclick = addCategory;
    document.querySelector("#backBtn").onclick = () => {
        window.location.replace('./spend.html')
    }
   
});


const addCategory = async () => {
    let name = document.querySelector("#categoryNameInput").value;
    let sevenDayLimit = document.querySelector("#sevenDayLimitInput").value;
    let expenseType =  document.querySelector('#expenseTypeSwitch').checked;
    let isSavings = document.querySelector('#savingsCheckbox').checked;
    if (name.length != 0 && sevenDayLimit.length != 0){
        let body = {
            userId: parseFloat(sessionStorage.getItem("userId")),
            name: name,
            sevenDayLimit: sevenDayLimit,
            expenseType: expenseType ? 'disposable' : 'bill',
            isSavings: isSavings
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
   
}

