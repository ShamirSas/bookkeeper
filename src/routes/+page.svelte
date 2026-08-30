<script lang="ts">
	import { Heading, HeadingId } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import type { Policy } from '$lib/schemas/policy';
	import { base } from '$app/paths';

	let { data, form }: PageProps = $props();

	interface IEditMode {
		isEditting: boolean;
		rowIndex: number;
		policy: Policy;
	}

	interface IAddMode {
		isEditting: boolean;
	}

	let editMode: IEditMode | null = $state(null);
	let addMode: IAddMode | null = $state(null);

	let policies: Policy[] = $state([]);
	let hasChangedAPolicy = $derived(
		policies.some((policy: Policy) => policy?.isNew || policy?.isEdited)
	);

	onMount(() => {
		policies = data.policies;
	});

	$effect(() => {
		if (form?.newFileName != null) {
			function triggerDownload() {
				const link = document.createElement('a');
				link.href = `${base}/${form?.newFileName}`;
				link.download = `${form?.newFileName}`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
			triggerDownload();
			console.log('Download the spreadsheet file');
		}
	});
</script>

{#snippet addButton()}
	<button
		type="submit"
		formaction="?/addPolicy"
		class="btn btn-success btn-sm"
		title="Save new record"
	>
		<i class="bi bi-floppy2"></i>
	</button>
{/snippet}

{#snippet editButton()}
	<button
		type="submit"
		formaction="?/editPolicy"
		class="btn btn-success btn-sm"
		title="Save edited record"
	>
		<i class="bi bi-floppy2"></i>
	</button>
{/snippet}

{#snippet input(heading: Heading)}
	<input
		type={heading.input.type}
		class="form-control"
		id={heading.id}
		value={editMode?.policy[heading.id as HeadingId]}
		aria-describedby={heading.input.describedBy}
		name={heading.id}
		step=".01"
		required
	/>
{/snippet}

{#snippet editInputs(heading: Heading)}
	{#if heading.input.options.type === 'input'}
		{#if heading.input.options.prefix}
			<div class="input-group mb-3">
				<span class="input-group-text">
					{heading.input.options.prefix}
				</span>
				{@render input(heading)}
			</div>
		{:else}
			{@render input(heading)}
		{/if}
	{:else if heading.input.options.type === 'select'}
		<select class="form-select" name={heading.id} aria-label="Select for {heading.id}">
			<option disabled>Select a policy type</option>
			{#each heading.input.options.selectOptions as option}
				<option value={option.value} selected={option.value === editMode?.policy.type}>
					{option.text}
				</option>
			{/each}
		</select>
	{/if}
{/snippet}

<form method="POST">
	<table class="table table-hover" class:table-striped={!editMode?.isEditting}>
		<thead>
			<tr>
				{#each data.headings as heading}
					<th scope="col">
						{heading.text}
					</th>
				{/each}
				<th>
					<div class="d-flex justify-content-end">
						{#if editMode?.isEditting || addMode?.isEditting}
							<button
								type="button"
								class="btn btn-danger"
								onclick={() => {
									addMode = null;
									editMode = null;
								}}
								title="Cancel add or edit"
							>
								<i class="bi bi-x-circle"></i>
							</button>
						{:else}
							<div class="btn-group" role="group" aria-label="Basic example">
								{#if hasChangedAPolicy}
									<button
										type="submit"
										class="btn btn-success"
										formaction="?/saveSpreadsheet"
										title="Save changes to spreadsheet"
									>
										<i class="bi bi-filetype-xls"></i>
									</button>
								{/if}
								<button
									type="button"
									class="btn btn-primary"
									onclick={() => {
										addMode = { isEditting: true };
										editMode = null;
									}}
									title="Add new policy"
								>
									<i class="bi bi-plus-circle"></i>
								</button>
							</div>
						{/if}
					</div>
				</th>
			</tr>
		</thead>
		<tbody>
			{#if addMode && addMode.isEditting}
				<tr class="table-info vertical">
					{#each data.headings as heading}
						<td>
							{@render editInputs(heading)}
						</td>
					{/each}
					<td>
						<div class="d-flex justify-content-end">
							{@render addButton()}
						</div>
					</td>
				</tr>
			{/if}
			{#each data.policies as policy, index (index)}
				<tr
					class:table-info={editMode?.isEditting && index === editMode.rowIndex}
					class:table-primary={policy?.isNew}
					class:table-warning={policy?.isEdited}
					class:fw-bold={policy?.isNew || policy.isEdited}
				>
					{#each data.headings as heading}
						<td class:text-secondary={editMode?.isEditting && editMode.rowIndex !== index}>
							{#if editMode && editMode.isEditting && editMode.rowIndex == index}
								<input type="hidden" name="rowIndex" value={index} />
								{@render editInputs(heading)}
							{:else}
								{#if heading.input.options.type === 'input' && heading.input.options.prefix}
									{heading.input.options.prefix}
								{/if}

								{policy[heading.id as HeadingId]}
							{/if}
						</td>
					{/each}
					<td>
						<div class="d-flex justify-content-end">
							{#if editMode?.isEditting && editMode.rowIndex === index}
								{@render editButton()}
							{:else}
								<button
									type="button"
									onclick={() => {
										editMode = { isEditting: true, rowIndex: index, policy: policy };
										addMode = null;
									}}
									class="btn btn-secondary btn-sm"
									title="Edit policy"
								>
									<i class="bi bi-pencil-square"></i>
								</button>
							{/if}
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</form>
