<script>
    import { goto } from '$app/navigation'
</script>

<div class="homepage">
    <h1>Welcome to Hercules Restaurant</h1>
    <button on:click={() => goto("./dashboard")}>Login</button>
</div>

<style>
    .homepage {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
</style>