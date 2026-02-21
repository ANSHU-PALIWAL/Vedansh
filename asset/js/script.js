document.addEventListener("DOMContentLoaded", () => {
  // 1. Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 500);
    });
  }

  // 2. Mobile Menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("toggle");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("toggle");
      });
    });
  }

  // 3. Hero Slider
  const heroSlider = document.querySelector(".hero-slider");
  if (heroSlider) {
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next-slide");
    const prevBtn = document.querySelector(".prev-slide");
    let currentSlide = 0;
    const slideInterval = 5000;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) slide.classList.add("active");
      });
    }
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);
    }
    let sliderAuto = setInterval(nextSlide, slideInterval);
    heroSlider.addEventListener("mouseenter", () => clearInterval(sliderAuto));
    heroSlider.addEventListener(
      "mouseleave",
      () => (sliderAuto = setInterval(nextSlide, slideInterval)),
    );
  }

  // 4. Scroll Animation
  const reveals = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-bottom",
  );
  if (reveals.length > 0) {
    const revealOnScroll = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    reveals.forEach((el) => revealOnScroll.observe(el));
  }

  // 5. Number Counter
  const counters = document.querySelectorAll(".counter");
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            const speed = 200;
            const updateCount = () => {
              const count = +counter.innerText;
              const inc = target / speed;
              if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // 6. Accordion
  const accHeaders = document.querySelectorAll(".accordion-header");
  if (accHeaders.length > 0) {
    accHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const item = header.parentElement;
        item.classList.toggle("active");
      });
    });
  }

  // 7. Map Initialization
  const mapElement = document.getElementById("map");
  if (mapElement && typeof L !== "undefined") {
    var map = L.map("map", { scrollWheelZoom: false }).setView(
      [22.5937, 78.9629],
      5,
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    var orangeIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    L.marker([24.8829, 74.623], { icon: orangeIcon })
      .addTo(map)
      .bindPopup("<b>Headquarters</b><br>Chittorgarh, Rajasthan");
    L.marker([22.2587, 71.1924], { icon: orangeIcon })
      .addTo(map)
      .bindPopup("<b>Project Site</b><br>Gujarat");
    L.marker([20.9517, 85.0985], { icon: orangeIcon })
      .addTo(map)
      .bindPopup("<b>Mining Projects</b><br>Odisha Belt");
    L.marker([12.9716, 77.5946], { icon: orangeIcon })
      .addTo(map)
      .bindPopup("<b>Infrastructure Projects</b><br>South India");
    L.marker([21.2787, 81.8661], { icon: orangeIcon })
      .addTo(map)
      .bindPopup("<b>Industrial Projects</b><br>Chhattisgarh");
  }
});
