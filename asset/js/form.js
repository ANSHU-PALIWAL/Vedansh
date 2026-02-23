// Function to show Toast Notifications (Keep this as is)
function showToast(message, type) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.classList.add("toast", type);
    toast.innerHTML = `<i class="fas ${iconClass}"></i><span class="toast-msg">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Form Submission Logic
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const loaderOverlay = document.getElementById("global-loader-overlay");
    const formData = new FormData();

    // 1. Show Full Screen Loader
    loaderOverlay.classList.add("active");

    // 2. Gather Data
    formData.append("name", document.getElementById("name").value);
    formData.append("email", document.getElementById("email").value);
    formData.append("enquiryType", document.getElementById("enquiryType").value);
    formData.append("message", document.getElementById("message").value);

    // 3. Send Request
    fetch(
        "https://script.google.com/macros/s/AKfycbw48PB_-sy1KyJo1y5lAK-KoaT231efPUX5tAoBlD1y3mznNz7tdWy_nPJz2A8jLOWo/exec",
        {
            method: "POST",
            body: formData,
        }
    )
    .then((response) => response.text())
    .then((data) => {
        showToast("Message sent successfully! We will contact you soon.", "success");
        form.reset();
    })
    .catch((error) => {
        showToast("Something went wrong. Please try again.", "error");
        console.error(error);
    })
    .finally(() => {
        // 4. Hide Full Screen Loader
        setTimeout(() => {
            loaderOverlay.classList.remove("active");
        }, 500); 
    });
});