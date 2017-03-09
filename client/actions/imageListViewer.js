export const toggleAutoReload = (checked) => {
	return {
		type: 'TOGGLE_AUTO_RELOAD',
		payload: {
			shouldAutoReload: checked,
		},
	};
}
