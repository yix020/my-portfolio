<script>
    import * as d3 from 'd3';
    export let data = [];
    export let selectedIndex = -1; // Initialize selectedIndex to -1

    // D3 setup
    let sliceGenerator = d3.pie().value((d) => d.value);
    let arcData = sliceGenerator(data);
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let arcs = arcData.map((d) => arcGenerator(d));
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
</script>

<div class="container">
    <!-- Pie Chart -->
    <svg viewBox="-50 -50 100 100">
        {#each arcs as arc, index}
        <path 
            d={arc} 
            fill={colors(index)} 
            class:selected={selectedIndex === index} 
            on:click={() => selectedIndex = selectedIndex === index ? -1 : index} 
        />
        {/each}
    </svg>

    <!-- Legend -->
    <ul class="legend">
        {#each data as d, index}
        <li class:selected={selectedIndex === index} style="--color: {colors(index)}">
            <span class="swatch"></span>
            {d.label} <em>({d.value})</em>
        </li>
        {/each}
    </ul>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin: 2rem auto;
        max-width: 100%;
    }

    svg {
        max-width: 20em;
        aspect-ratio: 1 / 1; /* Keep the pie chart square */
        flex-shrink: 0; /* Prevent the pie chart from shrinking */
    }

    /* Add hover effect for pie chart wedges */
    svg:has(path:hover) {
        path:not(:hover) {
            opacity: 0.5; /* Fade out non-hovered wedges */
        }
    }

    /* Add transition to paths for smooth effect */
    path {
        transition: opacity 300ms; /* Smooth transition for opacity changes */
        cursor: pointer; /* Change cursor to pointer */
    }

    /* Style for selected wedges and legend items */
    .selected {
        --color: oklch(60% 45% 0) !important; /* Distinct color for selected state */
    }

    .selected:is(path) {
        fill: var(--color); /* Apply selected color to the wedge */
    }

    .legend .selected {
        font-weight: bold; /* Example styling for the selected legend item */
    }

    .legend {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
        gap: 1rem;
        flex: 1; /* Let the legend occupy the remaining width */
    }

    .legend li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
    }

    .swatch {
        width: 1.5rem;
        height: 1.5rem;
        background-color: var(--color);
        border-radius: 50%;
        flex-shrink: 0;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .container {
            flex-direction: column;
            align-items: stretch;
        }

        .legend {
            grid-template-columns: 1fr;
        }
    }
</style>
