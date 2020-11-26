import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {state,getters,mutations} from './mutations'
import actions from './actions'
import menue from './module/menue'
import role from './module/role'
import manage from './module/manage'
import cate from './module/cate'
import specs from './module/specs'
import goods from './module/goods'


export default new Vuex.Store({
    actions,
    state,
    getters,
    mutations,
    modules:{
        menue,
        role,
        manage,
        cate,
        specs,
        goods
    }
})