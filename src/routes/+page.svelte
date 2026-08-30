<script lang="ts">
	import { HeadingId, type PolicyRecord } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	interface IEditMode {
		isEditting: boolean;
		rowIndex: number;
		policy: PolicyRecord;
	}

	let editMode: IEditMode | null = $state(null);

	let policies: PolicyRecord[] = [];

	onMount(() => {
		policies = data.policies;
	});

	function saveEditState() {
		if (!editMode || !editMode.isEditting || policies[editMode.rowIndex] == null) return;
		policies[editMode.rowIndex] = editMode.policy as PolicyRecord;
	}
</script>

<table class="table table-hover" class:table-striped={!editMode?.isEditting}>
	<thead>
		<tr>
			{#each data.headings as heading}
				<th scope="col">
					{heading.text}
				</th>
			{/each}
			<th></th>
		</tr>
	</thead>
	<tbody>
		{#each data.policies as policy, index}
			<tr class:table-success={editMode?.isEditting && index === editMode.rowIndex}>
				{#each data.headings as heading, columnIndex}
					<td>
						{#if editMode && editMode.isEditting && editMode.rowIndex == index}
							<form>
								{#if heading.input.options.type === 'input'}
									<input
										type={heading.input.type}
										class="form-control"
										id={heading.id}
										value={editMode?.policy[heading.id as HeadingId]}
										aria-describedby={heading.input.describedBy}
									/>
								{:else if heading.input.options.type === 'select'}
									<select class="form-select" aria-label="Default select example">
										<option disabled>Select a policy type</option>
										{#each heading.input.options.selectOptions as option}
											<option value={option.value} selected={option.value === editMode.policy.type}
												>{option.text}</option
											>
										{/each}
									</select>
								{/if}
							</form>
						{:else}
							{#if heading.input.options.type === 'input' && heading.input.options.prefix}
								{heading.input.options.prefix}
							{/if}

							{policy[heading.id as HeadingId]}
						{/if}
					</td>
				{/each}
				<th>
					{#if editMode?.isEditting && editMode.rowIndex === index}
						<button type="button" onclick={() => (editMode = null)} class="btn btn-success">
							Save
						</button>
					{:else}
						<button
							type="button"
							onclick={() => (editMode = { isEditting: true, rowIndex: index, policy: policy })}
							class="btn btn-secondary"
						>
							Edit
						</button>
					{/if}
				</th>
			</tr>
		{/each}
	</tbody>
</table>
