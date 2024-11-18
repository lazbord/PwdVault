function checkLoginInput() {
    // Find all input elements in the document
    const form = document.querySelectorAll("input");
    if (form) {
        form.forEach(element => {
            // Check if the input type is relevant
            if (
                (element.type === "password" || 
                 element.type === "text" || 
                 element.type === "email" || 
                 element.type === "username") && 
                 element.type !== "hidden" &&
                 !element.hidden
            ) {
                console.log("Relevant input found:", element);
            }
        });
    }
}

const observer = new MutationObserver(() => {
    checkLoginInput();
});

observer.observe(document.body, {
    childList: true,    // Watch for added/removed child elements
    subtree: true,      // Watch all child elements, not just direct children
});

checkLoginInput();
