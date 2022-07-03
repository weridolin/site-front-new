<template>
  <div class="route-list" v-if="list.length>0">
    <ul class="timeline">
			<li class="timeline__line"></li>
			<li class="timeline__item start">
				<div class="info">
					<div class="dot"></div>
					<time class="time">{{date}}</time>
					<h4 class="title">继续学习中……</h4>
				</div>
			</li>
			<li class="timeline__item" v-for="item of list" :key="item.id">
				<div class="info">
					<div class="dot"></div>
					<time class="time">{{item.data}}</time>
					<a :href="item.logo" class="speaker">{{item.category}}</a>
				</div>
				<div class="content" v-html="item.content">
				</div>
			</li>
      <li class="timeline__item end">
				<div class="info">
					<div class="dot"></div>
					<time class="time">2018-09-01</time>
					<h4 class="title">我的学习之旅！</h4>
				</div>
			</li>
		</ul>
  </div>
</template>
<script>
export default {
  name: "RouteList",
  props: {
    list: Array,
  },
  data(){
    return{
      date:''
    }
  },
  mounted(){
    let date = new Date();
    var y = date.getFullYear(); 
    var m = date.getMonth() + 1; 
    m = m < 10 ? '0' + m : m; 
    var d = date.getDate(); 
    d = d < 10 ? ('0' + d) : d; 
   this.date=y + '-' + m + '-' + d
  }
};
</script>
<style lang="stylus" scoped>
      .route-list {
				display: flex;
				justify-content: center;
				align-items: center;
				min-height: 100vh;
				position: relative;
				padding: 20px;
			}
			.route-list::before {
				position: absolute;
				content: '';
				width: 100%;
				height: 100%;
				background: #ccc url(https://p.pstatp.com/origin/ffcf000139126e24f3c1);
				filter: blur(10px);
			}

			.timeline {
				position: relative;
				display: grid;
				gap: 40px;
				padding: 0;
				margin: 0;
				max-width: 600px;
				font-size: 0.75rem;
				line-height: 1;
				color: #7e8888;
				list-style-type: none;
				clip-path: inset(0 0 100% 0);
				animation: expand 5s forwards linear;
			}
      .speaker{
        font-size:1.1em;
      }
      .speaker:before{
        content:''
      }
      .title::before{
        content:'';
        width:0px;
        margin:0px;
      }
			.timeline .timeline__line {
				position: absolute;
				top: 0;
				left: 6px;
				width: 4px;
				height: 100%;
				background: white;
			}

			.timeline .timeline__item:hover {
				transition: all .3s;
				color: #4e6e69;
			}

			.timeline .timeline__item:hover .dot::after {
				transition: all .3s;
				background-color: var(--main-5);
			}

			.timeline .timeline__item .info {
				display: grid;
				grid-template-columns: repeat(3, auto) 1fr;
				align-items: center;
				gap: 0.3rem;
			}

			.timeline .timeline__item .info h4 {
				margin: 0;
			}

			.timeline .timeline__item .info a {
				text-decoration: none;
			}

			.timeline .timeline__item .info .dot {
				position: relative;
				width: 16px;
				height: 16px;
				background: var(--main-6);
				border-radius: 50%;
			}

			.timeline .timeline__item .info .dot::after {
				position: absolute;
				content: "";
				top: 0;
				left: 0;
				width: 8px;
				height: 8px;
				border: 4px solid white;
				border-radius: inherit;
			}

			.timeline .timeline__item .info .time {
				margin-right: 8px;
			}

			.timeline .timeline__item .content {
				margin: 1rem 0 0 3.9rem;
				line-height: 1.5;
			}

			@keyframes expand {
				to {
					clip-path: inset(0 0 0 0);
				}
			}
</style>