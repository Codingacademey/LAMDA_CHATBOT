// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        }
    });
});

// Chat widget functionality
function openChat() {
    const chatWidget = document.getElementById('chat-widget');
    chatWidget.classList.add('active');
    
    // Scroll to demo section
    document.getElementById('demo').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function closeChat() {
    const chatWidget = document.getElementById('chat-widget');
    chatWidget.classList.remove('active');
}

// Enhanced send message function
async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const userMessage = userInput.value.trim();
    
    if (!userMessage) return;
    
    const chatMessages = document.getElementById("chat-messages");
    
    // Add user message
    const userDiv = document.createElement("div");
    userDiv.className = "message user";
    userDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <p>${userMessage}</p>
    `;
    chatMessages.appendChild(userDiv);
    
    // Clear input
    userInput.value = "";
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show typing indicator
    const typingDiv = document.createElement("div");
    typingDiv.className = "message bot typing";
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <p><i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="fas fa-circle"></i></p>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });
        
        const data = await response.json();
        
        // Remove typing indicator
        chatMessages.removeChild(typingDiv);
        
        // Add bot response
        const botDiv = document.createElement("div");
        botDiv.className = "message bot";
        botDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <p>${data.response}</p>
        `;
        chatMessages.appendChild(botDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
    } catch (error) {
        // Remove typing indicator
        chatMessages.removeChild(typingDiv);
        
        // Show error message
        const errorDiv = document.createElement("div");
        errorDiv.className = "message bot error";
        errorDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <p>Sorry, I'm having trouble connecting right now. Please try again later.</p>
        `;
        chatMessages.appendChild(errorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        console.error('Error:', error);
    }
}

// Handle Enter key press in chat input
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .faq-item, .section-header');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add typing animation CSS
const style = document.createElement('style');
style.textContent = `
    .typing p {
        display: flex;
        gap: 4px;
        align-items: center;
    }
    
    .typing i {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--primary-color);
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing i:nth-child(1) { animation-delay: -0.32s; }
    .typing i:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .error p {
        color: #ff6b6b !important;
        background: rgba(255, 107, 107, 0.1) !important;
    }
    
    .message {
        animation: messageSlide 0.3s ease-out;
    }
    
    @keyframes messageSlide {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Auto-scroll chat to bottom when new messages are added
function scrollChatToBottom() {
    const chatMessages = document.getElementById("chat-messages");
    if (chatMessages) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

// Initialize chat widget if it exists
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.getElementById('chat-widget');
    if (chatWidget) {
        // Auto-open chat widget after 3 seconds on demo section
        setTimeout(() => {
            if (window.location.hash === '#demo' || 
                (window.innerHeight + window.scrollY) >= document.getElementById('demo').offsetTop) {
                openChat();
            }
        }, 3000);
    }
});
  
  