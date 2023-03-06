let catArray = new Array();
let dateArray = new Array();


function start(){
    const btnGetCatInfo = document.getElementById("btn_get_cat_info");
    btnGetCatInfo.onclick = handleButtonClick;

    loadCats();
}


function loadCats(){
    const catList = document.getElementById('cat_list');
    let catName;
    let newOption;

    fetch('https://api.thecatapi.com/v1/breeds?api_key=live_8XUtiUBwi3YTSueKCgsJaxTZSLf26UDf1ouPPZYmfmjvfCpDEN5lwqoZOLeMfhFr')
        .then((result)=>result.json())
        .then((data) => {
            data.forEach((cat) => {
                newOption = document.createElement('option');
                newOption.value = cat.name;
                newOption.text = cat.name;
                catName = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);

                catList.appendChild(newOption);
                catArray.push(cat);
            });
        })

        fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/${catName}/daily/20220901/20221001`)
            .then((result) => result.json())
            .then((data) => {
                let dataArray = data.items;
                dataArray.forEach((date) => {
                    let year = date.timestamp.slice(0,4);
                    let month = date.timestamp.slice(4,6);
                    let day = date.timestamp.slice(6,8);
                    dateArray.push(`${year}-${month}-${day}: &nbsp&nbsp${date.views} <br>`);

                })
            })
}


function handleButtonClick(){
    const catList = document.getElementById("cat_list");
    const index = catList.selectedIndex;

    const outputSpan = document.getElementById("output");

    let output = `<h2>${catArray[index].name}</h2>`;
    output += `<img src = "${catArray[index].image.url}"><br>`
    output = output +  `<h3>Description</h3><p>${catArray[index].description}</p>`;
    output += `<h3>Wickipedia</h3><p><a target ="_blank" href="${catArray[index].wikipedia_url}">${catArray[index].wikipedia_url}</a>`
    output += `<h3>Views</h3><br>`
    
    for(let i = 0; i< dateArray.length; i++){
       output += `<p>${dateArray[i]}</p>`; 
       console.log(dateArray[i]);
    }
    outputSpan.innerHTML = output;
}


window.onload = start;