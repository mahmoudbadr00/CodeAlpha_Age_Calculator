document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const birthYearInput = document.getElementById('birthYear');
    const birthMonthInput = document.getElementById('birthMonth');
    const birthDayInput = document.getElementById('birthDay');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', calculateAge);

    function calculateAge() {
        const birthYear = parseInt(birthYearInput.value);
        const birthMonth = parseInt(birthMonthInput.value);
        const birthDay = parseInt(birthDayInput.value);

        // Basic validation
        if (!birthYear || !birthMonth || !birthDay) {
            resultDiv.textContent = 'Please enter a complete date of birth';
            return;
        }

        const today = new Date();
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

        // Age calculation
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        // Detailed age display
        const months = Math.abs((today.getFullYear() * 12 + today.getMonth()) - 
                                 (birthDate.getFullYear() * 12 + birthDate.getMonth()));
        const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));

        resultDiv.innerHTML = `
            <strong>Your Age:</strong><br>
            ${age} years<br>
            ${months} months<br>
            ${totalDays} days
        `;
    }
});