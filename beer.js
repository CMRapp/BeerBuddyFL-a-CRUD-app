/* 
    Copyright (c) 2023 Christian M Rapp | CMR Web Studio
    Author: Christian M Rapp
    Program: beer.js
    Description: Provides required JavaScript/JQuery to provide CRUD operations for BeerBuddyFL Website
*/

const URL_ENDPOINT = 'http://localhost:3000/beerList';

//GET the current information from 'API' database and populate table
$.get(URL_ENDPOINT).then(data => {
    data.map(beer => {
        $('tbody').append(
            $(`
            <tr>
                <td>${beer.beerName}</td>
                <td>${beer.brewery}</td>
                <td>${beer.abv}</td>
                <td>${beer.ibu}</td>
                <td>${beer.style}</td> 
                <td class="text-center"><button title="Update This Beer" onclick="showModal(true, ${beer.id})"><i class="fa-sharp fa-solid fa-refresh"></i></button></td>               
                <td class="text-center"><button title="Delete This Beer" onclick="deleteBeer(${beer.id})"><i class="fa-sharp fa-solid fa-ban"></i></button></td>
            </tr>    
            `)
        )
    })
})

//display modal & check to see if modal is being shown for an update. If update, populate the fields from selected beer
function showModal(update, id) {
    
    $("#beerDataModal").modal('show');
    if (!update) {
        $("#modalTitle").html('Submit A New Florida Beer');
        $("#submitBeer").click(function(e) {             //call the addNewBeer function. 
            e.preventDefault();                          //use preventDefault() to prevent modal from closing
            $("#submitBeer").attr("onclick", addNewBeer());
        })
        
    } else {
        //populate modal form with existing data
        $.get(`${URL_ENDPOINT}/${id}`, (data) => {
            $("#modalTitle").html(`Update ${data.beerName}`);   //change title of modal
            $("#beer-name").val(data.beerName);
            $("#brewery").val(data.brewery);
            $("#beer-abv").val(data.abv);
            $("#beer-ibu").val(data.ibu);
            $("#beer-style").val(data.style);
        });
        
        $("#submitBeer").addClass("disabled");                  //deactivate the submit beer button
        $("#updateCurrentBeer").removeClass("disabled");        //activate update beer button
        $("#updateCurrentBeer").click(function(e) {             //call the updateBeer function. use preventDefault() to prevent modal from closing
            e.preventDefault();
            $("#updateCurrentBeer").attr("onclick", updateBeer(id));
        })
        
    } 
}//end showModal

//clear modal form when clicking cancel button on modal
function clearForm() {
    $("#beer-name").val("");
    $("#brewery").val("");
    $("#beer-abv").val("");
    $("#beer-ibu").val("");
    $("#beer-style").val("");
}

//PUT (update) a selected beer
function updateBeer(id){
    
    $.ajax(`${URL_ENDPOINT}/${id}`, {
        type: 'PUT',
        data: {
            beerName : $('#beer-name').val(),
            brewery : $('#brewery').val(),
            abv: $('#beer-abv').val(),
            ibu: $('#beer-ibu').val(),
            style:$('#beer-style').val(),
        }
    })
}

//DELETE a selected beer
function deleteBeer(id) {
    $.ajax(`${URL_ENDPOINT}/${id}`, {
        type: 'DELETE'
    })
}

//POST (add) a new beer
function addNewBeer() {
    $.post(URL_ENDPOINT, {
            beerName : $('#beer-name').val(),
            brewery : $('#brewery').val(),
            abv: $('#beer-abv').val(),
            ibu: $('#beer-ibu').val(),
            style:$('#beer-style').val(),
        })
}