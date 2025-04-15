// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Theme Toggle
  setupThemeToggle();

  // Back to Top Button
  setupBackToTopButton();

  // Page-specific initializations
  initializePage();
});

// Initialize page based on the current URL
function initializePage() {
  const currentPath = window.location.pathname;

  // Add theme toggle button to all pages
  addThemeToggleButton();

  // Add back to top button to all pages
  addBackToTopButton();

  // Handle page-specific initializations
  if (currentPath.includes("gallery.html")) {
    initializeGallery();
  } else if (currentPath.includes("contact.html")) {
    initializeContactForm();
  } else if (currentPath.includes("blog.html")) {
    initializeBlog();
  } else if (currentPath.includes("article")) {
    initializeArticle();
  } else {
    // Home page or other pages
    initializeHome();
  }
}

// Theme Toggle Setup
function setupThemeToggle() {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
}

// Add Theme Toggle Button
function addThemeToggleButton() {
  const button = document.createElement("button");
  button.className = "theme-toggle";
  button.innerHTML = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
  button.setAttribute("aria-label", "Toggle Dark Mode");
  button.setAttribute("title", "Toggle Dark Mode");

  button.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    this.innerHTML = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";

    // Save preference to localStorage
    const theme = document.body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    localStorage.setItem("theme", theme);
  });

  document.body.appendChild(button);
}

// Back to Top Button Setup
function setupBackToTopButton() {
  window.addEventListener("scroll", function () {
    const backToTopButton = document.querySelector(".back-to-top");
    if (backToTopButton) {
      if (window.scrollY > 300) {
        backToTopButton.style.display = "flex";
      } else {
        backToTopButton.style.display = "none";
      }
    }
  });
}

// Add Back to Top Button
function addBackToTopButton() {
  const button = document.createElement("button");
  button.className = "back-to-top";
  button.innerHTML = "↑";
  button.setAttribute("aria-label", "Back to Top");
  button.setAttribute("title", "Back to Top");

  button.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.appendChild(button);
}

// Initialize Home Page
function initializeHome() {
  // Convert the about section paragraph to a proper container
  const aboutParagraph = document.querySelector('p[align="center"]');
  if (aboutParagraph) {
    const aboutSection = document.createElement("div");
    aboutSection.className = "about-section";
    aboutSection.innerHTML = aboutParagraph.innerHTML;

    // Replace the paragraph with the new container
    aboutParagraph.parentNode.replaceChild(aboutSection, aboutParagraph);
  }

  // Add typing animation to the heading
  const heading = document.querySelector("h1");
  if (heading) {
    const originalText = heading.textContent;
    heading.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        heading.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    typeWriter();
  }

  // Update navigation links
  updateNavLinks();
}

// Initialize Gallery Page
function initializeGallery() {
  // Create gallery container
  const galleryDiv = document.createElement("div");
  galleryDiv.className = "gallery-container";

  // Get all images
  const images = document.querySelectorAll('img[src*="photo"]');

  images.forEach((img) => {
    // Create gallery item
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";

    // Clone the image
    const newImg = img.cloneNode(true);
    newImg.removeAttribute("width");
    newImg.removeAttribute("height");

    galleryItem.appendChild(newImg);
    galleryDiv.appendChild(galleryItem);

    // Add click event for modal
    galleryItem.addEventListener("click", function () {
      openImageModal(newImg.src);
    });
  });

  // Find the center element containing the images
  const imageContainer = images[0].closest("center");

  // Replace with the new gallery container
  imageContainer.innerHTML = "";
  imageContainer.appendChild(galleryDiv);

  // Create modal for image viewing
  createImageModal();

  // Update navigation links
  updateNavLinks();
}

// Create Image Modal
function createImageModal() {
  const modal = document.createElement("div");
  modal.className = "modal";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close-modal";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", closeImageModal);

  const modalImg = document.createElement("img");
  modalImg.className = "modal-content";

  modal.appendChild(closeBtn);
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeImageModal();
    }
  });
}

// Open Image Modal
function openImageModal(src) {
  const modal = document.querySelector(".modal");
  const modalImg = document.querySelector(".modal-content");

  modalImg.src = src;
  modal.style.display = "flex";

  // Disable scrolling on body
  document.body.style.overflow = "hidden";
}

// Close Image Modal
function closeImageModal() {
  const modal = document.querySelector(".modal");
  modal.style.display = "none";

  // Re-enable scrolling
  document.body.style.overflow = "auto";
}

