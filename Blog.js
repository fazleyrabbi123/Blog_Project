<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog : Homepage</title>

    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/home.css">

</head>
<body>

    <nav class="navbar">
        <img src="img/logo.png" class="logo" alt="">
        <ul class="links-container">
            <li class="link-item"><a href="/" class="link">home</a></li>
            <li class="link-item"><a href="/editor" class="link">editor</a></li>
        </ul>
    </nav>

</body>
</html>
Home.css
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    width: 100%;
    position: relative;
    font-family: 'poppins', sans-serif;
}

::selection{
    background: #1b1b1b;
    color: #fff;
}

.navbar{
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5vw;
    background: #fff;
    z-index: 9;
}

.links-container{
    display: flex;
    list-style: none;
}

.link{
    padding: 10px;
    margin-left: 10px;
    text-decoration: none;
    text-transform: capitalize;
    color: #000;
}
Output
Capture

Now create the header.
<header class="header">
    <div class="content">
        <h1 class="heading">
            <span class="small">welcome in the world of</span>
            blog
            <span class="no-fill">writing</span>
        </h1>
        <a href="/editor" class="btn">write a blog</a>
    </div>
</header>
.header{
    margin-top: 60px;
    width: 100%;
    height: calc(100vh - 60px);
    background: url(../img/header.png);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content{
    text-align: center;
}

.heading{
    color: #fff;
    text-transform: capitalize;
    font-size: 80px;
    line-height: 60px;
    margin-bottom: 80px;
}

.heading .small{
    display: block;
    font-size: 40px;
}

.heading .no-fill{
    font-style: italic;
    color: transparent;
    -webkit-text-stroke: 2px #fff;
}

.btn{
    padding: 10px 20px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.7);
    color: #000;
    text-decoration: none;
    text-transform: capitalize;
}
Output
Capture2

Now the last element for our homepage. Make blog card section and make one card, as we make these cards with JS later.
<section class="blogs-section">
    <div class="blog-card">
        <img src="img/header.png" class="blog-image" alt="">
        <h1 class="blog-title">Lorem ipsum dolor sit amet consectetur.</h1>
        <p class="blog-overview">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt incidunt fugiat quos porro repellat harum. Adipisci tempora corporis rem cum.</p>
        <a href="/" class="btn dark">read</a>
    </div>
</section>
.blogs-section{
    width: 100%;
    padding: 50px 5vw;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 80px;
}

.blog-image{
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 10px;
}

.blog-overview{
    margin: 10px 0 20px;
    line-height: 30px;
}

.btn.dark{
    background: #1b1b1b;
    color: #fff;
}app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})<div class="blog">
    <textarea type="text" class="title" placeholder="Blog title..."></textarea>
    <textarea type="text" class="article" placeholder="Start writing here..."></textarea>
</div>
.blog{
    width: 70vw;
    min-width: 400px;
    height: 100px;
    display: block;
    margin: auto;
    padding: 50px 0;
}

textarea::-webkit-scrollbar{
    width: 10px;
}

textarea::-webkit-scrollbar-thumb{
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.title,
.article{
    width: 100%;
    min-height: 100px;
    height: auto;
    outline: none;
    font-size: 50px;
    font-weight: 600;
    color: #2d2d2d;
    resize: none;
    border: none;
    padding: 10px;
    border-radius: 10px;
}

.title::placeholder,
.article::placeholder{
    color: #2d2d2d;
}

.article{
    height: 500px;
    font-size: 20px;
    margin-top: 20px;
    line-height: 30px;
    font-weight: 500;
    padding-bottom: 100px;
    white-space: pre-wrap;
}const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            } else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else{
        alert("upload Image only");
    }
}app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.9.1/firebase-firestore.js"></script>

<script src="js/firebase.js"></script>
<script src="js/editor.js"></script>let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', () => {
    if(articleFeild.value.length && blogTitleField.value.length){
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${blogTitle}-${id}`;
        let date = new Date(); // for published at info

        //access firstore with db variable;
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleFeild.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(() => {
            location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err);
        })
    }
})app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((req, res) => {
    res.json("404");
})<div class="banner"></div>

<div class="blog">
    <h1 class="title"></h1>
    <p class="published"><span>published at - </span></p>
    <div class="article">

    </div>
</div>
.blog, .article{
    position: relative;
    height: fit-content;
    padding-bottom: 0;
}

.article, .title{
    min-height: auto;
    height: fit-content;
    padding: 0 10px;
    white-space: normal;
}

.published{
    margin: 20px 0 60px;
    padding: 0 10px;
    text-transform: capitalize;
    font-style: italic;
    color: rgba(0, 0, 0, 0.5);
}

.published span{
    font-weight: 700;
    font-style: normal;
}

.article *{
    margin: 30px 0;
    color: #2d2d2d;
}

.article-image{
    max-width: 100%;
    max-height: 400px;
    display: block;
    margin: 30px auto;
    object-fit: contain;
}let blogId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(blogId);

docRef.get().then((doc) => {
    if(doc.exists){
        setupBlog(doc.data());
    } else{
        location.replace("/");
    }
}const setupBlog = (data) => {
    const banner = document.querySelector('.banner');
    const blogTitle = document.querySelector('.title');
    const titleTag = document.querySelector('title');
    const publish = document.querySelector('.published');

    banner.style.backgroundImage = `url(${data.bannerImage})`;

    titleTag.innerHTML += blogTitle.innerHTML = data.title;
    publish.innerHTML += data.publishedAt;

    const article = document.querySelector('.article');
    addArticle(article, data.article);
}const addArticle = (ele, data) => {
    data = data.split("\n").filter(item => item.length);
    // console.log(data);

    data.forEach(item => {
        // check for heading
        if(item[0] == '#'){
            let hCount = 0;
            let i = 0;
            while(item[i] == '#'){
                hCount++;
                i++;
            }
            let tag = `h${hCount}`;
            ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
        } 
        //checking for image format
        else if(item[0] == "!" && item[1] == "["){
            let seperator;

            for(let i = 0; i <= item.length; i++){
                if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
                    seperator = i;
                }
            }

            let alt = item.slice(2, seperator);
            let src = item.slice(seperator + 2, item.length - 1);
            ele.innerHTML += `
            <img src="${src}" alt="${alt}" class="article-image">
            `;
        }

        else{
            ele.innerHTML += `<p>${item}</p>`;
        }
    })
}.sub-heading{
    padding: 0 5vw;
    color: #2d2d2d;
    font-weight: 500;
    font-size: 40px;
    margin-top: 80px;
}<section class="blogs-section">
    <!-- <div class="blog-card">
        <img src="img/header.png" class="blog-image" alt="">
        <h1 class="blog-title">Lorem ipsum dolor sit amet consectetur.</h1>
        <p class="blog-overview">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt incidunt fugiat quos porro repellat harum. Adipisci tempora corporis rem cum.</p>
        <a href="/" class="btn dark">read</a>
    </div> -->
</section>const blogSection = document.querySelector('.blogs-section');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(blog => {
        if(blog.id != decodeURI(location.pathname.split("/").pop())){
            createBlog(blog);
        }
    })
})

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
    </div>
    `;
}