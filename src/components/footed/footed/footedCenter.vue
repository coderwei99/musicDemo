<template>
  <div>
    <div class="icon">
      <i @click="prev" class="el-icon-caret-left"></i>
      <i @click="suspend" class="el-icon-video-play"></i>
      <!-- <i class="el-icon-video-pause"></i> -->
      <i @click="next" class="el-icon-caret-right"></i>
    </div>
    <audio ref="video" autoplay :src="$store.state.listen">
      Your browser does not support the audio element.
    </audio>
    <div>
      <i>11</i>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props:{
    songvalue:{
      type:String,
      required:null
    }
  },
  setup(props) {
    let video = ref(null);
    let songindex = props.songvalue
    console.log(video); 
    const play = function () {
      console.log(video.value);
      console.log(111);
    };
    const suspend = function () {
      console.log(111);
       if (video.value.paused) {
         video.value.play();
      } else {
        video.value.pause();
      }
      console.log(songindex)
    };
    const prev = function () {
      console.log(video.value);
    };
    const next = function () {
      console.log(111);
    };
    return {
      play,
      suspend,
      prev,
      next,
      video,
    };
  },
};
</script>

<style scoped>
.icon {
  font-size: 30px;
}
.el-icon-caret-left {
  margin-left: 300px;
}
.el-icon-video-play {
  margin-left: 50px;
}
.el-icon-video-pause {
  margin-left: 50px;
}
.el-icon-caret-right {
  margin-left: 50px;
}
</style>