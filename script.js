document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const birthYearInput = document.getElementById('birthYear');
    const birthMonthInput = document.getElementById('birthMonth');
    const birthDayInput = document.getElementById('birthDay');
    const resultDiv = document.getElementById('result');

    birthYearInput.addEventListener('input', validateYear);
    birthMonthInput.addEventListener('input', validateMonth);
    birthDayInput.addEventListener('input', validateDay);

    calculateBtn.addEventListener('click', calculateAge);

    function validateYear() {
        const currentYear = new Date().getFullYear();
        const year = parseInt(birthYearInput.value);
        
        if (isNaN(year)) {
            birthYearInput.setCustomValidity('Please enter a valid year');
        } else if (year < 1900) {
            birthYearInput.setCustomValidity('Year must be after 1900');
        } else if (year > currentYear) {
            birthYearInput.setCustomValidity('Year cannot be in the future');
        } else {
            birthYearInput.setCustomValidity('');
        }
    }

    function validateMonth() {
        const month = parseInt(birthMonthInput.value);
        
        if (isNaN(month)) {
            birthMonthInput.setCustomValidity('Please enter a valid month');
        } else if (month < 1 || month > 12) {
            birthMonthInput.setCustomValidity('Month must be between 1 and 12');
        } else {
            birthMonthInput.setCustomValidity('');
        }
    }

    function validateDay() {
        const day = parseInt(birthDayInput.value);
        const month = parseInt(birthMonthInput.value);
        const year = parseInt(birthYearInput.value);
        
        if (isNaN(day)) {
            birthDayInput.setCustomValidity('Please enter a valid day');
            return;
        }

        const daysInMonth = [
            31, // January
            year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, // February
            31, // March
            30, // April
            31, // May
            30, // June
            31, // July
            31, // August
            30, // September
            31, // October
            30, // November
            31  // December
        ];

        if (month && year) {
            if (day < 1 || day > daysInMonth[month - 1]) {
                birthDayInput.setCustomValidity(`Day must be between 1 and ${daysInMonth[month - 1]} for ${month}/${year}`);
            } else {
                birthDayInput.setCustomValidity('');
            }
        }
    }

    function calculateAge() {
        birthYearInput.setCustomValidity('');
        birthMonthInput.setCustomValidity('');
        birthDayInput.setCustomValidity('');

        validateYear();
        validateMonth();
        validateDay();

        const birthYear = parseInt(birthYearInput.value);
        const birthMonth = parseInt(birthMonthInput.value);
        const birthDay = parseInt(birthDayInput.value);

        if (birthYearInput.validationMessage || 
            birthMonthInput.validationMessage || 
            birthDayInput.validationMessage) {
            resultDiv.textContent = 'Please correct the errors in your input';
            resultDiv.style.color = 'red';
            resultDiv.style.backgroundColor = "#f9f9f9";
            return;
        }

        if (!birthYear || !birthMonth || !birthDay) {
            resultDiv.textContent = 'Please enter a complete date of birth';
            resultDiv.style.backgroundColor = "#f9f9f9";
            return;
        }

        const today = new Date();
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);

        if (birthDate > today) {
            resultDiv.textContent = 'Birth date cannot be in the future';
            resultDiv.style.color = 'red';
            resultDiv.style.backgroundColor = "#f9f9f9";
            return;
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        const months = Math.abs((today.getFullYear() * 12 + today.getMonth()) - 
                                 (birthDate.getFullYear() * 12 + birthDate.getMonth()));
        const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));

        resultDiv.innerHTML = `
            <strong>Your Age:</strong><br>
            ${age} years<br>
            ${months} months<br>
            ${totalDays} days
        `;
        resultDiv.style.color = 'black';
        resultDiv.style.backgroundColor = "#f9f9f9";
    }
});