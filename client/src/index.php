<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <title>StechsApp</title>
  </head>
  <body>
    <nav class="navbar navbar-dark bg-primary">
      <a class="navbar-brand" href="#">StechsApp</a>
    </nav>
    <div class="container">
      <h1>Modelos de cablemodem</h1>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="vendor">Fabricante</label>
        </div>
        <select class="custom-select" id="vendor">
          <option selected value="0">Seleccione Fabricante</option>
          <option value="Cisco">Cisco</option>
          <option value="Motorola Corporation">Motorola Corporation</option>
          <option value="Arris Interactive, L.L.C.">Arris Interactive, L.L.C.</option>
          <option value="Netwave">Netwave</option>
          <option value="S-A">S-A</option>
        </select>
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button" id="vendor_refresh">Refrescar</button>
        </div>
      </div>
      <div class="table-responsive-md">
        <table class="table table-striped" id="models">
          <thead>
            <tr>
              <th>Nº</th>
              <th>Nombre</th>
              <th>Soft. Version</th>
              <th>Mac</th>
              <th>Accion</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
    <script type="text/javascript">
      var apiUrl = <?php echo $_SERVER["API_URL"]; ?>;
    </script>
    <script type="text/javascript" src="/js/app.js"></script>
  </body>
</html>