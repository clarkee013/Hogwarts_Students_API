var app = function(){
    var url = "http://hp-api.herokuapp.com/api/characters/students"
    makeRequest(url, requestComplete)
    
}

var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.addEventListener('load', callback);
    request.send();
};

var requestComplete = function(){
    if(this.status !== 200) return;
    var jsonString = this.responseText;
    var students = JSON.parse(jsonString);
    populateStudentDropDown(students);
    var houses = houseCount(students);
    pieChart(houses);
}

var populateStudentDropDown = function (students) {
    var select = document.getElementById('studentDropDown');
    students.forEach(function(student, index){
        var option = document.createElement('option');
        option.innerText = student.name;
        option.value = index;
        select.appendChild(option);
    })
    select.addEventListener("change", function(){
        var index = select.value;
        var student = students[index];
        displayStudentDetails(student);
    });

var displayStudentDetails = function(student) {
  var ul = document.getElementById("student-list");
  ul.innerHTML = '';
  var studentName = document.createElement("ul");
  studentName.innerText = "Name: " + student.name 
  var studentHouse = document.createElement("ul");
  studentHouse.innerText = "House: " + student.house 
  var picture = document.createElement("img");
  picture.src = student.image 
  picture.className = "photo";
  var actorName = document.createElement("ul");
  actorName.innerText = "Actor: " + student.actor;

  ul.appendChild(studentName);
  ul.appendChild(studentHouse);
  ul.appendChild(picture);
  ul.appendChild(actorName);
  }
}


var houseCount = function(student){
    var gryffindor = 0;
    var hufflepuff = 0;
    var ravenclaw = 0;
    var slytherin = 0;
    student.forEach(function(student){
    if (student.house === "Gryffindor"){
             gryffindor++
    } else {
        if (student.house === "Hufflepuff"){
            hufflepuff++
        } else {
            if (student.house === "Ravenclaw"){
                ravenclaw++
            } else {
                if (student.house === "Slytherin"){
                    slytherin++
                }
            }
        }
        
    }
    })
// console.log(gryffindor);
// console.log(hufflepuff);
// console.log(ravenclaw);
// console.log(slytherin);
 return {
      gryffindor: gryffindor,
      hufflepuff: hufflepuff,
      ravenclaw: ravenclaw,
      slytherin: slytherin
    }
}

var pieChart = function(houseCount){
    var container = document.getElementById('pie-chart');
    var chart = new Highcharts.Chart({
        chart: {
            type: 'pie',
            renderTo: container
        },
        title:{
            text: "Number of Students per House",
            // color: "#FF4136",
        },
        series: [
            {
                name: "Students",
                data: [
                    {
                        name: "Gryffindor",
                        y: houseCount.gryffindor,
                        color: "#8B0000"
                    },
                    {
                        name: "Hufflepuff",
                        y: houseCount.hufflepuff,
                        color: "#DAA520",
                    }, 
                    {
                        name: "Ravenclaw",
                        y: houseCount.ravenclaw,
                        color: "#1003bf"
                    },
                     {
                        name: "Slytherin",
                        y: houseCount.slytherin,
                        color: "#02720f"
                    },
                ]
        }]
    });
}



window.addEventListener('load', app);
