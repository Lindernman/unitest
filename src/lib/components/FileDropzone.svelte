<script>
	import { createEventDispatcher } from 'svelte/internal';

	// Event Dispatcher
	const dispatch = createEventDispatcher();

	// Props
	/**
	 * Bind this to your form data, represents the "files" data from the input.
	 * @type {FileList}
	 */
	export let files;
	/** Provided additional notes or information. */
	export let notes = '';
	// Props (Styles)
	/** Provide styles to set the dropzone width. */
	export let width = 'w-full';
	/** Provide styles to set the dropzone height. */
	export let height = 'h-24';
	/** Provide styles to set the dropzone padding. */
	export let padding = 'p-4';
	/** Provide styles to set the dropzone text color. */
	export let color = '';

	// Classes
	const cBase = 'relative';
	const cMessage =
		'absolute top-0 left-0 right-0 bottom-0 z-[1] max-w-[480px] mx-auto flex justify-center items-center !pointer-events-none';
	const cInput = '!border-2 border-dashed cursor-pointer';

	// Local
	let elemIcon;

	// Drag and Drop Event Handlers
	// Handles icon animation and passes events up
	function onDragOver(event) {
		/** @event {{ event }} dragover - When a file is dragged over the component. */
		dispatch('dragover', event);
		elemIcon?.classList.add('animate-bounce');
	}
	function onDragLeave(event) {
		/** @event {{ event }} dragleave - When a file is dragged out off the component. */
		dispatch('dragleave', event);
		elemIcon?.classList.remove('animate-bounce');
	}
	function onDrop(event) {
		/** @event {{ event }} drop - When a file is dropped on the component. */
		dispatch('drop', event);
		elemIcon?.classList.remove('animate-bounce');
	}

	// Reactive
	$: classesBase = `${cBase} ${width} ${$$props.class ?? ''}`;
	$: classesMessage = `${cMessage} ${color} ${height} ${padding}`;
	$: classesInput = `${cInput} ${height} ${padding}`;

	// Prune $$restProps to avoid overwriting $$props.class
	function prunedRestProps() {
		delete $$restProps.class;
		return $$restProps;
	}
</script>

<div
	class=" {classesBase}"
	data-testid="file-dropzone"
	on:dragenter
	on:dragover={onDragOver}
	on:dragleave={onDragLeave}
	on:drop={onDrop}
>
	<!-- Message -->
	<div class=" {classesMessage}">
		<!-- Slot: Default -->
		<slot>
			<!-- Default Message -->
			<div class=" grid grid-cols-[auto_1fr] gap-4">
				<!-- Icon -->
				<div class="text-4xl flex justify-center items-center" bind:this={elemIcon}>&darr;</div>
				<!-- Text -->
				<div class="flex flex-col justify-center items-start space-y-0">
					<div class="text-base font-bold">
						Drop {$$restProps.multiple ? 'files' : 'a file'} or click to select.
					</div>
					{#if notes}<div class="text-sm opacity-70">{@html notes}</div>{/if}
				</div>
			</div>
		</slot>
	</div>
	<!-- Input: File -->
	<input
		bind:files
		type="file"
		{...prunedRestProps()}
		class="file-dropzone-input relative w-full rounded-lg {classesInput} border-slate-400  hover:border-emerald-600 duration-300"
		on:change
	/>
</div>

<style>
	/* Hide Input:File Content */
	input[type='file'] {
		@apply text-transparent;
	}
	::-webkit-file-upload-button {
		@apply hidden;
	}
	::file-selector-button {
		@apply hidden;
	}
</style>
