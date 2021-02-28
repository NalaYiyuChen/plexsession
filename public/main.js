const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/login', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            confession: 'from main.js this is a confession',
            is_approved: true
          })
        })
  })