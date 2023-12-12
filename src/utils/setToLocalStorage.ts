export function setWithExpiry(key: string, value: any) {
	const now = new Date()
	const item = {
		value: value,
		expiry: now.getTime() + (5 * 60 * 1000), // Set expiry time to 5 minutes after adding it to local storage
	}
	localStorage.setItem(key, JSON.stringify(item))
}