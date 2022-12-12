// AIzaSyCXGOAuE3uBNKCZTBitUyfWLCE_FQrGoJE
// AIzaSyBXqe1FcaE-m9f8SYt4rvj1zMKYP-GwIVE
let searchresults = document.getElementById("searchresults");
let item;
let getdata = async () => {
    try {
        let query = document.getElementById("query").value;

        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=AIzaSyCiKwAbHpNxjt_oPvfaXlWPbK1W4CSuUOQ&part=snippet&maxResults=20`);
        let data = await res.json();
        item=data.items;
        console.log("data: ", item);
      
        display(item);

    }
    catch (err) {
        console.log("errror:", err);
    }
}


let data = async () => {
    try {
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=most popular videos in India&key=AIzaSyCiKwAbHpNxjt_oPvfaXlWPbK1W4CSuUOQ&part=snippet&maxResults=20`);
        let { items } = await res.json();
        console.log("data: ", items);
      
        display(items);
    }
    catch (err) {
        console.log("errror:", err);
    }
}
data();

let display = (x) => {
    searchresults.innerHTML = null;
    x.forEach(({ snippet: { title }, snippet:{channelTitle},snippet: { thumbnails: { medium: { url } } }, id: { videoId } }) => {
        let div = document.createElement("div");
        let query = document.getElementById("query").value;
        let datanxt = {
            snippet: title,
            id: videoId,
            searchname:query,
        }
        div.onclick = () => {
            localStorage.setItem("clicked vdo", JSON.stringify(datanxt));
            window.location.href = "youtube2.html";
        }
       



        let vdo = document.createElement("iframe");
        vdo.width = "350px";
        vdo.height = "200px";
        vdo.allow = 'fullscreen';
        vdo.src = url;
        vdo.onclick = () => {
            localStorage.setItem("clicked vdo", JSON.stringify(datanxt));
            window.location.href = "youtube2.html";
        }


        let heading = document.createElement("h3");
        heading.innerText = title;
        heading.style.alignContent = "left";

        let chtitle = document.createElement("h3");
        chtitle.innerText = channelTitle;
       chtitle.style.alignContent = "left";
       chtitle.style.color="orange";

        div.append(vdo,heading,chtitle);
        searchresults.append(div);



    })
}


function sort() {
    let sortname=document.getElementById("sortname").value;
    console.log("datasort",item,sortname);
    if(sortname===""){
        display(item)
    }else{
        let data = item.filter(function (el) {
            return sortname===el.snippet.channelTitle;
          
        })
        display(data);

    }
   
}