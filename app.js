// discribing

let url = document.querySelector(".url_input");
let start_btn = document.querySelector("#start_btn");
let searching_word = document.querySelector(".searching_word");
let people_number = document.querySelector("#people_number");
let winner_list = document.querySelector(".winner_list");
let main_menu = document.querySelector(".card");
let second_card = document.querySelector(".second_card");
let repeat_btn = document.querySelector("#repeat");
let exit_btn = document.querySelector("#exit");

let users = [];
let numbers = [];
let winner_people = [];

start_btn.addEventListener("click",()=>{
    fetch(url.value)
    .then((response) =>{
        return response.json();
    })
    .then((datas)=> {
        for(let data of datas){
            if(data.body.toLowerCase().indexOf(searching_word.value.toLowerCase()) > -1){
                users.push(data.name);
            }
        }

        if(users.length < people_number.value){
            alert("İstenilen sayıda kişi bulunamadı!")
        }
        else{
            for(let i=0 ; i<people_number.value ; i++){
                let number = Math.floor(Math.random() * users.length);
                if(numbers.indexOf(number) == -1){
                    numbers.push(number);
                }
                else{
                    i--;
                }
            }
    
            for(let i=0 ; i<numbers.length ; i++){
                winner_people.push(users[numbers[i]]);
            }
    
            for(let i=0 ; i<winner_people.length ; i++){
                let winner = `
                    <span id="winner_person_name"><b>${i+1}-</b>${winner_people[i]}</span>
                `;
    
                winner_list.insertAdjacentHTML("beforeend",winner);
            }

            numbers.splice(0,numbers.length);
            winner_people.splice(0,winner_people.length);
            main_menu.classList.add("hide");
            second_card.classList.remove("hide");
        }

        

    })
    .catch((err)=>{
        console.log(err);
    })

    

})

repeat_btn.addEventListener("click",()=>{
    winner_list.innerHTML = "";
    start_btn.click();
})

exit_btn.addEventListener("click",()=>{
    window.location.reload();
})








