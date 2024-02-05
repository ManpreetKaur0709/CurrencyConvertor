const Base_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdownS=document.querySelectorAll('.dropdown select');
let btn = document.querySelector('form button');
let fromCurr = document.querySelector('.from select');
let toCurr = document.querySelector('.to select');
let msg = document.querySelector('.msg');

window.onload = ()=>{
    updateExchangeRate();
}



for (let select of dropdownS){
    for (code in countryList){
        let option = document.createElement('option');
        option.value = code;
        option.text = code;
        
        if (select.name==="from" && code==="USD"){
            option.selected=true;
                    }else if(select.name==="to" && code==="INR"){
            option.selected=true;

    }
    select.appendChild(option);

}
select.addEventListener('change',(e)=>{
    updateFlag(e);
    });
}

const updateFlag = (e) => {
    let select = e.target;
    let currCode = select.value;
    let contryCode=countryList[select.value];
    let img = select.parentElement.querySelector('img');
    img.src = `https://flagsapi.com/${contryCode}/flat/64.png`;
}
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    updateExchangeRate();
    

});

updateExchangeRate = async()=>{
    let amount=document.querySelector('.amount input');
    let amtVal=amount.value;
    if (amtVal=== "" || amtVal < 1){
        amtVal=1;
        amount.value="1";

       
    }
    // apis dosent work in upper case letters
    const URL=`${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    
    
    let response =  await fetch(URL);
    
    let data = await response.json();
    
    let exchangeRate = data[toCurr.value.toLowerCase()];
    let totalExch = (exchangeRate*amtVal).toFixed(2);
    msg.innerText = `${amtVal}${fromCurr.value} = ${totalExch}${toCurr.value}`;
    

  

};
     