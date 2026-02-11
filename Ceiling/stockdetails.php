<?php
include('config.php');
include('dblayer.php');

// Get JSON input
$jsondata = file_get_contents('php://input');
$data = json_decode($jsondata, true);
$action=$data["load"] ?? "";
$stock=$data["stock"]??"";
$item=$data["item"]??"";
$category=$data["category"]??"";
$quantity=$data["quantity"]??"";
$name=$data["name"]??"";
$number=$data["number"]??"";
$sp=$data["sp"]??"";
$date=$data["date"]??"";
$sales=$data["sales"]??"";
$time=$data["time"]??"";
$bill=$data["bill"]??"";
$description=$data["description"]??"";
$unit=$data["unit"]??"";
$totalprice=$data["totalprice"]??"";

if($action=="fetch")
{
    getall($conn);
}
elseif($action=="submit"){
    submitall($conn);
}
elseif($action=="bill"){
    submit($conn);
}

function getall($conn)
{
    $sql="SELECT `stockid`, `itemname`, `category`, `quantity`, `suppliername`, `suppliercontact`, `purchaseprice`, `salesprice`, `datereceived`, `time`, `paymode` FROM `stockdetails`
    ";
     $result = getData($conn, $sql);
     $jsonresponse = array('code' => '200', 'status' => 'success', 'data' => $result);

    echo json_encode($jsonresponse);
}



function submitall($conn)
{
    global $item,$stock,$category,$quantity,$name,$number,$sp,$date,$sales,$time;
    $insertquery = "INSERT INTO `stockdetails`(`stockid`, `itemname`, `category`, `quantity`, `suppliername`, `suppliercontact`, `purchaseprice`, `salesprice`, `datereceived`, `time`) VALUES ('$stock','$item','$category','$quantity','$name','$number','$sales','$sp','$date','$time')";
    $resultquery = setData($conn, $insertquery);

    if($resultquery == "Record created"){
        $jsonresponse = array('code' => '200', 'status' => 'success', 'message' => "Record Inserted");
        echo json_encode($jsonresponse);
    }
}
function submit($conn)
{
    global $name,$number,$bill,$date,$sales,$item,$quantity,$unit,$totalprice;
    $insertquery = "INSERT INTO `receipts`(`customername`, `contact`, `billnumber`, `datetime`, `item`, `quantity`, `unitprice`, `totalprice`) VALUES ('$name','$number','$bill','$date','$item','$quantity','$unit','$totalprice')";
    $resultquery = setData($conn, $insertquery);

    if($resultquery == "Record created"){
        $jsonresponse = array('code' => '200', 'status' => 'success', 'message' => "Record Inserted");
        echo json_encode($jsonresponse);
    }
}

$conn->close()
?>
