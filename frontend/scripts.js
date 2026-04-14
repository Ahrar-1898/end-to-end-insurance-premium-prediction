document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('prediction-form');
    const resultContainer = document.getElementById('result-container');
    const resultJson = document.getElementById('result-json');

    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.getElementById('error-message');

    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const loader = submitBtn?.querySelector('.loader');

    const resetBtn = document.getElementById('reset-btn');

    // Safety check
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset UI
        errorContainer?.classList.add('hidden');
        resultContainer?.classList.add('hidden');

        // Loading state
        if (btnText) btnText.classList.add('hidden');
        if (loader) loader.classList.remove('hidden');
        if (submitBtn) submitBtn.disabled = true;

        // Collect data
        const formData = new FormData(form);

        const data = {
            age: parseInt(formData.get('age')),
            weight: parseFloat(formData.get('weight')),
            height: parseFloat(formData.get('height')),
            income_lpa: parseFloat(formData.get('income_lpa')),
            smoker: document.getElementById('smoker')?.checked || false,
            city: formData.get('city'),
            occupation: formData.get('occupation')
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                let errText = 'Failed to fetch prediction';

                try {
                    const errData = await response.json();
                    errText = errData.detail || errText;
                } catch (e) { }

                throw new Error(errText);
            }

            const result = await response.json();

            // Show FULL backend response (best for debugging + project)
            if (resultJson) {
                resultJson.innerText = JSON.stringify(result, null, 2);
            }

            // Show result UI
            form.classList.add('hidden');
            resultContainer.classList.remove('hidden');

        } catch (error) {
            if (errorMessage) {
                errorMessage.textContent = error.message;
            }
            errorContainer?.classList.remove('hidden');
        } finally {
            // Reset loading state
            if (btnText) btnText.classList.remove('hidden');
            if (loader) loader.classList.add('hidden');
            if (submitBtn) submitBtn.disabled = false;
        }
    });

    resetBtn?.addEventListener('click', () => {
        resultContainer.classList.add('hidden');
        form.reset();
        form.classList.remove('hidden');

        // restart animation
        form.classList.remove('fade-in');
        void form.offsetWidth;
        form.classList.add('fade-in');
    });
});