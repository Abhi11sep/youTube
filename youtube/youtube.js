// AIzaSyCXGOAuE3uBNKCZTBitUyfWLCE_FQrGoJE
// AIzaSyBXqe1FcaE-m9f8SYt4rvj1zMKYP-GwIVE
let searchresults = document.getElementById("searchresults");
let item;
let getdata = async () => {
    try {
        let query = document.getElementById("query").value;

        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=AIzaSyCiKwAbHpNxjt_oPvfaXlWPbK1W4CSuUOQ&part=snippet&maxResults=20`);
        let data = await res.json();
        item = data.items;
        console.log("data: ", item);
        localStorage.setItem("all vdo", JSON.stringify(item));
        display(item);

    }
    catch (err) {
        console.log("errror:", err);
    }
}


let display = (videos) => {

    searchresults.innerHTML = "";

    videos.forEach((item) => {

        const title = item.snippet.title;
        const channelTitle = item.snippet.channelTitle;
        const thumbnail = item.snippet.thumbnails.medium.url;

        let div = document.createElement("div");

        div.onclick = () => {

            // Current playing video
            localStorage.setItem("clicked vdo", JSON.stringify(item));

            // Get existing history
            let history = JSON.parse(localStorage.getItem("history")) || [];

            // Remove the video if it already exists
            history = history.filter(video => {
                return video.id.videoId !== item.id.videoId;
            });

            // Add newest video at the beginning
            history.unshift(item);

            // Optional: Keep only the latest 20 videos
            if (history.length > 20) {
                history.pop();
            }

            // Save history
            localStorage.setItem("history", JSON.stringify(history));

            // Redirect
            window.location.href = "youtube2.html";
        };

        let img = document.createElement("img");
        img.src = thumbnail;
        img.style.width = "100%";
        img.style.height = '220px'
        img.style.borderRadius = "12px";

        let heading = document.createElement("h3");
        heading.innerText = title;

        let channel = document.createElement("p");
        channel.innerText = channelTitle;
        channel.style.color = "#aaa";

        div.append(img, heading, channel);

        searchresults.append(div);

    });
};

let data = async () => {
    try {
        let a = 'latest'
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${a}&key=AIzaSyCiKwAbHpNxjt_oPvfaXlWPbK1W4CSuUOQ&part=snippet&maxResults=20`);
        let { items } = await res.json();
        console.log("data: ", items);
        localStorage.setItem("all vdo", JSON.stringify(items));
        display(items);
        // let items = JSON.parse(localStorage.getItem("all vdo")) || [];
        // display(items)
    }
    catch (err) {
        console.log("errror:", err);
    }
}
data();



const popup = document.getElementById("popup");
const loginBtn = document.getElementById("loginBtn");

loginBtn.onclick = () => {

    popup.style.display = "flex";

}

closeBtn.onclick = () => {

    popup.style.display = "none";

}

signupBtn.onclick = function () {
    console.log('signin clicked')


    document.getElementById("signupForm").onsubmit = function (e) {

        e.preventDefault();

        const passwordInput = document.getElementById("password");
        const usernameInput = document.getElementById("username");

        const name = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        localStorage.setItem("username", name);

        popup.style.display = "none";

        showUser();

    }

}
function showUser() {

    const user = localStorage.getItem("username");

    if (user) {

        const first = user.charAt(0).toUpperCase();

        userSection.innerHTML = `
            <div id="profile">
                <div id="avatar">${first}</div>
                <span class="welcomeText">Welcome ${user}</span>
            </div>
        `;

    } else {

        userSection.innerHTML = `
            <button id="loginBtn">

                <span class="loginIcon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="3"
                            stroke="#3ea6ff"
                            stroke-width="2"/>

                        <path
                            d="M5 20C5 16.5 8 14.5 12 14.5C16 14.5 19 16.5 19 20"
                            stroke="#3ea6ff"
                            stroke-width="2"
                            stroke-linecap="round"/>
                    </svg>
                </span>

                <span class="loginText">
                    Sign In / Sign Up
                </span>

            </button>
        `;

        document.getElementById("loginBtn").onclick = () => {
            popup.style.display = "flex";
        };
    }
    updateSidebarUser();
}


function updateSidebarUser() {

    const logoutSection = document.getElementById("logoutSection");
    const user = localStorage.getItem("username");

    if (user) {

        logoutSection.innerHTML = `

            <div class="menuItem logout" id="sidebarAction">

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">

                    <path d="M15 16L20 12L15 8"
                        stroke="red"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"/>

                    <path d="M20 12H9"
                        stroke="red"
                        stroke-width="2"
                        stroke-linecap="round"/>

                    <path d="M12 4H6C4.9 4 4 4.9 4 6V18C4 19.1 4.9 20 6 20H12"
                        stroke="red"
                        stroke-width="2"
                        stroke-linecap="round"/>

                </svg>

                <span>Logout</span>

            </div>
        `;

        document.getElementById("sidebarAction").onclick = () => {

            if (confirm("Logout?")) {

                localStorage.removeItem("username");

                showUser();
                updateSidebarUser();

                location.reload();
            }

        };

    } else {

        logoutSection.innerHTML = `
            

            <div class="menuItem" id="sidebarAction">

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">

                    <circle cx="12" cy="8" r="3"
                        stroke="#3ea6ff"
                        stroke-width="2"/>

                    <path
                        d="M5 20C5 16.5 8 14.5 12 14.5C16 14.5 19 16.5 19 20"
                        stroke="#3ea6ff"
                        stroke-width="2"
                        stroke-linecap="round"/>

                </svg>

                <span>Sign In</span>

            </div>
        `;

        document.getElementById("sidebarAction").onclick = () => {

            popup.style.display = "flex";

        };

    }

}

showUser();
updateSidebarUser();


const history = () => {
    let data = JSON.parse(localStorage.getItem('history')) || [];
    display(data)
}

let categorycaller = async (query) => {
    try {
        console.log(query)
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${query}&key=AIzaSyCiKwAbHpNxjt_oPvfaXlWPbK1W4CSuUOQ&part=snippet&maxResults=20`);
        let { items } = await res.json();
        console.log("data: ", items);
        localStorage.setItem("all vdo", JSON.stringify(items));
        display(items);
    }
    catch (err) {
        console.log("errror:", err);
    }
}
