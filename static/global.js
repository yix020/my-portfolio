console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let navLinks = $$("nav a");

let currentLink = navLinks.find(
  (a) => a.host === location.host && a.pathname === location.pathname
);

currentLink?.classList.add('current');

let pages = [
    { url: '.', title: 'Home' },
    { url: 'projects', title: 'Projects' },
    { url: 'resume', title: 'CV/resume'},
    { url: 'contact', title: 'Contact'},
    { url: 'https://github.com/yix020', title: 'GitHub' } // External link
];


let nav = document.createElement('nav');
document.body.prepend(nav);

const HOME_PAGE = document.documentElement.classList.contains('home');

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    // TODO create link and add it to nav
    let a = document.createElement('a');
    url = !HOME_PAGE && !url.startsWith('http') ? '../' + url : url;
    a.href = url;
    a.textContent = title;
    a.classList.toggle(
        'current',
        a.host === location.host && a.pathname === location.pathname,
    );
    if (a.host !== location.host) {
        a.target = "_blank";
    }

    nav.append(a);
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select>
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
    `
);
  
// Step 1: Get a reference to the <select> element
const themeSelect = document.querySelector('.color-scheme select');

// Step 2: Add an event listener to save user preference and apply it
themeSelect.addEventListener('input', function (event) {
    const selectedScheme = event.target.value;

    // Step 3: Set the 'color-scheme' property on the <html> element
    document.documentElement.style.setProperty('color-scheme', selectedScheme);

    // Step 4: Save the selected color scheme to localStorage
    localStorage.setItem('colorScheme', selectedScheme);
});

// Step 5: Load the saved color scheme from localStorage on page load
window.addEventListener('load', function () {
    const savedScheme = localStorage.getItem('colorScheme');
    
    if (savedScheme) {
        // Apply the saved color scheme
        document.documentElement.style.setProperty('color-scheme', savedScheme);

        // Update the select element to reflect the saved scheme
        themeSelect.value = savedScheme;
    }
});


