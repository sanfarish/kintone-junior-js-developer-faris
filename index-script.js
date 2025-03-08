(() => {
  // const API_URL = 'http://localhost:3000/employees';
  const API_URL = 'http://192.168.100.7:3000/employees'; // to make it work on another device (e.g. phone, etc.)

  /**
   * TODO:
   * - Add a function to redirect to the form page
   * - Add a function to fetch data
   * - Add a function to filter data by employee's name
   * - Add a function to display table
   * - Add a function to delete data (bonus)
   */
  let employees = []
  
  const table = document.querySelector("#table")
  const filterInput = document.querySelector("#filter")
  
  /**
   * Functions to execute during the first render
   */
  window.onload = async () => {
    await fetchData()
    renderData(employees)
  }

  /**
   * Fetch data from JSON server
   */
  async function fetchData() {
    const res = await fetch(API_URL)
    const data = await res.json()
    employees = data
  }
  
  /**
   * Render rows of data to table
   * @param {*} data
   */
  function renderData(data) {
    table.innerHTML = ""
    data.forEach((employee, index) => {
      const row = `
      <tr class="bg-gray-900 h-16">
        <td class="border border-gray-300 px-4">${employee.id}</td>
        <td class="border border-gray-300 px-4">${employee.name}</td>
        <td class="border border-gray-300 px-4">${employee.position}</td>
        <td class="border border-gray-300 px-4">
          <input class="delete" type="button" value="Delete" onclick="deleteData('${employee.id}')">
        </td>
      </tr>
      `
      table.innerHTML += row
    })
  }

  /**
   * Filter function
   */
  filterInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    if (value !== null || value !== "") {
      const filteredEmployees = employees.filter(obj => obj.name.toLowerCase().includes(value))
      renderData(filteredEmployees)
    } else {
      renderData(employees)
    }
  })
})();

/**
 * Delete function
 */
async function deleteData(id) {
  await fetch("http://192.168.100.7:3000/employees/" + id, {
    method: "DELETE"
  })
  alert("successfully delete employee")
}