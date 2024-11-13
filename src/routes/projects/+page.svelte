<script>
    import projects from '$lib/projects.json';
    import Project from '$lib/Project.svelte'; // Importing the Project component
    import Pie from '$lib/Pie.svelte'; // Importing the Pie component
    import * as d3 from 'd3'; // Import d3 for data manipulation

    // Variable to hold the search query
    let query = '';

    // Reactive statement to filter projects based on the search query
    let filteredProjects;
    $: filteredProjects = projects.filter((project) => {
        let values = Object.values(project).join(' ').toLowerCase();
        return values.includes(query.toLowerCase());
    });

    // Variable to hold pieData
    let pieData;

    // Reactive block to calculate pieData based on filteredProjects
    $: {
        const rolledData = d3.rollups(
            filteredProjects,
            (v) => v.length,
            (d) => d.year
        );

        pieData = rolledData.map(([year, count]) => {
            return { value: count, label: year };
        });
    }

    // Step 1: Hold the selected index for the year
    let selectedYearIndex = -1;

    // Bind the selectedIndex prop of the Pie component
    // This allows us to capture which wedge is selected
    $: selectedYear;
    $: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

    // Step 4: Use a separate variable for filtered projects by selected year
    let filteredByYear;
    $: {
        filteredByYear = filteredProjects.filter((project) => {
            if (selectedYear) {
                return project.year === selectedYear;
            }
            return true;
        });
    }
</script>

<svelte:head>
    <title>Projects</title>
</svelte:head>

<main>
    <h1>Projects ({filteredByYear.length})</h1> <!-- Display filtered project count -->

    <!-- Pie Chart Section -->
    <section class="visualization">
        <h2>Project Year Distribution</h2>
        <Pie data="{pieData}" bind:selectedIndex="{selectedYearIndex}" /> <!-- Bind selectedIndex -->
    </section>

    <!-- Optionally display selected index and selected year -->
    <p>Selected Year Index: {selectedYearIndex}</p>
    <p>Selected Year: {selectedYear}</p>

    <input
        type="search"
        bind:value="{query}"
        aria-label="Search projects"
        placeholder="🔍 Search projects…"
    />
    <!-- Project List Section -->
    <section class="projects-section">
        <div class="projects">
            {#each filteredByYear as project} <!-- Use filteredByYear for projects display -->
            <Project data={project} /> <!-- Using the Project component -->
            {/each}
        </div>
    </section>
</main>

<style>
    /* General page styles */
    main {
        padding: 2rem;
        font-family: 'Arial', sans-serif;
    }

    h1 {
        font-size: 2rem;
        color: #222;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    /* Visualization (Pie chart) section */
    .visualization {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background-color: #f9f9f9;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .visualization h2 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        color: #333;
    }

    /* Projects section */
    .projects-section {
        margin-top: 2rem;
    }

    .projects {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
        gap: 1em;
        padding: 1em;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        h1 {
            font-size: 1.6rem;
        }

        .projects {
            grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
        }

        .visualization {
            padding: 1rem;
        }

        .visualization h2 {
            font-size: 1.5rem;
        }
    }
</style>
