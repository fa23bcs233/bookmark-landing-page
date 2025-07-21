const DOM = {
    navBar: document.querySelector("#navBar"),
    navBarLogo: document.querySelector("#nav-logo"),
    menuToggleButton: document.querySelector("#toggle-menu"),
    openMenuButton: document.querySelector(".open-menu"),
    closeMenuButton: document.querySelector(".close-menu"),
    menu: document.querySelector("#menu"),
    navSocialIcons: document.querySelector("#nav-social-icons"),
    
    tabButtons: document.querySelectorAll(".tab-btn"),
    tabPanels: document.querySelectorAll(".tab-pannel"),
    tabPannelsButtons : document.querySelectorAll(".tab-pannel a"),
    
    form: document.querySelector("#form"),
    email: document.querySelector("#form #email"),
    emailInput: document.querySelector("#form #email-input"),
    errorMessage: document.querySelector("#error-message"),
    errorIcon: document.querySelector("#error-icon"),
};

const NavBar = (function(){
    DOM.menuToggleButton.addEventListener("click", toggle);

    function toggle(){
        // Svg
        DOM.navBarLogo.classList.toggle("fill-blue-950");
        DOM.navBarLogo.classList.toggle("stroke-blue-950");
        DOM.navBarLogo.classList.toggle("text-white");
        DOM.navBarLogo.classList.toggle("fill-white");
        DOM.navBarLogo.classList.toggle("stroke-white");
        DOM.navBarLogo.classList.toggle("text-blue-600");

        // Toggle Button
        DOM.openMenuButton.classList.toggle("hidden");
        DOM.closeMenuButton.classList.toggle("hidden");

        // Menu
        const isHidden = DOM.menu.getAttribute("aria-hidden") === "true";
        DOM.menu.classList.toggle("opacity-0");
        DOM.menu.classList.toggle("pointer-events-none");
        DOM.menu.setAttribute("aria-hidden", String(!isHidden));

        document.body.classList.toggle("overflow-hidden");
    }
})();

const TabbedContent = (function(){
    let currentTab = 0;

    DOM.tabButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            // Remove previous active state
            DOM.tabButtons[currentTab].classList.remove("after:bg-red-400");
            DOM.tabButtons[currentTab].setAttribute("aria-selected", "false");
            DOM.tabPanels[currentTab].classList.add("opacity-0", "pointer-events-none");
            DOM.tabPanels[currentTab].setAttribute("aria-hidden", "true");

            currentTab = index;

            // Add active state
            DOM.tabButtons[currentTab].classList.add("after:bg-red-400");
            DOM.tabButtons[currentTab].setAttribute("aria-selected", "true");
            DOM.tabPanels[currentTab].classList.remove("opacity-0", "pointer-events-none");
            DOM.tabPanels[currentTab].setAttribute("aria-hidden", "false");
        });
    });
})();

const Form = (function(){
    DOM.form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!DOM.email.checkValidity()) {
            DOM.emailInput.classList.add("bg-red-400");
            DOM.email.setAttribute("aria-invalid", "true");
            DOM.email.setAttribute("aria-describedby", "error-message");
            DOM.errorIcon.classList.remove("opacity-0");
            DOM.errorMessage.classList.remove("opacity-0", "pointer-events-none");
            DOM.errorMessage.setAttribute("aria-hidden", "false");

            traceValidEmail();
        }
    });

    const traceValidEmail = () => {
        DOM.email.addEventListener("input", () => {
            if (DOM.email.checkValidity()) {
                DOM.emailInput.classList.remove("bg-red-400");
                DOM.email.removeAttribute("aria-invalid");
                DOM.email.removeAttribute("aria-describedby");
                DOM.errorIcon.classList.add("opacity-0");
                DOM.errorMessage.classList.add("opacity-0", "pointer-events-none");
                DOM.errorMessage.setAttribute("aria-hidden", "true");
            }
        });
    };
})();

const ResponsiveAccessibility = (function(){
    const mediumScreen = window.matchMedia("(min-width: 768px)");

    function handleMediumScreenChange(e){
        if (e.matches) {
            DOM.menuToggleButton.setAttribute("aria-hidden", "true");
            DOM.menu.setAttribute("aria-hidden", "false");
            DOM.tabPannelsButtons.forEach(button => {
                button.setAttribute("aria-hidden", "false");
            });
        }else{
            DOM.menuToggleButton.setAttribute("aria-hidden", "false");
            DOM.menu.setAttribute("aria-hidden", "true");
            DOM.tabPannelsButtons.forEach(button => {
                button.setAttribute("aria-hidden", "true");
            });
        }
    }

    handleMediumScreenChange(mediumScreen);
    mediumScreen.addEventListener("change", handleMediumScreenChange);
})();
