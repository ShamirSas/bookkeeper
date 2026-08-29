<script lang="ts">
	const { data } = $props();
</script>

<form>
	{#each data.headings as heading}
		<div class="mb-3 row">
			<label for={heading.id} class="col-sm-2 col-form-label">{heading.text}</label>
			<div class="col-sm-10">
				{#if heading.inputType?.options?.prefix}
					<div class="input-group">
						<div class="input-group-text">
							{heading.inputType.options.prefix}
						</div>
						<input
							type={heading.inputType.type}
							class="form-control"
							id={heading.id}
							value={heading.value}
							aria-describedby={heading.inputType.describedBy}
						/>
					</div>
				{:else}
					<input
						type={heading.inputType.type}
						class="form-control"
						id={heading.id}
						value={heading.value}
						aria-describedby={heading.inputType.describedBy}
					/>
				{/if}
			</div>
			{#if heading.inputType.describedBy?.trim()}
				<div id="heading.inputType.describedBy" class="form-text">
					{heading.description}
				</div>
			{/if}
		</div>
	{/each}
</form>

<button type="button" class="btn btn-primary">Save</button>
