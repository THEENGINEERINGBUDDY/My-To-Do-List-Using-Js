var userData=[];
var taskEl=document.getElementById("task");
var add=document.getElementById("add");
var update=document.getElementById("update");

add.addEventListener("click",()=>{
    
    var taskEl=document.getElementById("task").value;  //Avoid to save empty data 
    if(taskEl==""){
        
    }
    else{
        insertdata(); 
    }
    
    
    taskEl.value=""; 
    
    
    
    
});
if(localStorage.getItem("userData") !=null){              //First time data will null
userData=JSON.parse(localStorage.getItem("userData"));    //change local storage data to array ,bcz after refresh the data was disappear
}

function insertdata(){
        userData.push({
            task:taskEl.value
        });
        var userString =JSON.stringify(userData);       //In local storage data will store in String formate
        localStorage.setItem("userData" , userString);   //key : data
        
}

//data display

var tableData=document.getElementById("table-data1");

const getDataFromLocal=()=>{
    tableData.innerHTML="";
    userData.forEach((data,index)=>{
        tableData.innerHTML+=`
        <tr index='${index}'>
            <td><input class="checkbox1"type="checkbox"></td>
            <td>${data.task}</td>
            <td>
            <button class="action edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="action del-btn"><i class="fa-solid fa-trash"></i></button>
        
            </td>
        </tr>
        `;
        
    });

    // delete 

    var i;
    var allDelBtn=document.querySelectorAll(".del-btn");
    for(i=0;i<allDelBtn.length;i++){
        allDelBtn[i].onclick=function(){
            var tr=this.parentElement.parentElement;
           var id=tr.getAttribute("index");
           swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                userData.splice(id,1);
                localStorage.setItem("userData" , JSON.stringify(userData));
                tr.remove();
              swal("Poof! Your data has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your data is safe!");
            }
          });
           
        }
    }

    //edit
    
    var allEdit = document.querySelectorAll(".edit-btn");
    for(i=0;i<allEdit.length;i++){
        allEdit[i].onclick=function(){
            add.disabled=true;
            update.disabled=false;
            var tr = this.parentElement.parentElement;
            var td=tr.getElementsByTagName("TD");
            var index=tr.getAttribute("index");
            var task2 = td[1].innerHTML;
            taskEl.value=userData[index].task;
            update.onclick=function(e){
                    userData[index]={
                    task:taskEl.value
                }
                localStorage.setItem("userData" , JSON.stringify(userData));
            }
            
        }
        
    }


    
}
getDataFromLocal()