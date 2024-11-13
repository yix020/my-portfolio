<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import '../style.css';

    let pages = [
        { url: './', title: 'Home' },
        { url: './projects', title: 'Projects' },
        { url: './resume', title: 'CV' },
        { url: './contact', title: 'Contact' },
        { url: './meta', title: 'Meta' }, 
        { url: 'https://github.com/yix020', title: 'GitHub' }
    ];

    let colorScheme = 'light dark';
    let root = typeof document !== 'undefined' ? document.documentElement : null;

    // Load color scheme from localStorage in the browser only
    onMount(() => {
        const savedScheme = localStorage?.getItem('colorScheme');
        colorScheme = savedScheme || colorScheme;
    });

    // Update color scheme on <html> and save to localStorage reactively
    $: if (root) {
        root.style.setProperty('color-scheme', colorScheme);
        localStorage?.setItem('colorScheme', colorScheme);
    }
</script>

<!-- Navigation Bar -->
<nav>
    {#each pages as p}
        <a href={p.url} 
           target={p.url.startsWith('http') ? '_blank' : null} 
           class:current={'.' + $page.route.id === p.url}>
            {p.title}
        </a>
    {/each}
</nav>

<!-- Theme Switcher -->
<div class="theme-container">
    <label class="color-scheme">
        Theme:
        <select bind:value={colorScheme}>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>
</div>

<slot />

<style>
    /* Navigation bar styling */
    nav {
        background-color: #fffefe;
        padding: 1rem;
        display: flex;
        gap: 1rem;
        justify-content: space-between;
    }

    nav a {
        color: rgb(0, 0, 0);
        text-decoration: none;
    }

    nav a.current {
        font-weight: bold;
        text-decoration: underline;
        color: #ffd700;
    }

    nav a:hover {
        text-decoration: underline;
    }

    /* Theme switcher styling below nav */
    .theme-container {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        padding: 0.5rem 1rem;
    }

    .color-scheme {
        font-size: 0.9em;
        display: flex;
        align-items: center;
        white-space: nowrap;
    }

    .color-scheme select {
        margin-left: 0.5rem;
        padding: 0.2em 0.5em;
        font-family: inherit;
        font-size: inherit;
        border-radius: 5px;
        border: 1px solid #6a6a6a;
    }
</style>
