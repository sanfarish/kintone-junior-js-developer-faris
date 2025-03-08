(() => {
  // const API_URL = 'http://localhost:3000/employees';
  const API_URL = 'http://192.168.100.7:3000/employees';

  /**
   * TODO:
   * - Add a function to generate random string (10 digits alphanumeric) for id
   * - Add a function to add new data (submit)
   * - Add a function to redirect to the index page
   */
  const form = document.querySelector("#form")

  form.addEventListener("submit", async e => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const id = Math.random().toString(36).slice(2).substring(0, 10)
    formData.append("id", id)

    const body = Object.fromEntries(formData)
    const raw = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    
    alert("successfully add employee")
    document.location.href = "index.html"
  })
})();