// Initialize Contact Form
function initializeContactForm() {
  // Create contact container
  const contactContainer = document.createElement("div");
  contactContainer.className = "contact-container";

  // Create contact form
  const form = document.createElement("form");
  form.className = "contact-form";
  form.onsubmit = function (e) {
    handleFormSubmit(e);
  };

  // Name field
  const nameGroup = createFormGroup("name", "Name", "text", "Your name", true);
  form.appendChild(nameGroup);

  // Email field
  const emailGroup = createFormGroup(
    "email",
    "Email",
    "email",
    "Your email address",
    true
  );
  form.appendChild(emailGroup);

  // Subject field
  const subjectGroup = createFormGroup(
    "subject",
    "Subject",
    "text",
    "Message subject",
    true
  );
  form.appendChild(subjectGroup);

  // Message field
  const messageGroup = document.createElement("div");
  messageGroup.className = "form-group";

  const messageLabel = document.createElement("label");
  messageLabel.setAttribute("for", "message");
  messageLabel.textContent = "Message";

  const messageTextarea = document.createElement("textarea");
  messageTextarea.id = "message";
  messageTextarea.name = "message";
  messageTextarea.rows = 5;
  messageTextarea.placeholder = "Your message";
  messageTextarea.required = true;

  messageGroup.appendChild(messageLabel);
  messageGroup.appendChild(messageTextarea);
  form.appendChild(messageGroup);

  // Submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.className = "submit-btn";
  submitBtn.textContent = "Send Message";
  form.appendChild(submitBtn);

  // Success message
  const successMsg = document.createElement("div");
  successMsg.className = "success-message";
  successMsg.textContent = "Your message has been sent successfully!";

  // Add form to contact container
  contactContainer.appendChild(form);
  contactContainer.appendChild(successMsg);

  // Insert before the existing social links
  const emailParagraph = document.querySelector('p[align="center"]');
  emailParagraph.parentNode.insertBefore(contactContainer, emailParagraph);

  // Convert social links
  const socialDiv = document.querySelector('div[align="center"]');
  if (socialDiv) {
    socialDiv.className = "social-links";
    socialDiv.removeAttribute("align");

    const socialLinks = socialDiv.querySelectorAll("a");
    socialLinks.forEach((link) => {
      link.className = "social-link";
    });
  }

  // Update navigation links
  updateNavLinks();
}

// Create Form Group
function createFormGroup(id, labelText, type, placeholder, required) {
  const group = document.createElement("div");
  group.className = "form-group";

  const label = document.createElement("label");
  label.setAttribute("for", id);
  label.textContent = labelText;

  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = id;
  input.placeholder = placeholder;
  if (required) input.required = true;

  group.appendChild(label);
  group.appendChild(input);

  return group;
}

// Handle Form Submit
function handleFormSubmit(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Validate form (simple validation)
  if (!name || !email || !subject || !message) {
    alert("Please fill all required fields");
    return;
  }

  // Show success message
  document.querySelector(".success-message").style.display = "block";

  // Reset form
  e.target.reset();

  // Hide success message after 3 seconds
  setTimeout(() => {
    document.querySelector(".success-message").style.display = "none";
  }, 3000);
}

// Initialize Blog Page
function initializeBlog() {
  // Create blog container
  const blogContainer = document.createElement("div");
  blogContainer.className = "blog-container";

  // Get all blog post sections
  const blogPosts = document.querySelectorAll('h2[align="center"]');

  blogPosts.forEach((post, index) => {
    const postTitle = post.textContent;
    const postDescription = post.nextElementSibling.textContent;
    const postLink = post.nextElementSibling
      .querySelector("a")
      .getAttribute("href");

    // Create blog card
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card";
    blogCard.innerHTML = `
            <h2>${postTitle}</h2>
            <p>${postDescription.split("Baca Selengkapnya")[0]}</p>
            <a href="${postLink}" class="read-more">Baca Selengkapnya</a>
        `;

    blogContainer.appendChild(blogCard);
  });

  // Replace the content
  const contentArea = blogPosts[0].parentNode;

  // Remove old content (h2s and ps until the hr before navigation)
  let currentElement = blogPosts[0];
  while (
    currentElement &&
    !currentElement.nextElementSibling.classList.contains("nav-container")
  ) {
    const nextElement = currentElement.nextElementSibling;
    if (
      currentElement.tagName === "H2" ||
      currentElement.tagName === "P" ||
      currentElement.tagName === "HR"
    ) {
      contentArea.removeChild(currentElement);
    }
    currentElement = nextElement;
  }

  // Insert the blog container
  const navigationHr = document.querySelector("hr:last-of-type");
  contentArea.insertBefore(blogContainer, navigationHr);

  // Update navigation links
  updateNavLinks();
}

// Initialize Article Pages
function initializeArticle() {
  // Wrap article content in a proper container
  const articleParagraph = document.querySelector('p[align="center"]');
  if (articleParagraph) {
    const articleContent = document.createElement("div");
    articleContent.className = "article-content";
    articleContent.innerHTML = articleParagraph.innerHTML;

    // Replace the paragraph with the new container
    articleParagraph.parentNode.replaceChild(articleContent, articleParagraph);
  }

  // Update navigation links
  updateNavLinks();
}

// Update Navigation Links
function updateNavLinks() {
  // Get all navigation link containers
  const navContainers = document.querySelectorAll(
    'center:has(a[href*="html"])'
  );

  navContainers.forEach((container) => {
    // Create new nav container
    const navDiv = document.createElement("div");
    navDiv.className = "nav-container";

    // Get all links
    const links = container.querySelectorAll("a");

    // Add links to the new container
    links.forEach((link) => {
      const newLink = link.cloneNode(true);
      newLink.className = "nav-link";
      navDiv.appendChild(newLink);
    });

    // Replace the old container with the new one
    container.parentNode.replaceChild(navDiv, container);
  });
}
