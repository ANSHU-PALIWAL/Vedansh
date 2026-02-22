document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData();

  formData.append("name", form.querySelector('input[type="text"]').value);
  formData.append("email", form.querySelector('input[type="email"]').value);
  formData.append("enquiryType", form.querySelector("select").value);
  formData.append("message", form.querySelector("textarea").value);

  fetch(
    "https://script.google.com/macros/s/AKfycbw48PB_-sy1KyJo1y5lAK-KoaT231efPUX5tAoBlD1y3mznNz7tdWy_nPJz2A8jLOWo/exec",
    {
      method: "POST",
      body: formData,
    },
  )
    .then((response) => response.text())
    .then((data) => {
      alert("Message submitted successfully!");
      form.reset();
    })
    .catch((error) => {
      alert("Submission failed.");
      console.error(error);
    });
});
