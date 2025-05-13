// Three.js Particle Animation
function initParticles() {
  const container = document.getElementById('canvas-container');
  const canvasWidth = container.clientWidth;
  const canvasHeight = container.clientHeight;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
  camera.position.z = 5;
  
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,
    antialias: true
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(canvasWidth, canvasHeight);
  container.appendChild(renderer.domElement);
  
  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 2000;
  
  const posArray = new Float32Array(particlesCount * 3);
  const colorArray = new Float32Array(particlesCount * 3);
  const sizeArray = new Float32Array(particlesCount);
  
  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
    colorArray[i] = Math.random() * 0.3 + 0.7; // Brighter colors for better visibility in light mode
  }

  for(let i = 0; i < particlesCount; i++) {
    sizeArray[i] = Math.random() * 0.05 + 0.01;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.07, // Larger particles for better visibility
    vertexColors: true,
    transparent: true,
    opacity: 0.9, // Increased opacity
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  // Mouse interaction
  const mouse = new THREE.Vector2();
  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop with interactive effects
  function animate() {
    requestAnimationFrame(animate);
    
    // Smooth particle movement with mouse interaction
    const positions = particlesGeometry.attributes.position.array;
    for(let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] += (Math.random() - 0.5) * 0.01;
      positions[i+1] += (Math.random() - 0.5) * 0.01;
      positions[i+2] += (Math.random() - 0.5) * 0.01;
      
      // React to mouse position
      const distanceToMouse = Math.sqrt(
        Math.pow(positions[i] - mouse.x * 5, 2) +
        Math.pow(positions[i+1] - mouse.y * 5, 2)
      );
      
      if(distanceToMouse < 1.5) {
        positions[i] += (positions[i] - mouse.x * 5) * 0.02;
        positions[i+1] += (positions[i+1] - mouse.y * 5) * 0.02;
      }
    }
    
    particlesGeometry.attributes.position.needsUpdate = true;
    
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(newWidth, newHeight);
  });
}

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  
  // Theme toggle event
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  
  // Mobile menu toggle
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
  
  // Close mobile menu when clicking on a link
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
  
  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // In a real implementation, you would send the form data to a server
      // For demo purposes, we'll just show the success message
      contactForm.reset();
      formSuccess.classList.remove('hidden');
      setTimeout(() => {
        formSuccess.classList.add('hidden');
      }, 5000);
    });
  }
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('shadow-lg', 'py-2');
      nav.classList.remove('py-3');
    } else {
      nav.classList.remove('shadow-lg', 'py-2');
      nav.classList.add('py-3');
    }
  });
});






// Initialize EmailJS with your User ID
emailjs.init('user_1234567890abcdef1234567890');

// Function to send email
function sendEmail(e) {
    e.preventDefault();
    
    emailjs.sendForm('service_vkr28yw', 'template_hl276jf', e.target)
        .then(function(response) {
            alert('Message sent successfully!');
        }, function(error) {
            alert('Failed to send message: ' + JSON.stringify(error));
        });
    
    return false;
}

// Attach to your form
document.getElementById('contact-form').addEventListener('submit', sendEmail);






