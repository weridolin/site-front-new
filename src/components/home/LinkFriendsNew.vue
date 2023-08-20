<template>
  <div class="slider-wrapper">
    <div class="slider-track">
      <div class="slide"
      v-for="(link,index) in friendsLinks.links"
      :key="index">
        <div class="flex justify-center items-center h-screen">
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              class="w-full"
              src="https://source.unsplash.com/random/1600x900"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 title">{{link.title}}</div>
              <p class="text-gray-700 text-base">
                {{link.intro}}
              </p>
            </div>
            <div class="footer">
              <div class="link-date">
                <i class="icon" @click="openNewWindow(link.url)"><el-icon size="16px"><Calendar /></el-icon>
                  </i><span class="text">{{ link.updated }}</span>
              </div>
              <div class="link-project">
                <el-icon><Position /></el-icon>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script  setup lang="ts">
import type { FriendsLink } from "src/services/apis/home";
import { defineProps } from "vue";


interface Props {
  links: FriendsLink[];
}

const friendsLinks = defineProps<Props>();

function openNewWindow(url: string) {
  window.open(url, "_blank");
}
</script>

<style lang="scss" scoped>

.title {
  font-size: 1.25rem;
  margin-top: .5rem;
  margin-bottom: .5rem;
  font-weight: 700;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 垂直居中对齐 */
  position: relative;
  vertical-align: middle;
}
.icon {
  vertical-align: -10%;
  margin-right: 5px;
}

.link-date{
  // display: flex;
  // justify-content: center; /* 水平居中 */
  // align-items: center; /* 垂直居中 */

}
.link-project{
	opacity: 1;
	// position: absolute;
	// right: 0;
	// top: 50%;
	// margin-top: -1em;
	// transform: translateX(-20%);
	// width: 2em;
	// height: 2em;
	transition: all .3s ease-in-out;
	:hover{
    transform: translateX(0);
    opacity: 1;
  }

}

</style>


<style lang="scss" scoped>
.slider-wrapper {
  position: relative;
  height: 500px;
  width: 90%;
  margin: 0 auto;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.slider-track {
  display: flex;
  width: calc(350 * 10);
  animation: slideauto 25s linear infinite;
}

.slider-track:hover {
  animation-play-state: paused;
}

@keyframes slideauto {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-350px * 8));
  }
}

.slide {
  width: 350px;
  height: 420px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  overflow: hidden;
  perspective: 100px;
  cursor: pointer;
}

.slide img {
  max-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

/* * Shaddow * */
.slider-wrapper::before,
.slider-wrapper::after {
  background: linear-gradient(
    to right,
    rgba(255, 255, 255) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  content: "";
  position: absolute;
  height: 100%;
  width: 15%;
  z-index: 2;
}

.slider-wrapper::before {
  left: 0;
  top: 0;
}

.slider-wrapper::after {
  right: 0;
  top: 0;
  transform: rotateZ(180deg);
}
</style>    