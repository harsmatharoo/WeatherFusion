function submitForm(event){
    if(event.submitter.value === "Confirm"){
        let inputName = document.querySelector(".inputName input");
        if(inputName.value === ""){
            event.preventDefault();
            console.log("Please fill your name or continue anonymously");
            alert("Please fill your name or continue anonymously");
        }
    }
}