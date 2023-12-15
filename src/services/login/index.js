

export const login = async(formData) => {
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            });
            
            const data = await response.json();

            return data;
        } catch (error) {
            alert('Enter correct information');
            console.log(error);
        }
    };
