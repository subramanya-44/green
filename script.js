document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const CO2_PER_KM = 0.1; // Simplified CO2 savings per km (in kg)
    
    // Elements
    const distanceInput = document.getElementById('distance');
    const calculateBtn = document.getElementById('calculateBtn');
    const savingsText = document.getElementById('savingsText');
    const visualFeedback = document.getElementById('visualFeedback');
    const particles = document.querySelector('.particles');
    const pollButtons = document.querySelectorAll('.poll-btn');
    const pollResult = document.getElementById('pollResult');
    
    // Add smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Calculator functionality
    calculateBtn.addEventListener('click', () => {
        const distance = parseFloat(distanceInput.value);
        if (isNaN(distance) || distance < 0) {
            savingsText.textContent = 'Please enter a valid distance';
            savingsText.style.color = '#e74c3c';
            return;
        }

        // Add loading effect
        calculateBtn.disabled = true;
        calculateBtn.textContent = 'Calculating...';
        
        // Simulate calculation process
        setTimeout(() => {
            const savings = (distance * CO2_PER_KM).toFixed(2);
            
            // Enhanced visual feedback animation
            particles.classList.remove('active');
            void particles.offsetWidth; // Trigger reflow
            particles.classList.add('active');
            
            // Animate the result with counter effect
            let count = 0;
            const duration = 1500;
            const increment = savings / (duration / 50);
            const counter = setInterval(() => {
                count += increment;
                if (count >= savings) {
                    count = savings;
                    clearInterval(counter);
                }
                savingsText.textContent = `You saved ${count.toFixed(2)} kg of CO2!`;
                savingsText.style.color = 'var(--primary-color)';
            }, 50);
            
            // Reset button
            calculateBtn.disabled = false;
            calculateBtn.textContent = 'Calculate Savings';
        }, 800);
    });

    // Poll functionality
    let hasVoted = false;

    pollButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (!hasVoted) {
                // Visual feedback for selection
                pollButtons.forEach(btn => {
                    btn.classList.remove('selected');
                    btn.style.transform = 'scale(1)';
                });
                
                // Animate the selected button
                button.classList.add('selected');
                button.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 300);

                // Show thank you message with animation
                setTimeout(() => {
                    pollResult.textContent = 'Thanks for sharing your opinion! 🌿';
                    pollResult.classList.add('visible');
                    hasVoted = true;

                    // Disable buttons after voting
                    pollButtons.forEach(btn => btn.style.pointerEvents = 'none');
                }, 400);
            }
        });
    });

    // Input validation and enhancement
    distanceInput.addEventListener('input', () => {
        if (distanceInput.value < 0) {
            distanceInput.value = 0;
        }
        
        // Reset error message if user is typing
        if (savingsText.style.color === 'rgb(231, 76, 60)') {
            savingsText.textContent = '';
        }
    });
    
    // Add focus effects
    distanceInput.addEventListener('focus', () => {
        distanceInput.parentElement.classList.add('focused');
    });
    
    distanceInput.addEventListener('blur', () => {
        distanceInput.parentElement.classList.remove('focused');
    });
    
    // Add subtle hover effects to interactive elements
    document.querySelectorAll('.impact-block, .poll-btn, .primary-btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'var(--transition)';
        });
    });
    
    // Initialize with clean state
    savingsText.textContent = '';
    pollResult.textContent = '';
});