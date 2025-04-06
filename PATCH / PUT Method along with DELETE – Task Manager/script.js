const API_URL = 'https://64fcf3a6605a026163ae7a6e.mockapi.io/users';
const form = document.getElementById('userForm');
const userList = document.getElementById('userList');
const message = document.getElementById('message');

async function fetchUsers() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    displayUsers(data);
  } catch (err) {
    message.textContent = "Failed to fetch users.";
    message.style.color = "red";
  }
}

function displayUsers(users) {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} (${user.email})`;
    userList.appendChild(li);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) {
    message.textContent = "Please fill out both fields.";
    message.style.color = "red";
    return;
  }

  try {
    const existingUsers = await fetch(API_URL).then(res => res.json());
    if (existingUsers.some(user => user.email === email)) {
      message.textContent = "Email already exists.";
      message.style.color = "red";
      return;
    }

    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    message.textContent = "User added successfully!";
    message.style.color = "green";
    form.reset();
    fetchUsers(); 
  } catch (err) {
    message.textContent = "Failed to add user.";
    message.style.color = "red";
  }
});

fetchUsers();
