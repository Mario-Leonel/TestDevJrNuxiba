const d=document,
$table=d.querySelector('table'),
$deta=d.querySelector('.detalles'),
$seComen=d.querySelector('.coment'),
$seTask=d.querySelector('.task'),
$ver=d.querySelector('.ver'),
$title=d.querySelector('title'),
$template=d.getElementById('verUsuarios').content,
$templDe=d.getElementById('templDetalles').content,
$templComentario=d.getElementById('templComentario').content,
$templTask=d.getElementById('templTask').content,
$fragment=d.createDocumentFragment();

fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {
        json.forEach(element => {
            $template.querySelector(".nombre").textContent= element.name;
            $template.querySelector(".ver").setAttribute('id', element.id);

            let $clone =d.importNode($template,true);
            $fragment.appendChild($clone);

        });
        $table.querySelector("tbody").appendChild($fragment);        
    });

    /////// //////
    d.addEventListener('click',async e=>{
       
       if(e.target.matches(".ver")){
            
           fetch('https://jsonplaceholder.typicode.com/users/'+e.target.id)
           .then((response) => response.json())
           .then((json) =>{
              d.querySelector(".name").textContent= "Name:"+json.name;
              d.querySelector(".username").textContent="User name:"+ json.username;
              d.querySelector(".email").textContent= "Email:"+json.email;
              d.querySelector(".street").textContent="Street"+ json.address.street;
              d.querySelector(".suite").textContent= "Suite:"+json.address.suite;
              d.querySelector(".city").textContent= "City:"+json.address.city;
              d.querySelector(".phone").textContent= "Phone:"+json.phone;
              d.querySelector(".website").textContent="Web site:"+ json.website;
              d.querySelector(".posts").setAttribute('id', json.id);
              d.querySelector(".tod").setAttribute('id', json.id);      
           });
           document.querySelector('.coment').innerHTML = '<h2>Post Y Comentarios</h2>';
           document.querySelector('.task').innerHTML = '<h2>Tareas</h2>';
       }
   });
   /////////// OBETENER POSTS Y COMENTARIOS//////////////
    d.addEventListener('click',async e=>{
       
        if(e.target.matches(".posts")){
            
            fetch('https://jsonplaceholder.typicode.com/users/'+e.target.id+'/posts')
            .then((response) => response.json())
            .then((json) =>{
                json.forEach(element => {
                     $templComentario.querySelector(".titlePost").textContent= "title:"+element.title;
                     $templComentario.querySelector(".bodyPost").textContent= "body:"+element.body;
                     let $clone =d.importNode($templComentario,true);
                    $fragment.appendChild($clone);

                    console.log(element.id);
                    fetch('https://jsonplaceholder.typicode.com/post/'+element.id+'/comments')
                    .then((response) => response.json())
                    .then((json) =>{
                        json.forEach(element => {
                            $templComentario.querySelector(".bod").textContent= "Cometario: "+ element.body;
                            $templComentario.querySelector(".com").textContent="Nombre: "+ element.name;
                            $templComentario.querySelector(".em").textContent= "Email: "+element.email;
                            

                        let $clone =d.importNode($templComentario,true);
                           $fragment.appendChild($clone);
       
                        });   
                        $seComen.querySelector("h2").appendChild($fragment);       
                     });
                });  
                $seComen.querySelector("h2").appendChild($fragment);          
            });
        }
    });

    //////////////////////
    d.addEventListener('click',async e=>{
       
       if(e.target.matches(".tod")){
           
           fetch('https://jsonplaceholder.typicode.com/users/'+e.target.id+'/todos')
           .then((response) => response.json())
           .then((json) =>{
            json.forEach(element => {
                $templTask.querySelector(".userId").textContent="Id: "+ element.userId;
                     $templTask.querySelector(".titleTask").textContent="titulo: "+ element.title;
                     $templTask.querySelector(".completed").textContent= "Terminda: "+element.completed;
                     let $clone =d.importNode($templTask,true);
                    $fragment.appendChild($clone);
                    console.log(element.id);
            });
            $seTask.querySelector("h2").appendChild($fragment);
        
           }          
        );
       }
   });

   d.addEventListener('submit',async e=>{
       
    if(e.target.matches(".neTask")){
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
              title: 'ejemplo',
              completed: 'true',
              userId: e.target.id,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
});