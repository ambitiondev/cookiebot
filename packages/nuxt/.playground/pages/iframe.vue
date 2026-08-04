<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <div>
    <h1>Iframe Page</h1>
    <div>
      <div class="cookieconsent-optout-marketing">
        <div class="content">
          <span
            >To load Google Maps, you need to consent to our marketing
            settings</span
          >
        </div>
      </div>
      <iframe
        data-src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16457.456161886992!2d16.373624362050386!3d48.21420021089018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d0799bf2006df%3A0x8685168014c4425f!2sHofburg!5e0!3m2!1sde!2sat!4v1708284345348!5m2!1sde!2sat"
        data-cookieconsent="marketing"
        width="100%"
        height="100%"
        style="border: 0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <NuxtLink
      :to="
        localePath({
          name: 'index',
        })
      "
    >
      home
    </NuxtLink>
  </div>
</template>
