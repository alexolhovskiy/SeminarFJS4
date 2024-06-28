
//1

//""��������� ������ � ������������""
//���������� ������� getUserData, ������� ��������� ������������� ������������(ID) � �������� ��������� 
//� ���������� fetch ��� ��������� ������ � ������������ � �������� ID � ���������� �������.
//������� ������ ���������� ������, ������� ����������� � ������� � ������������ � ���� �������.
//���� ������������ � ��������� ID �� ������, ������ ������ ���� �������� � ��������������� ���������� �� ������.
//    ���������, � ������������������� ��������:
//getUserData ���������� fetch ��� ��������� ������ � ������������ � ���������� �������.
//���� ������ �������(� ����� 200), ������� ��������� ������ �� ������ � ������� response.json() � 
//���������� ������ � ������� � ������������.���� ������ ���������, ������� ��������� ������ � ���������� �� ������.

const loadData = async (url) => {
    console.log(url);
    var response = await fetch(url);
    if (response.ok) {
        var resp = await response.json();
    }

    console.log(resp);

    var data = new Array();
    resp.forEach((item) => {
        data.push({
            "name": item.name,
            "email": item.email,
            "username": item.username,
            "website": item.website
        });
    });
    var temp = { "data": data };
    console.log(data);


    response = await fetch("http://localhost/Seminar4/handler.php",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(temp)
        });
    
    if (response.ok) {
        resp = await response.text();
    }

    console.log(resp);

}

//loadData("https://jsonplaceholder.typicode.com/users");//������� ���������� ���� � ���� �������

async function getUserData(id, url) {
    const response = await fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ "id": id })
        });
    console.log(response.status);  
    if (response.ok) {
        var res = await response.json();
        if (res == 0) {// ��� ���������� id � ���� ��� ������ ������� - ������ ��� ������! �� ���� ��� �� ��������!
            console.log("user with " + id + " id does not exist");
            document.querySelector("body").insertAdjacentHTML('beforeEnd', `
                        <div class="wrapper2">
                        <p>user with ${id} id does not exist</p>
                        </div>`);
        } else {
            document.querySelector("body").insertAdjacentHTML('beforeEnd', `
                        <div class="wrapper">
                        <p>${res.name}</p>
                        <p>${res.username}</p>
                        <p>${res.website}</p>
                        <p>${res.email}</p></div>`);
        }  
    } else {
        console.log("user with "+id+" id does not exist");
    }

    console.log(res); 
}

//for (var i = 0; i < 45; i++) {
//    getUserData(i, "http://localhost/Seminar4/handler.php");
//}






//2

//""�������� ������ �� ������""
//���������� ������� saveUserData, ������� ��������� ������ � ������� � ������������ � �������� ��������� � ���������� 
//fetch ��� �������� ���� ������ �� ��������� ������ ��� ����������.������� ������ ���������� ������,
//    ������� �����������, ���� ������ ������� ����������, ��� ����������� � ������ ������.

//* ��������� *
//// ������ ������������� �������
//const user = {
//    name: 'John Smith',
//    age: 30,
//    email: 'john@example.com',
//};

//saveUserData(user)
//    .then(() => {
//        console.log('User data saved successfully');
//    })
//    .catch(error => {
//        console.log(error.message);
//    });

//saveUserData ���������� fetch ��� �������� ������ � ������������ �� ��������� ������ ��� ����������.��� ����������
//POST - ������ �� URL - ����� / users � ��������� ���� ����������� application / json � ����������� ������ � ������� � 
//������������ � JSON - ������ � ������� JSON.stringify().���� ������ �������(� ����� 200), ������� ��������� ������.
//���� ������ ���������, ������� ��������� ������ � ��������



const user = {
    "name": 'John Smith',
    "age": 30,
    "email": 'john@example.com'
};

async function saveUserData(user) {

    var temp = { "user": user };
    console.log(temp);
    const response = await fetch("http://localhost/Seminar4/handler.php",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(temp)
        });
    var res = await response.text();
    console.log(response.status);
    console.log(res);
    if (response.ok) {
        console.log('User data saved successfully');
    } else {
        console.log("Something wrong!");
    }
}



//saveUserData(user);



//3

//""��������� ����� �������� ����� �������� �����""
//�������� ������� changeStyleDelayed, ������� ��������� ������������� �������� � ����� ��������(� �������������)
//� �������� ����������.������� ������ �������� ����� �������� ����� ��������� �����.

// ������ ������������� �������
var x = 300, y = 200, x_f = true, y_f = true;
function change(el) {
    if (x_f) {
        if ((x + 200) < document.documentElement.clientWidth) {
            x += 10;
        } else {
            x_f = false;
        }
    } else {
        if (x >0) {
            x -= 10;
        } else {
            x_f = true;
        }
    }
    if (y_f) {
        if ((y + 200) < document.documentElement.clientHeight) {
            y += 10;
        } else {
            y_f = false;
        }
    } else {
        if (y > 0) {
            y -= 10;
        } else {
            y_f = true;
        }
    }
    console.log(x + " " + y + " " + document.documentElement.clientWidth + " " + document.documentElement.clientHeight);
    el.style.cssText = "top:"+y+"px;left:"+x+"px;background:green;";
}


function changeStyleDelayed(id, delay) {
    var el = document.getElementById('myElement');
    //setTimeout(change, delay, el); //� ��������� ���� ��������, �� � ���������� �����
    setInterval(change, delay, el);
}




changeStyleDelayed('myElement', 50);// ����� 2 ������� �������� ����� �������� � id 'myElement'"











