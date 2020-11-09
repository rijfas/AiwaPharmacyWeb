window.onload = function(){
    var xmlhttp = new XMLHttpRequest();
    var url = "products/products.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("products").removeChild(document.getElementById("preLoader"));
        var productData = JSON.parse(this.responseText);
        SetProductsView(productData);
    }else{
        document.getElementById("products").innerHTML = ' <div id="preLoader" class="preloader-wrapper big active"><div class="spinner-layer spinner-blue-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div>';
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

}

function SetProductsView(data){
    var productsView = document.getElementById("products");
    var finalData = {};
    data["categories"].forEach(element => {
        var i = 1;
        var row = document.createElement("div");
        row.classList.add('row');
        var innerRow = document.createElement("div");
        innerRow.classList.add('flex');
        var categorieName = document.createElement("h4");
        categorieName.className = 'center';
        categorieName.innerText = element['categorieName'];
        row.appendChild(categorieName);
        element['items'].forEach(item =>{
            if(i<=1){
                document.getElementById('autocomplete-input').placeholder += item['name'] + ',';
                i++;
            }
            finalData[item['name']] = null; 
            var outerColumn = document.createElement('div');
            outerColumn.id = setNameToId(item['name']);
            outerColumn.classList.add('col');
            outerColumn.classList.add('s12');
            outerColumn.classList.add('m4');
            outerColumn.classList.add('centerfix');
            var card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('z-depth-3');
            card.innerHTML =  '<div class="card-image"><img src="products/img/'+ item['image']+'" alt=""></div><div class="card-content"><span class="card-title bold">'+ item['name'] +'</span>'+ item['description'] +'</div><div class="card-action"><h4 class="red-text">AED '+ item['price'] +'</h4><a target="_blank" href="https://wa.me/971558525262?text=Hi!%20I%20Would%20Like%20To%20Purchase%20'+item['name'].replace(' ','%20')+'" class="btn blue">Order Now</a>';
            outerColumn.appendChild(card);
            innerRow.appendChild(outerColumn);
            row.appendChild(innerRow);
        });
        productsView.appendChild(row);
        var currentPlaceholder = document.getElementById('autocomplete-input').placeholder;
        document.getElementById('autocomplete-input').placeholder = currentPlaceholder.slice(0,-1) + '..etc';
        var elem = document.querySelectorAll('.autocomplete')[0];
        var instance = M.Autocomplete.getInstance(elem);
        instance.updateData(finalData);
    });
    
}

function setNameToId(name){
    return name.replace(' ','_');
}