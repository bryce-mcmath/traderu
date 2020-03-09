<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<HelloWorld msg="Welcome friendo!" />
	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/hello_world/HelloWorld.vue';

export default {
	name: 'Home',
	components: {
		HelloWorld
	}
};
</script>
