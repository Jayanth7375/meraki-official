
const testRegister = async () => {
    const randomSuffix = Math.floor(Math.random() * 10000);
    const userData = {
        name: `Test User ${randomSuffix}`,
        email: `testuser${randomSuffix}@example.com`,
        password: 'Password123!',
        phone: '9876543210',
        department: 'Computer Science',
    };

    try {
        console.log('Attempting to register with:', userData);
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        console.log('Response Status:', response.status);
        console.log('Response Data:', data);
    } catch (error) {
        console.error('Registration Failed:', error.message);
    }
};

testRegister();
