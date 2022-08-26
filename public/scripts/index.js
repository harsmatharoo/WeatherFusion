function submitForm(event){
    if(event.submitter.value === "Confirm"){
        let inputName = document.querySelector(".inputName input");
        if(inputName.value === ""){
            event.preventDefault();
            
            alert("KIndly fill in your name or continue as anonymous");
        }
    }
}
