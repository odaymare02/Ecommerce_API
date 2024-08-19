const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
const name=document.getElementById("name");
const email=document.getElementById("email");
const nameRegex = /^[A-Z][a-z]+( [A-Z][a-z]+)*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
document.getElementById("sendbtn").classList.add("disabled");
name.addEventListener("blur",()=>{
    if(nameRegex.test(name.value)){
        name.classList.add("is-valid");
        name.classList.remove("is-invalid");
    }
    else{
        name.classList.add("is-invalid");
        name.classList.remove("is-valid");
    }
    checkInputs(name,email);
});
email.addEventListener("blur",()=>{
    if(emailRegex.test(email.value)){
        email.classList.add("is-valid");
        email.classList.remove("is-invalid");
    }
    else{
        email.classList.add("is-invalid");
        email.classList.remove("is-valid");
    }
    checkInputs(name,email);
});
const checkInputs=(name,email) => {
    if(name.classList.contains("is-valid") && email.classList.contains("is-valid")){
        document.getElementById("sendbtn").classList.remove("disabled");
    }
    else{
        document.getElementById("sendbtn").classList.add("disabled");
    }
}
