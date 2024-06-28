<?php 
    header("Content-Type: application/json; charset=UTF-8");
    $content = trim(file_get_contents("php://input"));
   

    $obj=json_decode($content,false);
    
    if(isset($obj->data)){
        $db = new mysqli("localhost", "root", "root", "test", 3306);
        $temp=0;
        foreach ($obj->data as $el){
            $stmt = $db->prepare("INSERT INTO seminar4 (name,email,username,website,age) VALUES (?,?,?,?,?)");
            $stmt->bind_param("ssssi", $el->name,$el->email,$el->username,$el->website,$temp);
            $stmt->execute();
            echo $el->name." ".$el->email." ".$el->website." ".$el->username."\n";
        }
        
        $stmt->close();
        $db->close();
        echo "done";
    }
    
    if(isset($obj->id)){
        $db = new mysqli("localhost", "root", "root", "test", 3306);
       
        $stmt = $db->prepare("SELECT * FROM seminar4 WHERE id=?");
        $stmt->bind_param("i", $obj->id);
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        $db->close();
        if($result->num_rows>0){
            $row=$result->fetch_assoc();
            echo json_encode($row);
        }else{
            echo 0;
        }

    }
    
    if(isset($obj->user)){
        $db = new mysqli("localhost", "root", "root", "test", 3306);
        $el=$obj->user;
        $temp="";
        $stmt = $db->prepare("INSERT INTO seminar4 (name,email,username,website,age) VALUES (?,?,?,?,?)");
        $stmt->bind_param("ssssi", $el->name,$el->email,$temp,$temp,$el->age);
        $stmt->execute();
        
        $stmt->close();
        $db->close();
        
        echo $el->name." ".$el->email." ".$el->age;
        //echo "done";
    }

?>