module.sendEmail = async ({user}) => {
    const url = 'https://email-service.digitalenvision.com.au'
    const data = {
        "email": user.email,
        "message": `Hey, ${user.name} it's your birthday`
    }
    const customHeaders = {
        "Content-Type": "application/json",
    }

    console.log(data);

    const res = await fetch(url, {
        Method: "POST",
        Headers: customHeaders,
        Body: JSON.stringify(data),
    })

    const redata = await res.json()

    console.log(redata);
}