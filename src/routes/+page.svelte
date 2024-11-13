
<script>
    import projects from '$lib/projects.json'; // Importing project data
    import Project from '$lib/Project.svelte'; // Importing the Project component
    const imagePath = '/images/WechatIMG1.jpeg'; // Image path if in public folder
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>

<main>
    <h1>Hi, I am Cara</h1>
    <img 
        src={imagePath} 
        alt="Hi, I am Cara. I am a data analyst and UX designer. I am currently working on my portfolio." 
        width="270" 
        height="300"
    />
    <p class="image-description">Hi, I am Cara. I am a data analyst and UX designer. Currently, I am working on my portfolio.</p>
    
    <!-- GitHub Profile Data Section -->
    <section>
        <h2>GitHub Profile</h2>
        {#await fetch("https://api.github.com/users/yix020")}
            <p>Loading GitHub profile...</p>
        {:then response}
            {#await response.json()}
                <p>Decoding profile data...</p>
            {:then data}
                <dl class="github-stats">
                    <dt>Public Repos</dt>
                    <dd>{data.public_repos}</dd>

                    <dt>Followers</dt>
                    <dd>{data.followers}</dd>

                    <dt>Following</dt>
                    <dd>{data.following}</dd>

                    <dt>Company</dt>
                    <dd>{data.company || "N/A"}</dd>
                </dl>
            {:catch error}
                <p class="error">Something went wrong: {error.message}</p>
            {/await}
        {:catch error}
            <p class="error">Something went wrong: {error.message}</p>
        {/await}
    </section>
    
    <h2 class="latest-projects-heading">Latest Projects</h2>
    <div class="projects highlights">
        {#each projects.slice(0, 3) as project}
            <Project data={project} hLevel={3} />
        {/each}
    </div>

    <script type="module" src="global.js"></script>
</main>

<style>
    /* Personal description styling */
    .image-description {
        margin-top: 0.5rem;
        color: #333;
        font-size: 1rem;
    }

    /* GitHub stats section styling */
    section h2 {
        font-size: 1.2rem;
        margin-top: 1.5rem;
        color: #222;
    }
    .github-stats {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
        margin-top: 1rem;
    }
    .github-stats dt {
        font-weight: bold;
        grid-row: 1;
    }
    .github-stats dd {
        margin: 0;
        color: #555;
        grid-row: 2;
    }

    /* Error message styling */
    .error {
        color: red;
        font-weight: bold;
    }

    /* Projects section styling */
    .latest-projects-heading {
        font-size: 1.2rem;
        margin-top: 1.5rem;
        color: #222;
    }
    .projects {
        font-size: 0.9rem;
        color: #444;
    }
</style>
