<template>
<div class="page">
   图标： <svg-icon :class-name="'test'" icon-class="bookmark"></svg-icon>
</div>
</template>

<script type="text/ecmascript-6">
import test from '../api/base';
export default {
    name: 'name',
    data () {
        return {

        };
    },
    computed: {

    },
    created () {
        this._getCommonInfo();
    },
    methods: {
        _getCommonInfo () {
            test.commonInfo().then(res => {
                console.log(res);
                console.log(process.env.BASE_URL);
            });
        }
    }
};
</script>

<style scoped lang="scss">
.page {
    color: $color-base;
    .test {
        width: 200px;
        height: 299px;
    }
}
</style>
