$(document).ready(function () {

const domNode = document.getElementById('root');

let pcount=0;
let count=0;
let parr=[];
$(domNode).empty();

function  timemsg(){

fetch("/getmsg").then((response)=>{return response.json();}).then((data)=> {
 if (data.sender !="Nil"){   
    console.log(data);
    count+=1;
    let cht = document.createElement("div");
    $(cht).attr({class:"chtmsg",id:count});
    let bubble = document.createElement("div");
    $(bubble).attr({class:"bub"});
    $(cht).append(bubble);
    let sen = document.createElement("h1");
    let content = document.createElement("p");
    $(content).text(data.msg);
    $(sen).text(data.sender);
    
    $(cht).append(sen);
    $(cht).append(content);
    $(domNode).append(cht);
        // " <div class="chtmsg"><div class="bub"></div><h1>"+data.sender+"</h1><p>"+data.msg+"</p></div>");
   
}


});

fetch("/getcount").then((response)=>{return response.json();}).then((data)=>
{ $(".grppeer .info").text("Group :"+data.grpname +"| Peers Connected:"+data.count)
         console.log(data);
         if (parr.length==0)
       {      
         for(let i=0;i< (data.list).length;i++)
         {  parr[i]=data.list[i]; 
            let peer = document.createElement("h1");
            $(peer).text("🟢"+(data.list[i]).substring((data.list[i]).length-5,(data.list[i]).length-1));
             $(".grppeer .view-peer").append(peer);


         }
        }
        else{

              for(let i=0;i<(data.list).length;i++)
              { let flag=0
                let temp= data.list[i];
                for(let j=0;j<parr.length;j++)
                {
                    if (temp==parr[j]){
                        flag=1;
                        continue;
                    }
                   
                    }
                    if(flag==0){
                      parr.push(temp); 
                      let peer = document.createElement("h1");
                      $(peer).text("🟢"+temp.substring(temp.length-5,temp.length-1));
                      $(".grppeer .view-peer").append(peer);
                }
              }

        }
        
});

}

setInterval(()=>{timemsg()},1000);

});