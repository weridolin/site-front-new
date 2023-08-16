import { ref,computed } from 'vue';

const isShow = document.body.clientWidth <= 992 ? true : false
const left= {
  pattern: true, //留言模式
  left: true, //left模式
}
const right= {
  pattern: true, //留言模式
  left: false, //left模式
}

import type {
    SiteComment
} from 'src/services/apis/home'

const commentsList = ref<Array<SiteComment>>([])

/** computed */

const MessListLeft =  computed(() =>  {
        if (isShow) {
        return commentsList.value;
        }
        console.log(commentsList.value);
        return commentsList.value.filter(function (item) {
            return item.id % 2 != 0;
        });
        })

const MessListRight =  computed(() =>  {
            if (isShow) {
                return commentsList.value;
            }
            console.log(commentsList.value);
            return commentsList.value.filter(function (item) {
                    return item.id % 2 == 0;
            });
        })

/**  method */
function getMess() {
    // this.$emit("submit"); TODO
}

export {
    MessListLeft,
    MessListRight,
    isShow,
    left,
    right,
    getMess,
    commentsList

}