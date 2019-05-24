import axios from '@/common/js/request';

export default {
    commonInfo () {
        return axios({
            url: 'rt/getTask',
            method: 'get'
        });
    }
};
