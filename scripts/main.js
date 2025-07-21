const NavBar = (function(){
    const navBar = document.querySelector("#navBar");
    const navBarLogo = navBar.querySelector("#nav-logo");
    const menuToggleButton = navBar.querySelector("#toggle-menu");
    const openMenuButton = menuToggleButton.querySelector(".open-menu");
    const closeMenuButton = menuToggleButton.querySelector(".close-menu");
    const menu = document.querySelector("#menu");

    menuToggleButton.addEventListener("click", toggle);

    function toggle(){
        // Svg
        navBarLogo.classList.toggle("fill-blue-950");
        navBarLogo.classList.toggle("stroke-blue-950");
        navBarLogo.classList.toggle("text-white");

        navBarLogo.classList.toggle("fill-white");
        navBarLogo.classList.toggle("stroke-white");
        navBarLogo.classList.toggle("text-blue-600");

        // Toggle Button
        openMenuButton.classList.toggle("hidden");
        closeMenuButton.classList.toggle("hidden");

        // Menu
        const isHidden = menu.getAttribute("aria-hidden") === "true";
        menu.classList.toggle("opacity-0");
        menu.classList.toggle("pointer-events-none");
        menu.setAttribute("aria-hidden", String(!isHidden));
    }

})()


const TabbedContent = (function(){
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabPannels = document.querySelectorAll(".tab-pannel");
    let currentTab = 0

    tabButtons.forEach((button, index)=>{
        button.addEventListener("click", ()=>{
            // Remove the Active State 
            tabButtons[currentTab].classList.remove("after:bg-red-400");
            tabButtons[currentTab].setAttribute("aria-selected", "false");
            tabPannels[currentTab].classList.add("opacity-0");
            tabPannels[currentTab].classList.add("pointer-events-none");
            tabPannels[currentTab].setAttribute("aria-hidden", "true");

            // Change the Active Tab
            currentTab = index;

            // Add the Active State
            tabButtons[currentTab].classList.add("after:bg-red-400");
            tabButtons[currentTab].setAttribute("aria-selected", "true");
            tabPannels[currentTab].classList.remove("opacity-0");
            tabPannels[currentTab].classList.remove("pointer-events-none");
            tabPannels[currentTab].setAttribute("aria-hidden", "false");    

        })
    })

})()

const Form = (function(){
    debugger;
    const form = document.querySelector("#form");
    const email = form.querySelector('#email');
    const errorMessage = form.querySelector("#error-message");
    const errorIcon = form.querySelector("#error-icon");
    const emailInput = form.querySelector("#email-input");

    form.addEventListener("submit" , (e)=>{
        e.preventDefault();
        if(!email.checkValidity()){
            emailInput.classList.add("bg-red-400");
            email.ariaInvalid = true;
            email.setAttribute("aria-describedby", "error-Message");
            errorIcon.classList.remove("opacity-0");
            errorMessage.classList.remove("opacity-0");
            errorMessage.classList.remove("pointer-events-none");
            errorMessage.setAttribute("aria-hidden", "false");
            traceValidEmail()
        }
    })

    traceValidEmail = ()=>{
        email.addEventListener("input", ()=>{
            if(email.checkValidity()){
                emailInput.classList.remove("bg-red-400");
                email.ariaInvalid = false;
                email.removeAttribute("aria-describedby");
                errorIcon.classList.add("opacity-0");
                errorMessage.classList.add("opacity-0");
                errorMessage.classList.add("pointer-events-none");
                errorMessage.setAttribute("aria-hidden", "true");
            }
        })
    }
    

})()