window.onload = function(){
    var xmlhttp = new XMLHttpRequest();
    var url = "products/products.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var productData = JSON.parse(this.responseText);
        SetProductsView(productData);
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
        var categorieName = document.createElement("h4");
        categorieName.className = 'center';
        categorieName.innerText = element['categorieName'];
        row.appendChild(categorieName);
        element['items'].forEach(item =>{
            if(i<=3){
                document.getElementById('autocomplete-input').placeholder += item['name'] + ',';
                i++;
            }
            finalData[item['name']] = null; 
            var outerColumn = document.createElement('div');
            outerColumn.id = setNameToId(item['name']);
            outerColumn.classList.add('col');
            outerColumn.classList.add('s12');
            outerColumn.classList.add('m4')
            var card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('z-depth-3');
            card.innerHTML =  '<div class="card-image"><img src="products/img/'+ item['image']+'" alt=""></div><div class="card-content"><span class="card-title bold">'+ item['name'] +'</span>'+ item['description'] +'</div><div class="card-action"><h4 class="red-text">AED '+ item['price'] +'</h4><a href="#" class="btn blue">Order Now</a>';
            outerColumn.appendChild(card);
            row.appendChild(outerColumn);
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