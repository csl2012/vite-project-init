<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<script setup>
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  size: {
    type: [Number, String],
    default: 18
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
