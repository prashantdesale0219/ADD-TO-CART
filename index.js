
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

let productData =[]
function fetchData(){
    fetch("https://bk-json-server.onrender.com/pitches")
    .then(res=>res.json()).then(data=>{
        productData = data;
        SingleCard(data)
    })
    .catch(err=>console.log(err))
}
fetchData()

function SingleCard(data){
    let store = data.map(el=>Card(el.id,el.title,el.price,el.founder,el.category,el.image,el.description))
    mainSection.innerHTML =store.join('')
}


function Card(id,title,price,founder,category,image,description){
    return `
    <div class="card-list">
    <a href="description.html?title=${encodeURIComponent(title)} &price=${encodeURIComponent(price)} &founder= ${encodeURIComponent(founder)}  &category=${encodeURIComponent(category)} &image=${encodeURIComponent(image)} &description=${encodeURIComponent(description)}">
    <div class="card" data-id="${id}">
    <div class="card-img">
    <img src="${image}" alt="pitch" >
    </div>
    <div class="card-body">
    <h4 class="card-title">${title}</h4>
    <p class="card-founder">Founder: ${founder}</p>
    <p class="card-category">${category}</p>
    <p class="card-price">${price}</p>
    <a href="#" data-id="${id}" class="card-link">EDIT</a>
    <button class="card-button" data-id="${id}">DELETE</button>
    </div>
     </div>
    </div> `
}



// post
pitchCreateBtn.addEventListener("click",()=>{
    const title = pitchTitleInput.value;
    const founder = pitchfounderInput.value;
    const price = pitchPriceInput.value;
    const category = pitchCategoryInput.value;
    const image = pitchImageInput.value
    let data = {
        title,
        founder,
        price,
        category,
        image
    }

    fetch("https://bk-json-server.onrender.com/pitches",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
        }).then(res=>console.log(res))
        .then(data=>{
            fetchData()
        })
        .catch(err=>alert("DATA FAILED"))
        pitchTitleInput.value = ""
        pitchfounderInput.value = ""
        pitchPriceInput.value = ""
        pitchCategoryInput.value = ""
        pitchImageInput.value = ""
})


document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-button")){
        const id = e.target.dataset.id
        DeleteBtn(id)
    }
})

function DeleteBtn(id){
    fetch(`https://bk-json-server.onrender.com/pitches/${id}`,{
        method: "DELETE",
    }).then((res)=>console.log(res))
    .then((data)=>{
        fetchData()
    })
    .catch(err=>console.log(err))
}

filterFood.addEventListener("click",()=>{
    let FilterFoodData = productData.filter(el=>el.category === "Food")
    SingleCard(FilterFoodData)
})

filterElectronics.addEventListener("click",()=>{
    let FilterElectronicsData = productData.filter(el=>el.category === "Electronics")
    SingleCard(FilterElectronicsData)
})

filterPersonalCare.addEventListener("click",()=>{
    let FilterPersonalCareData = productData.filter(el=>el.category === "Personal Care")
    SingleCard(FilterPersonalCareData)
})

sortAtoZBtn.addEventListener("click",()=>{
    let SortAtoZData = productData.sort((a,b)=>a.price - b.price)
    SingleCard(SortAtoZData)
})

sortZtoABtn.addEventListener("click",()=>{
    let SortZtoAData = productData.sort((a,b)=>b.price - a.price)
    SingleCard(SortZtoAData)
})


document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-link")){
        const id = e.target.dataset.id
       PopulateForm(id)
    }
})

function PopulateForm(id){
    fetch(`https://bk-json-server.onrender.com/pitches/${id}`) 
    .then((res)=>res.json())
    .then((data)=>{
        updatePitchIdInput.value= data.id
        updatePitchImageInput.value= data.image
        updatePitchTitleInput.value= data.title
        updatePitchPriceInput.value= data.price
        updatePitchfounderInput.value= data.founder
        updatePitchCategoryInput.value =data.category
    })
    .catch((err)=>console.log(err))
}

updatePitchBtn.addEventListener("click",()=>{
    let updateData = {
        id: updatePitchIdInput.value,
        image: updatePitchImageInput.value,
        title: updatePitchTitleInput.value,
        price: updatePitchPriceInput.value,
        founder: updatePitchfounderInput.value,
        category: updatePitchCategoryInput.value
    }
    fetch(`https://bk-json-server.onrender.com/pitches/${updateData.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(updateData)
    }).then((res)=>res.json())
    .then((data)=>{
        fetchData()
    })
    .catch((err)=>console.log(err))
    updatePitchIdInput.value=""
    updatePitchImageInput.value=""
    updatePitchTitleInput.value=""
    updatePitchPriceInput.value=""
    updatePitchfounderInput.value=""
    updatePitchCategoryInput.value=""
   })

   updatePricePitchPriceButton.addEventListener("click",()=>{
    let updateData = {
        id: updatePricePitchId.value,
        price: updatePricePitchPrice.value
    }
    fetch(`https://bk-json-server.onrender.com/pitches/${updateData.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(updateData)
    }).then((res)=>res.json())
    .then((data)=>{
        fetchData()
    })
    .catch((err)=>console.log(err))
    updatePricePitchId.value=""
    updatePricePitchPrice.value=""
    })


    searchByButton.addEventListener("click",()=>{
        let searchBy = searchBySelect.value
        let searchValue = searchByInput.value
        if(searchBy === "title"){
            fetch(`https://bk-json-server.onrender.com/pitches?title=${searchValue}`)
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data)
            })
        }
    })