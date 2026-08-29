/** Load Bootstrap JS on the client (dropdowns, modals, etc.). */
export async function initBootstrap() {
	await import('bootstrap/dist/js/bootstrap.bundle.min.js');
}
