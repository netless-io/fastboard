<script lang="ts">
  export let position: "top" | "left" | "right" | "bottom" = "left";
</script>

<div class="agora-whiteboard-toolbar {position}">
  <div class="agora-whiteboard-toolbar-container">
    <button class="agora-whiteboard-toolbar-item clicker" />
  </div>
</div>

<style lang="scss">
  .agora-whiteboard-toolbar {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    &.left {
      top: 0;
      left: 8px;
      height: 100%;
      .agora-whiteboard-toolbar-container {
        width: 40px;
        padding: 8px 0;
        flex-direction: column;
      }
    }
    &.top {
      left: 0;
      top: 8px;
      width: 100%;
      .agora-whiteboard-toolbar-container {
        height: 40px;
        padding: 0 8px;
      }
    }
  }
  .agora-whiteboard-toolbar-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background-color: rgba(255, 255, 255, 0.9);
    padding: 8px;
  }
  .agora-whiteboard-toolbar-item {
    appearance: none;
    width: 24px;
    height: 24px;
    user-select: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 4px;
    outline: none;
    background-color: currentColor;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 24px 24px;
    &:hover,
    &.active {
      color: rgb(51, 129, 255);
    }
  }
</style>
