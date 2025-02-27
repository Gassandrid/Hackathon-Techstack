<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Separator } from '$lib/components/ui/separator';
	import { registerUser } from '$lib/api';

	let username = '';
	let email = '';
	let isLoading = false;
	let error = '';
	let success = '';

	async function handleSubmit() {
		if (!username || !email) {
			error = 'Username and email are required';
			return;
		}

		isLoading = true;
		error = '';
		success = '';

		try {
			const result = await registerUser(username, email);
			success = `User registered successfully! ID: ${result.userId}`;
			username = '';
			email = '';
		} catch (err) {
			error = err.message || 'Failed to register user';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="container mx-auto max-w-4xl p-4">
	<h1 class="mb-6 text-4xl font-bold">Demo Dashboard</h1>

	<Tabs.Root value="account" class="w-full">
		{#if success}
			<div class="mt-4 rounded-md bg-green-50 p-4">
				<div class="flex">
					<div class="ml-3">
						<p class="text-sm font-medium text-green-800">{success}</p>
					</div>
				</div>
			</div>
		{/if}

		{#if error}
			<div class="mt-4 rounded-md bg-red-50 p-4">
				<div class="flex">
					<div class="ml-3">
						<p class="text-sm font-medium text-red-800">{error}</p>
					</div>
				</div>
			</div>
		{/if}

		<Tabs.List>
			<Tabs.Trigger value="account">Account</Tabs.Trigger>
			<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
		</Tabs.List>

		<Tabs.Content value="account">
			<div class="grid gap-6">
				<Card.Root class="w-full">
					<Card.Header>
						<Card.Title>Profile Information</Card.Title>
						<Card.Description>Update your personal details here.</Card.Description>
					</Card.Header>
					<Card.Content>
						<form class="space-y-4" on:submit|preventDefault={handleSubmit}>
							<div class="space-y-2">
								<Label for="username">Username</Label>
								<Input id="username" bind:value={username} placeholder="Enter your username" />
							</div>
							<div class="space-y-2">
								<Label for="email">Email</Label>
								<Input id="email" type="email" bind:value={email} placeholder="Enter your email" />
							</div>
							<Button type="submit">Save Changes</Button>
						</form>
					</Card.Content>
				</Card.Root>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Card.Root>
						<Card.Header>
							<Card.Title>Statistics</Card.Title>
							<Card.Description>Your activity overview</Card.Description>
						</Card.Header>
						<Card.Content>
							<div class="space-y-2">
								<p class="text-2xl font-bold">250</p>
								<p class="text-sm text-muted-foreground">Total Actions</p>
							</div>
						</Card.Content>
					</Card.Root>

					<Card.Root>
						<Card.Header>
							<Card.Title>Quick Actions</Card.Title>
							<Card.Description>Common tasks</Card.Description>
						</Card.Header>
						<Card.Content class="space-x-2">
							<Button variant="outline">Export</Button>
							<Button variant="outline">Share</Button>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		</Tabs.Content>

		<Tabs.Content value="settings">
			<Card.Root>
				<Card.Header>
					<Card.Title>Settings</Card.Title>
					<Card.Description>Manage your preferences</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">Email Notifications</p>
								<p class="text-sm text-muted-foreground">Receive email updates</p>
							</div>
							<Button variant="outline">Configure</Button>
						</div>
						<Separator />
						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">Privacy Settings</p>
								<p class="text-sm text-muted-foreground">Manage your privacy</p>
							</div>
							<Button variant="outline">Update</Button>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>
