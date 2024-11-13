<script>
    export let data; // This will receive the project data
</script>

<div class="project">
    <img src={data.image} alt={data.title} class="project-image" />
    <h3>{data.title}</h3>
    <p><strong>Year:</strong> {data.year}</p>
    <p>{data.description}</p>
</div>

<style>
    .project {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        background-color: #fff;
        transition: box-shadow 0.3s;
    }

    .project:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .project-image {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
    }
</style>

