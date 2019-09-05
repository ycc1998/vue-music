<template>
	<div id="app">
		<Mheader/>
		<Tab/>
		<keep-alive>
			<router-view />
		</keep-alive>
	</div>
  
</template>

<script>
import Mheader from './components/m-header/m-header';
import Tab from './components/tab/tab';

export default{
	components:{
		Mheader,
		Tab
	}
};

</script>
<style lang="stylus">

</style>
