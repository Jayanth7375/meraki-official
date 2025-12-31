const BASE_URL = "http://localhost:5000/api";

const test = async () => {
    try {
        console.log("1. Logging in...");
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "faculty.cse@college.com",
                password: "faculty123"
            })
        });

        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(JSON.stringify(loginData));

        const { token, user } = loginData;
        console.log("LOGIN SUCCESS. User Dept:", user.department);

        console.log("\n2. Fetching Courses...");
        const coursesRes = await fetch(`${BASE_URL}/faculty/courses`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        const coursesData = await coursesRes.json();
        console.log("COURSES STATUS:", coursesRes.status);
        if (coursesRes.ok) {
            console.log("COURSES COUNT:", coursesData.length);
            if (coursesData.length > 0) {
                console.log("FIRST COURSE:", coursesData[0].name);
            }
        } else {
            console.log("ERROR:", coursesData);
        }

    } catch (error) {
        console.error("TEST FAILED:", error);
    }
};

test();
