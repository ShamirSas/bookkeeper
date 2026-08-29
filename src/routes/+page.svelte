<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<table class="table">
	<thead>
		<tr>
			{#each data.headings as heading}
				<th scope="col">
					{heading.text}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data.policies as policy}
			<tr>
				{#each data.headings as heading}
					<th scope="row">
						{policy[heading.id]}
					</th>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
