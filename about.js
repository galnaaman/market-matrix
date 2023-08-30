"use strict"; 

(function() {

    function aboutPage () {
        let html = `
        <!-- Your introduction section -->
        <section class="jumbotron text-center">
          <div class="container">
            <img src="assests/your-photo.png" class=" img-thumbnail mb-4" alt="Gal Naaman">
            <h1 class="jumbotron-heading">Gal Naaman</h1>
            <p class="lead text-muted">The CEO & Founder of MarketMatrix </p>
          </div>
        </section>
      
        <!-- About us section -->
        <div class="container py-5">
          <h1 class="mb-4">About Us</h1>
      
          <h2 class="my-4">Who We Are</h2>
          <p>Market Matrix was founded in 2023 by a team of dedicated finance enthusiasts, software developers, and data analysts...</p>
      
          <h2 class="my-4">What We Do</h2>
          <p>Market Matrix provides an intuitive, user-friendly platform to track the performance of various cryptocurrencies and stock markets worldwide...</p>
      
          <h2 class="my-4">Our Vision</h2>
          <p>At Market Matrix, we are committed to creating a digital environment where everyone...</p>
      
          <h2 class="my-4">Our Values</h2>
          <div class="list-group">
            <p class="list-group-item">User Centricity: We prioritize our users' needs and consistently update our platform based on their feedback.</p>
            <p class="list-group-item">Integrity: We maintain the highest level of accuracy and transparency in the information we provide.</p>
            <p class="list-group-item">Innovation: We embrace technological advancements to constantly improve our services and deliver cutting-edge financial insights.</p>
            <p class="list-group-item">Simplicity: We believe in making financial markets understandable and accessible for everyone.</p>
            <p class="list-group-item">Education: We aim to promote financial literacy and empower our users to make well-informed investment decisions.</p>
          </div>
        </div>
      
        
        `;
        return html;
    }

    const about = document.getElementById("about");
    const container = document.getElementById("mainContent");
    const header = document.getElementById("page-title");
    const subHeader = document.getElementById("page-subtitle");
    const btnHeader = document.getElementById("page-btn");
    about.addEventListener("click",function(){
        let html = aboutPage();
        container.innerHTML = html;
        document.title = "Market Matrix - About";
        header.innerHTML = "About Page"
        subHeader.innerHTML = "We Believe in Transparency"
        btnHeader.style.display = "none";
        
        
    })


    



})();