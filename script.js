function saveToCrudCrud(event){
    event.preventDefault();
    const expAmount = event.target.expAmount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const myObj = {
        expAmount,
        description,
        category
    }
    axios.post("https://crudcrud.com/api/df4ffb6fb1584d0db1cee19817926218/ExpenseTracker",myObj)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
window.addEventListener('DOMContentLoaded',event => {
    axios.get("https://crudcrud.com/api/df4ffb6fb1584d0db1cee19817926218/ExpenseTracker")
    .then(res=>{
        for(let i=0 ; i<res.data.length ; i++)
        {
            showNewUserOnScreen(res.data[i]);
        }
})
.catch(err => console.error(err));
});
function showNewUserOnScreen(user){
    const parentNode =document.getElementById("listOfUsers");
    const childHTML = `<li id ='${user._id}'>${user.expAmount} - ${user.description} -${user.category}
    <button onclick = "editUserDetails('${user.expAmount}','${user.description}','${user.category}','${user._id}')"> Edit </button>
    <button onclick = "deleteUser('${user._id}')"> Delete </button> </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
function deleteUser(Id) {
    axios.delete(`https://crudcrud.com/api/df4ffb6fb1584d0db1cee19817926218/ExpenseTracker/${Id}`)
    removeUserFromScreen(Id);
}
function removeUserFromScreen(Id) {
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(`${Id}`);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}
function editUserDetails (expAmount,description,category,Id) {
    document.getElementById('expAmount').value = expAmount;
    document.getElementById('description').value = description;
    document.getElementById('category').value = category;
    deleteUser(Id);
}