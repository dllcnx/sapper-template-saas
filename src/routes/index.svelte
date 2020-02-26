<style lang="scss">
  $color: red;

  .test{
    color: $color;
  }
</style>

<p class="test">这是测试页面</p>
<button class="button" on:click={test}>测试</button>

<script>
    import EventBus from '../service/EventBus'

    function test(){
        EventBus.emit('ww.myevent','nihao1')
    }
</script>
