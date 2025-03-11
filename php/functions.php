<?php
function getDynamicContent($table)
{
    global $conn;
    $query = "SELECT * FROM $table";
    $result = $conn->query($query);
    return $result;
}
?>