window.addEventListener('DOMContentLoaded', async (event) => {
    await getSpendingCategories();
    setupSelect();
    document.querySelector("#addCategoryBtn").onclick = addCategory;
    document.querySelector("#submitBtn").onclick = submitExpense;
    getExpenses();
});

const addCategory = async () => {
    console.log('add category')
    window.location.replace("./addCategory.html");
}

const submitExpense = async () => {
    let category = document.querySelector("#categoryInput");
    let amountSpent = document.querySelector('#amountSpentInput');
    let date = new Date();
    let body = {
        userId: sessionStorage.getItem('userId'),
        category: category.value,
        amountSpent: parseFloat(amountSpent.value),
        submitDate: date
    };

    
    $.ajax({
        async: true,
        url:'https://expense-tracker-springboot-api.herokuapp.com/spend',
        contentType: 'application/json',
        data: JSON.stringify(body),
        type: 'POST',
        success: function(data){
            console.log(data)
            M.toast({html: "Your expense was recorded."})
            console.log(category);
            category.selectedIndex = 0;
            setupSelect();
            amountSpent.value = "";
        }, 
        error: function(error){
            console.log('user not inserted')
            console.log(error)

        }
    });
}

const setupSelect = () => {
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, null);
}

const getSpendingCategories = async () => {

    await $.ajax({
        async: true,
        url: `https://expense-tracker-springboot-api.herokuapp.com/category/${sessionStorage.getItem("userId")}`,
        type: 'GET',
        success: function(data, responseText, jqXHR){
            let categorySelect = document.querySelector("#categoryInput");
            console.log(data)
            for (let i = 0; i < data.length; i++){
                categorySelect.options[categorySelect.options.length] = new Option(data[i].name, data[i].name);
            }
        }, 
        error: function(error){
            console.log('user not inserted')
            console.log(error)
            

        }
    })

    

}