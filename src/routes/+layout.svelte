<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { initBootstrap } from '$lib/bootstrap';

	let { children } = $props();

	onMount(() => {
		initBootstrap();
	});
</script>

<svelte:head>
	<title>{page.data.title}</title>
</svelte:head>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
	<div class="container">
		<a class="navbar-brand" href="/">Bookkeeper</a>
		<div class="navbar-nav">
			<a class="nav-link" href="/add">Add</a>
			<!-- <a class="nav-link" href="/about">About</a>
			<a class="nav-link" href="/settings">Settings</a> -->
		</div>
	</div>
</nav>

<!-- <main class="container"> -->
	{@render children()}
<!-- </main> -->
<!-- 
<footer class="container py-4 mt-4 border-top text-muted">
	<small>Bookkeeper</small>
</footer> -->
