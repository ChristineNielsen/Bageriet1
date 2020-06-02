const express = require('express');
const app = express();
const fetch = require('node-fetch');

//Sætter view engine til ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

//Definerer root mappe til css referencer m.m.
app.use(express.static(__dirname + '/'));

//Route til forside
app.get("/", async (req, res) => {
        // Venter på fetch resultat og assigner det til konstanten requestToApi
        const requestToApi = await fetch('https://api.mediehuset.net/bakeonline/products');

        // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
        const apiResponse = await requestToApi.json();  
        console.log(apiResponse)  

        return res.render("pages/index", {
           produkter: apiResponse
          });
            
});

app.get("/kategorier", async (req, res) => {
        // Venter på fetch resultat og assigner det til konstanten requestToApi

        const requestToApi = await fetch('https://api.mediehuset.net/bakeonline/categories');
        const requestToApi2 = await fetch(`https://api.mediehuset.net/bakeonline/categories/1`);

        // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
        const apiResponse = await requestToApi.json();  
        console.log(apiResponse)  
        const apiResponse2 = await requestToApi2.json();  
        console.log(apiResponse2.products) 

        return res.render("pages/kategorier", {
           kategorier: apiResponse,
           produkter: apiResponse2
          });
});

app.get("/kategori/:id", async (req, res) => {
    let id = req.params.id
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi = await fetch('https://api.mediehuset.net/bakeonline/categories');
    const requestToApi2 = await fetch(`https://api.mediehuset.net/bakeonline/categories/${id}`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse = await requestToApi.json();  
    console.log(apiResponse)  
    const apiResponse2 = await requestToApi2.json();  
    console.log(apiResponse2.products) 

    return res.render("pages/kategori", {
       kategorier: apiResponse,
       produkter: apiResponse2
      });
});

app.get("/produkt-side/:id", async (req, res) => {
    let id = req.params.id
    // Venter på fetch resultat og assigner det til konstanten requestToApi
    const requestToApi2 = await fetch(`https://api.mediehuset.net/bakeonline/products/${id}`);

    // Konverterer fetch resultat til json format og assigner det til konstanten apiResponse
    const apiResponse2 = await requestToApi2.json();  
    console.log(apiResponse2) 

    return res.render("pages/produkt-side", {
       produkt: apiResponse2,
       ingredienser: apiResponse2.ingredients
      });
});

app.get("/kontakt", (req, res) => {
    res.render('pages/kontakt');

});

app.get("/login", (req, res) => {
    res.render('pages/login');

});


//404 meddelelse
app.use(function(req, res, next) {
    res.status(404).send(
        res.render('pages/404')   
    );
});

//Angiver port der skal lyttes på
app.listen(3000, () => {
    console.log("Express server kører...");
});
