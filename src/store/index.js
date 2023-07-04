import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        timeInfo: [],
        currentTime: {
            dataset: "d013008",
            time: " 01-30 08:00"
        },
    },
    // 事件
    mutations: {
        getTimeInfo(state) {
            // new mapboxgl.supermap.DatasetService(this.dataUrl).getDatasets(
            //   this.sourcename,
            //   (result) => {
            // const dataInfo = result.result.datasetNames
            const dataInfo = ['d013008', 'd020108', 'd020120', 'd020208', 'd020220', 'd020308', 'd020320', 'd020408', 'd020420']

            if (state.timeInfo.length === 0) {
                for (let i = 0; i < dataInfo.length; i++) {
                    const time = ` ${dataInfo[i].slice(1,3)}-${dataInfo[i].slice(3,5)} ${dataInfo[i].slice(5,7)}:00`
                    const timeDate = {
                        dataset: dataInfo[i],
                        time: time
                    }
                    state.timeInfo.push(timeDate)
                }
            }
            // }
            // }
            // )
        },
        changeCurrentTime(state, index) {
            state.currentTime = index
        },

    },
});

export default store;