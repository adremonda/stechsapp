if(apiUrl == null)
    var apiUrl = 'http://localhost:8000';
$( "#vendor" ).change(function() {
  vendor = $( this ).val();
  if (vendor != 0) {
    getCablemodems(vendor);
  }
});

$( "#vendor_refresh" ).click(function() {
  vendor = $( '#vendor' ).val();
  if (vendor != 0) {
    getCablemodems(vendor);
  }
});

getCablemodems = (vendor) => {
  $.ajax( apiUrl + '/cablemodems?vendor=' + vendor )
  .done(function(response) {
    console.log(response);
    models = response.data;
    clearTable();
    $.each(models, makeTable);
  })
  .fail(function() {
    alert( "error" );
  })
};

clearTable = () => {
  $("#models > tr").remove();
};

makeTable = (i, model) => {
  var btn= $('<input class="btn btn-primary" type="button" value="guardar en json" title="Accion para guardar el modelo seleccionado dentro de models.json"/>')
  btn.click(function() {
    $.post(apiUrl + '/cablemodems', model, () => {
      console.log('success');
      alert('modelo guardado en models.json')
    })
  })
  var $tr = $('<tr>').append(
    $('<td>').text(i+1),
    $('<td>').text(model.name),
    $('<td>').text(model.soft),
    $('<td>').text(model.mac),
    $('<td>').append(btn)
  ).appendTo('#models');
};