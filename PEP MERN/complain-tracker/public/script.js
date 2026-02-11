async function submit(){
    let title=document.getElementById("title").value;
    let name=document.getElementById("name").value;
    let phone=document.getElementById("phone").value;
    let description=document.getElementById("desc").value;
    let response=await fetch("/complaint",{
         method:"POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify({
         name:name,
         phone:phone,
         title:title,
         description:description
        })
  });
  load();
}

async function load(){
    let response=await fetch("/complaint")
    let complaints=await response.json();
    let list=document.getElementById("list");
    list.innerHTML="";
    let isAdmin=window.location.pathname.includes("admin");
    for(let i=0;i<complaints.length;i++){
        let c=complaints[i];
        let list1=document.createElement("div");
        let buttons="";
        if(isAdmin){
           buttons="<button onclick=\"update("+c.id+",'resolved')\">Resolve</button> &nbsp; <button onclick=\"update("+c.id+",'rejected')\">Reject</button> &nbsp; <button onclick=\"deleteComplaint("+c.id+")\">Delete</button>";
        }
        list1.innerHTML =
        "ID:"+c.id + "<br>" +
        "Name:" + c.name + "<br>" +
        "Phone:" + c.phone + "<br>" +
        "Title:" + c.title + "<br>" +
        "Description:" + c.description + "<br>" +
        "Status:" + c.status +
        buttons + "<hr style='margin:8px 0;'>";


        list.appendChild(list1);
    }

};


async function update(id,status){
    await fetch("/complaint/"+id,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({status:status})
    });
  load();
};


async function deleteComplaint(id){
    await fetch("/complaint/"+id,{
        method:"DELETE"
    });
  load();
}

load();