<?php
header('Access-Control-Allow-Origin: *');
// header('Content-type: application/json');

$G_DBCONN = mysqli_connect("localhost", "jmillman_user", "H4Rq68uPhJ3XjEM", 'jmillman_tracker') or die("Couldn't open the database");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_POST["action"];
  $id = $_POST["id"];
  $value = $_POST["value"];
  $date = $_POST["date"];
} else {
  $action = $_GET["action"];
  $id = $_GET["id"];
  $value = $_GET["value"];
  $date = $_GET["date"];
}

switch ($action) {
    case 'insert':
    print('here');
      insertItem($value, $date);
      listItems();
      break;
    case 'delete':
      deleteItem($id);
      listItems();
      break;
    default:
      listItems();
      break;
}



function insertItem($value, $date) {
  global $G_DBCONN;
  $query = "INSERT INTO items (value, date) VALUES ('$value', '$date')";
  $result = mysqli_query($G_DBCONN, $query);
}

function deleteItem($id) {
  global $G_DBCONN;
  $query = "DELETE FROM items WHERE id='$id'";
  $result = mysqli_query($G_DBCONN, $query);
}

function listItems() {
  global $G_DBCONN;
  $query="select * from items";
  $result = mysqli_query($G_DBCONN,$query) or die("Couldn't execute getTable");
  $rows = array();
  while($r = mysqli_fetch_assoc($result)) {
      $rows[] = $r;
  }
  echo json_encode($rows);
}

?>
