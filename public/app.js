let urlResponse = document.querySelector(".response-container");
let burgerMenu = document.getElementById("burger-menu");
let navLinks = document.querySelectorAll(".nav-link");
let sideBar = document.querySelector(".nav-link-container")



burgerMenu.addEventListener("click", ()=>{
     sideBar.classList.toggle("show");
});
navLinks.forEach((link)=>{
     link.addEventListener("click", ()=>{
        sideBar.classList.remove("show");
     })
})

 function showUrl(){
    urlResponse.innerHTML = "";
    let urls = JSON.parse(localStorage.getItem('data')) || [];
    // let getUrls = JSON.stringify(urls)
     urls.forEach((url)=>{
        let urlContainer = `<div class="url-response"><p><a href = ${url.fullUrl}>${url.fullUrl}</a></p> 
             <div class="response">
             <p class = "short-url"> ${url.shorturl}</p>
             <button class = "copy">copy</button></div>
             </div>`
           
      urlResponse.innerHTML += urlContainer;
    })   
    

}

showUrl();

let urlform = document.getElementById("form-url");

urlform.addEventListener("submit", async (e)=>{
    let data = {
        fullUrl: document.querySelector('.input-url').value
    }
    e.preventDefault();
    let response = await fetch('/shortUrls',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    let url = await response.json();
    // fetch the urls from localstorage
    let urls = JSON.parse(localStorage.getItem('data')) || [];
    // update the urls with the server's response
    urls.push(url);
    // store urls in localstorage
    localStorage.setItem('data', JSON.stringify(urls));

showUrl();

})

// let urlText = document.querySelector(".short-url")

urlResponse.addEventListener("click", (e)=>{

    if(e.target.classList.contains("copy")){
        navigator.clipboard.writeText(e.target.previousElementSibling.textContent).then(()=>{
            console.log("copied to clipboard")
            }, ()=>{
            console.log("error")
            })

            e.target.textContent = "copied!";
    }
    
    
    })