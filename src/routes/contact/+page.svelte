<svelte:head>
    <title>Contact </title>
</svelte:head>
<main>
    <h1>Contact</h1>
    <form action="mailto:yix020@ucsd.edu" method="POST" enctype="text/plain">
        <label for="">email:</label>
        <input type="email" name="email">
        <label for="">subject:</label>
        <input name="subject">
        <label for="">body:</label>
        <textarea name="body" id="" cols="30" rows="10"></textarea>
        <button>submit</button>
    </form>
</main>