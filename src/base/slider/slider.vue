<template>
  <section :class="cname">
 		<swiper :options="options" :not-next-tick="options.notNextTick">
 			<swiper-slide v-for="item in items" >
 				<a :href="item.linkUrl">
 					<img :src="item.picUrl" />
 				</a>
 			</swiper-slide>
 			<div class="swiper-pagination" v-if="options.pagination" slot="pagination"></div>
 		</swiper>
 	</section>
</template>

<script>
	export default{
		props: {
			options: {
				type: Object,
				default() {
					return {
						autoplay: true,
						loop: true,
						pagination: {
							el: ".swiper-pagination"
						},
						notNextTick: false,
					}
				}
			},
			cname: {
				type:String,
				default:""
			},

			items: {
				type: Array,
				default:""
			}

		},
		data() {
			return {
				
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
