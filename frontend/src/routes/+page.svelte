<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Separator } from '$lib/components/ui/separator';

	let username = '';
	let email = '';

	function handleSubmit() {
		alert(`Submitted: ${username} (${email})`);
	}
</script>

<div class="container mx-auto max-w-4xl p-4">
	<h1 class="mb-6 text-4xl font-bold">Demo Dashboard</h1>

	<Tabs.Root value="account" class="w-full">
		<Tabs.List class="mb-4">
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
